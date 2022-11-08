import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CategoriesService } from 'src/categories/categories.service'
import { PlayersService } from 'src/players/players.service'
import { CreateChallengeDTO } from './dtos/create-challenge.dto'
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

  async createChallenge(challenge: CreateChallengeDTO): Promise<void> {
    const { players, requester } = challenge

    const playersFind = await this.playersService.getPlayersByIds(players)

    const requesterInGame = playersFind.find(
      (player) => player._id == requester._id
    )

    if (!requesterInGame) {
      throw new BadRequestException('Requester does not in game')
    }
  }
}
