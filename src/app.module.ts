import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PlayersModule } from './players/players.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:rcNYBZf0gW5bbMUO@cluster0.jmfzeno.mongodb.net/?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiendTopology: true,
        useFindAndModify: false,
      }
    ),
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
