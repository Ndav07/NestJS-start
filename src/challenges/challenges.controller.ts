import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'

import { ChallengesService } from './challenges.service'
import { CreateChallengeDTO } from './dtos/create-challenge.dto'

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createChallenge(@Body() challenge: CreateChallengeDTO): Promise<void> {
    await this.challengesService.createChallenge(challenge)
  }
}
