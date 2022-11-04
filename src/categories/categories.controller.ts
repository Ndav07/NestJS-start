import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDTO } from './dtos/create-category.dto'
import { ICategory } from './interfaces/category.interface'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDTO: CreateCategoryDTO
  ): Promise<ICategory> {
    return await this.categoriesService.createCategory(createCategoryDTO)
  }
}
