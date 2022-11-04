import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreatePlayerDTO } from './dtos/create-player.dto'
import { UpdatePlayerDTO } from './dtos/update-player.dto'
import { IPlayer } from './interfaces/player.interface'

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<IPlayer>
  ) {}

  async getPlayers(): Promise<IPlayer[]> {
    return await this.playerModel.find().exec()
  }

  async getPlayer(id: string): Promise<IPlayer> {
    const player = await this.playerModel
      .findOne({ _id: id })
      .exec()
      .catch(() => {
        throw new NotFoundException(`Player does not exists!`)
      })
    return player
  }

  async createPlayer(playerDTO: CreatePlayerDTO): Promise<IPlayer> {
    const playerCreate = new this.playerModel(playerDTO)
    return await playerCreate.save()
  }

  async updatePlayer(id: string, playerDTO: UpdatePlayerDTO): Promise<void> {
    const playerFind = await this.playerModel
      .findOne({ _id: id })
      .exec()
      .catch(() => {
        throw new NotFoundException(`Player does not exists!`)
      })
    if (!playerFind) {
      throw new NotFoundException(`Player does not exists!`)
    }
    await this.playerModel
      .findOneAndUpdate({ _id: id }, { $set: playerDTO })
      .exec()
      .catch(() => {
        throw new NotFoundException(`Application Error!`)
      })
  }

  async deletePlayer(id: string): Promise<void> {
    const playerFind = await this.playerModel
      .findOne({ _id: id })
      .exec()
      .catch(() => {
        throw new NotFoundException(`Player does not exists!`)
      })
    if (!playerFind) {
      throw new NotFoundException(`Player does not exists!`)
    }
    await this.playerModel
      .findOneAndDelete({ _id: id })
      .exec()
      .catch(() => {
        throw new BadRequestException(`Application Error!`)
      })
  }
}
