import { Injectable } from '@nestjs/common'
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
    const categoryCreate = new this.categoryModel(categoryDTO)
    return await categoryCreate.save()
  }
}
