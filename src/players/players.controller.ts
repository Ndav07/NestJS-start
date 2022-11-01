import { Body, Controller, Get, Post, Query } from '@nestjs/common'

import { ICreatePlayerDTO } from './dtos/create-player.dto'
import { IPlayer } from './interfaces/player.interface'
import { PlayersService } from './players.service'

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}
  @Post()
  async createUpdatePlayer(@Body() player: ICreatePlayerDTO): Promise<void> {
    this.playersService.createUpdatePlayer(player)
  }

  @Get()
  async getPlayers(
    @Query('email') email: string
  ): Promise<IPlayer | IPlayer[]> {
    if (email) {
      return this.playersService.getPlayer(email)
    } else {
      return this.playersService.getPlayers()
    }
  }
}
