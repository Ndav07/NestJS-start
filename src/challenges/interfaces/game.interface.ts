import { Document } from 'mongoose'

import { IPlayer } from 'src/players/interfaces/player.interface'
import { IResult } from './result.interface'

export interface IGame extends Document {
  category: string
  players: IPlayer[]
  def: IPlayer
  result: IResult
}
