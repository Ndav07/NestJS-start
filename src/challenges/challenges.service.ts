import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CategoriesService } from 'src/categories/categories.service'
import { PlayersService } from 'src/players/players.service'
import { CreateChallengeDTO } from './dtos/create-challenge.dto'
import { UpdateChallengeDTO } from './dtos/update-challenge.dto'
import { ChallengeStatus } from './interfaces/challenge-status.enum'
import { IChallenge } from './interfaces/challenge.interface'
import { IGame } from './interfaces/game.interface'

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge')
    private readonly challengeModel: Model<IChallenge>,
    @InjectModel('Game') private readonly gameModel: Model<IGame>,
    private readonly playersService: PlayersService,
    private readonly categoriesService: CategoriesService
  ) {}

  async createChallenge(challenge: CreateChallengeDTO): Promise<IChallenge> {
    const { players, requester } = challenge

    const playersFind = await this.playersService.getPlayersByIds(players)

    const requesterInGame = playersFind.find(
      (player) => player._id == requester._id
    )

    if (!requesterInGame) {
      throw new BadRequestException('Requester does not in game')
    }

    const categotyRequester =
      await this.categoriesService.getCategoryByPlayerId(requesterInGame._id)

    if (!categotyRequester) {
      throw new BadRequestException(
        'Requester is not registered in this category'
      )
    }

    const createChallenge = new this.challengeModel(challenge)
    createChallenge.category = categotyRequester.category
    createChallenge.requestDateTime = new Date()
    createChallenge.status = ChallengeStatus.PENDING
    return await createChallenge.save()
  }

  async getChallenges(): Promise<IChallenge[]> {
    return await this.challengeModel
      .find()
      .populate('players')
      .populate('requester')
      .populate('game')
      .exec()
  }

  async getChallenge(id: string): Promise<IChallenge> {
    const challenge = await this.challengeModel
      .findOne({ _id: id })
      .populate('players')
      .populate('requester')
      .populate('game')
      .exec()
      .catch(() => {
        throw new BadRequestException('Challenge does not exists!')
      })
    if (!challenge) {
      throw new BadRequestException('Challenge does not exists!')
    }
    return challenge
  }

  async getChallengesByIdPlayer(id: string): Promise<IChallenge[]> {
    await this.playersService.getPlayer(id)
    return await this.challengeModel
      .find({ players: { _id: id } })
      .populate('players')
      .populate('requester')
      .populate('game')
      .exec()
  }

  async updateChallenge(
    id: string,
    challengeDTO: UpdateChallengeDTO
  ): Promise<void> {
    console.log(id)
    console.log(challengeDTO)
  }

  async deleteChallenge(id: string): Promise<void> {
    const challengeFind = await this.challengeModel
      .findOne({ _id: id })
      .exec()
      .catch(() => {
        throw new NotFoundException('Challenge does not exists!')
      })
    if (!challengeFind) {
      throw new NotFoundException('Challenge does not exists!')
    }

    await this.challengeModel
      .findOneAndDelete({ _id: id })
      .exec()
      .catch(() => {
        throw new BadRequestException('Application Error!')
      })
  }
}
