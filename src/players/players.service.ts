import { Injectable, NotAcceptableException } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'

import { ICreatePlayerDTO } from './dtos/create-player.dto'
import { IPlayer } from './interfaces/player.interface'

@Injectable()
export class PlayersService {
  private players = []

  async getPlayers(): Promise<IPlayer[]> {
    return this.players
  }

  async getPlayer(email: string): Promise<IPlayer> {
    const player = this.players.find((player) => player.email === email)
    if (!player) {
      throw new NotAcceptableException('Player does not exists!')
    }
    return player
  }

  async createUpdatePlayer(playerDTO: ICreatePlayerDTO): Promise<void> {
    const { email } = playerDTO
    const player = this.players.find((player) => player.email === email)
    if (player) {
      this.updatePlayer(player, playerDTO)
    } else {
      this.createPlayer(playerDTO)
    }
  }

  private createPlayer(playerDTO: ICreatePlayerDTO): void {
    const { name, email, phoneNumber } = playerDTO
    const player: IPlayer = {
      id: uuidv4(),
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      ranking: 'A',
      positionRanking: 1,
      urlPhotoPlayer: 'www.google.com.br/photo123.jpg',
    }
    this.players.push(player)
  }

  private updatePlayer(playerFind: IPlayer, playerDTO: ICreatePlayerDTO): void {
    const { name } = playerDTO
    playerFind.name = name
  }
}
