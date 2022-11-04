import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PlayersModule } from './players/players.module'
import { CategoriesModule } from './categories/categories.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:rcNYBZf0gW5bbMUO@cluster0.jmfzeno.mongodb.net/?retryWrites=true&w=majority'
    ),
    PlayersModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
