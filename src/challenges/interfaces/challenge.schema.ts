import * as mongoose from 'mongoose'

export const ChallengeSchema = new mongoose.Schema(
  {
    challengeDateTime: { type: Date },
    status: { type: String },
    requestDateTime: { type: Date },
    responseDateTime: { type: Date },
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    category: { type: String },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  },
  { timestamps: true, collection: 'challenges' }
)
