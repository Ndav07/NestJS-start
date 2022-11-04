import {
  Body,
  Controller,
  Get,
  Param,
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

  @Get()
  async getCategories(): Promise<ICategory[]> {
    return await this.categoriesService.getCategories()
  }

  @Get('/:id')
  async getCategory(@Param('id') id: string): Promise<ICategory> {
    return await this.categoriesService.getCategory(id)
  }
}
