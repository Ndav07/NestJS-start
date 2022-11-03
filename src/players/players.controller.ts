import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Post,
  Query,
} from '@nestjs/common'

import { ICreatePlayerDTO } from './dtos/create-player.dto'
import { IPlayer } from './interfaces/player.interface'
import { PlayersService } from './players.service'

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}
  @Post()
  async createUpdatePlayer(@Body() player: ICreatePlayerDTO): Promise<void> {
    if (!player.email || !player.name || !player.phoneNumber) {
      throw new HttpException('Does not have the necessary parameters', 400)
    }
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

  @Delete()
  async deletePlayer(@Query('email') email: string): Promise<void> {
    this.playersService.deletePlayer(email)
  }
}
