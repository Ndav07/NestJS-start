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

import { ChallengesService } from './challenges.service'
import { CreateChallengeDTO } from './dtos/create-challenge.dto'
import { UpdateChallengeDTO } from './dtos/update-challenge.dto'
import { IChallenge } from './interfaces/challenge.interface'
import { ChallengeStatusValidationPipe } from './pipes/challenge-status-validation'

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createChallenge(
    @Body() challenge: CreateChallengeDTO
  ): Promise<IChallenge> {
    return await this.challengesService.createChallenge(challenge)
  }

  @Get()
  async getChallenges(): Promise<IChallenge[]> {
    return await this.challengesService.getChallenges()
  }

  @Get('/:id')
  async getChallenge(@Param('id') id: string): Promise<IChallenge> {
    return await this.challengesService.getChallenge(id)
  }

  @Get('/player/:id')
  async getChallengesByIdPlayer(
    @Param('id') id: string
  ): Promise<IChallenge[]> {
    return await this.challengesService.getChallengesByIdPlayer(id)
  }

  @Put('/:id')
  async updateChallenge(
    @Body(ChallengeStatusValidationPipe) challengeDTO: UpdateChallengeDTO,
    @Param('id') id: string
  ): Promise<void> {
    await this.challengesService.updateChallenge(id, challengeDTO)
  }

  @Delete('/:id')
  async deleteChallenge(@Param('id') id: string): Promise<void> {
    await this.challengesService.deleteChallenge(id)
  }
}
