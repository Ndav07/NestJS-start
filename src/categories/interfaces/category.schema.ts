import * as mongoose from 'mongoose'

export const CategorySchema = new mongoose.Schema(
  {
    categoty: { type: String, unique: true },
    description: { type: String },
    events: [
      {
        nome: { type: String },
        operation: { type: String },
        value: { type: Number },
      },
    ],
    jogadores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
  },
  { timestamps: true, collection: 'categories' }
)
