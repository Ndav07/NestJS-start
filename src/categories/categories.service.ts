import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateCategoryDTO } from './dtos/create-category.dto'
import { ICategory } from './interfaces/category.interface'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<ICategory>
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
    return await this.categoryModel.find().exec()
  }

  async getCategory(id: string): Promise<ICategory> {
    try {
      const category = await this.categoryModel.findOne({ _id: id }).exec()
      return category
    } catch {
      throw new NotFoundException('Category does not exists!')
    }
  }
}
