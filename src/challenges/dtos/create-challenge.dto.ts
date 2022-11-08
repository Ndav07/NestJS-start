import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator'
import { IPlayer } from 'src/players/interfaces/player.interface'

export class CreateChallengeDTO {
  @IsNotEmpty()
  @IsDateString()
  challengeDateTime: Date

  @IsNotEmpty()
  requester: IPlayer

  @IsArray()
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  players: IPlayer[]
}
