import { Injectable, NotAcceptableException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ICreatePlayerDTO } from './dtos/create-player.dto'
import { IPlayer } from './interfaces/player.interface'

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<IPlayer>
  ) {}

  async getPlayers(): Promise<IPlayer[]> {
    return await this.playerModel.find().exec()
  }

  async getPlayer(email: string): Promise<IPlayer> {
    const playerFind = await this.playerModel.findOne({ email }).exec()
    if (!playerFind) {
      throw new NotAcceptableException('Player does not exists!')
    }
    return playerFind
  }

  async createUpdatePlayer(playerDTO: ICreatePlayerDTO): Promise<void> {
    const { email } = playerDTO
    const playerFind = await this.playerModel.findOne({ email }).exec()
    if (playerFind) {
      this.updatePlayer(playerDTO)
    } else {
      this.createPlayer(playerDTO)
    }
  }

  async deletePlayer(email: string): Promise<void> {
    await this.playerModel.deleteOne({ email }).exec()
  }

  private async createPlayer(playerDTO: ICreatePlayerDTO): Promise<IPlayer> {
    const playerCreate = new this.playerModel(playerDTO)
    return await playerCreate.save()
  }

  private async updatePlayer(playerDTO: ICreatePlayerDTO): Promise<IPlayer> {
    return await this.playerModel
      .findOneAndUpdate({ email: playerDTO.email }, { $set: playerDTO })
      .exec()
  }
}
