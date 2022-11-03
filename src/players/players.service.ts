import { Injectable, NotFoundException } from '@nestjs/common'
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
    const playerFind = await this.playerModel.findOne({ id }).exec()
    if (!playerFind) {
      throw new NotFoundException('Player does not exists!')
    }
    return playerFind
  }

  async createPlayer(playerDTO: CreatePlayerDTO): Promise<IPlayer> {
    const playerCreate = new this.playerModel(playerDTO)
    return await playerCreate.save()
  }

  async updatePlayer(id: string, playerDTO: UpdatePlayerDTO): Promise<IPlayer> {
    const playerFind = await this.playerModel.findOne({ id }).exec()
    if (!playerFind) {
      throw new NotFoundException('Player does not exists!')
    }
    return await this.playerModel
      .findOneAndUpdate({ id }, { $set: playerDTO })
      .exec()
  }

  async deletePlayer(id: string): Promise<void> {
    const playerFind = await this.playerModel.findOne({ id }).exec()
    if (!playerFind) {
      throw new NotFoundException('Player does not exists!')
    }
    await this.playerModel.deleteOne({ id }).exec()
  }
}
