import { Document } from 'mongoose'

import { IPlayer } from 'src/players/interfaces/player.interface'
import { ChallengeStatus } from './challenge-status.enum'
import { IGame } from './game.interface'

export interface IChallenge extends Document {
  challengeDateTime: Date
  status: ChallengeStatus
  requestDateTime: Date
  responseDateTime: Date
  requester: IPlayer
  category: string
  players: IPlayer[]
  game: IGame
}
