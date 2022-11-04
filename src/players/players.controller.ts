import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'

import { PlayersService } from './players.service'
import { CreatePlayerDTO } from './dtos/create-player.dto'
import { IPlayer } from './interfaces/player.interface'
import { PlayersValidationParams } from './pipes/players-validation-params.pipe'
import { UpdatePlayerDTO } from './dtos/update-player.dto'

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() player: CreatePlayerDTO): Promise<IPlayer> {
    return this.playersService.createPlayer(player)
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() player: UpdatePlayerDTO,
    @Param('id', PlayersValidationParams) id: string
  ): Promise<IPlayer> {
    return this.playersService.updatePlayer(id, player)
  }

  @Get()
  async getPlayers(): Promise<IPlayer[]> {
    return this.playersService.getPlayers()
  }

  @Get('/:id')
  async getPlayer(
    @Param('id', PlayersValidationParams) id: string
  ): Promise<IPlayer> {
    return this.playersService.getPlayer(id)
  }

  @Delete('/:id')
  async deletePlayer(
    @Param('id', PlayersValidationParams) id: string
  ): Promise<void> {
    this.playersService.deletePlayer(id)
  }
}
