import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { PlayersService } from 'src/players/players.service'
import { CreateCategoryDTO } from './dtos/create-category.dto'
import { UpdateCategoryDTO } from './dtos/update-category.dto'
import { ICategory } from './interfaces/category.interface'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<ICategory>,
    private readonly playersService: PlayersService
  ) {}

  async createCategory(categoryDTO: CreateCategoryDTO): Promise<ICategory> {
    const { category } = categoryDTO
    const categoryFind = await this.categoryModel.findOne({ category }).exec()
    if (categoryFind) {
      throw new BadRequestException('Category already exists!')
    }

    const categoryCreate = new this.categoryModel(categoryDTO)
    return await categoryCreate.save()
  }

  async getCategories(): Promise<ICategory[]> {
    return await this.categoryModel.find().populate('players').exec()
  }

  async getCategory(id: string): Promise<ICategory> {
    const category = await this.categoryModel
      .findOne({ _id: id })
      .exec()
      .catch(() => {
        throw new NotFoundException('Category does not exists!')
      })
    return category
  }

  async updateCategory(
    id: string,
    categoryDTO: UpdateCategoryDTO
  ): Promise<void> {
    const categoryFind = await this.categoryModel
      .findOne({ _id: id })
      .exec()
      .catch(() => {
        throw new NotFoundException('Category does not exists!')
      })
    if (!categoryFind) {
      throw new NotFoundException('Category does not exists!')
    }

    await this.categoryModel
      .findOneAndUpdate({ _id: id }, { $set: categoryDTO })
      .exec()
      .catch(() => {
        throw new BadRequestException('Application Error!')
      })
  }

  async deleteCategory(id: string): Promise<void> {
    const categoryFind = await this.categoryModel
      .findOne({ _id: id })
      .exec()
      .catch(() => {
        throw new NotFoundException('Category does not exists!')
      })
    if (!categoryFind) {
      throw new NotFoundException('Category does not exists!')
    }

    await this.categoryModel
      .findOneAndDelete({ _id: id })
      .exec()
      .catch(() => {
        throw new BadRequestException('Application Error!')
      })
  }

  async assingCategoryInPlayer(params: string[]): Promise<void> {
    const idCategory = params['idcategory']
    const idPlayer = params['idplayer']

    const categoryFind = await this.categoryModel
      .findOne({ _id: idCategory })
      .exec()
      .catch(() => {
        throw new NotFoundException('Category does not exists!')
      })
    if (!categoryFind) {
      throw new NotFoundException('Category does not exists!')
    }

    const playerFind = await this.playersService.getPlayer(idPlayer)
    if (!playerFind) {
      throw new NotFoundException('Player does not exists!')
    }

    const playersAlreadyRegisteredIntheCategory = await this.categoryModel
      .findOne({ _id: idCategory, players: { _id: idPlayer } })
      .exec()
    if (playersAlreadyRegisteredIntheCategory) {
      throw new BadRequestException('Player already registered!')
    }

    categoryFind.players.push(idPlayer)
    await this.categoryModel
      .findOneAndUpdate({ _id: idCategory }, { $set: categoryFind })
      .exec()
      .catch(() => {
        throw new BadRequestException('Application Error!')
      })
  }
}
