import { Document } from 'mongoose'
import { IPlayer } from 'src/players/interfaces/player.interface'

import { IEvent } from './event.interface'

export interface ICategory extends Document {
  readonly category: string
  description: string
  events: IEvent[]
  jogadores: IPlayer[]
}
