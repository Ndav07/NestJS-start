import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'

import { CategoriesService } from './categories.service'
import { CreateCategoryDTO } from './dtos/create-category.dto'
import { UpdateCategoryDTO } from './dtos/update-category.dto'
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

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Body() categoryDTO: UpdateCategoryDTO,
    @Param('id') id: string
  ): Promise<void> {
    await this.categoriesService.updateCategory(id, categoryDTO)
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') id: string): Promise<void> {
    await this.categoriesService.deleteCategory(id)
  }

  @Post('/:idcategory/players/:idplayer')
  async assingCategoryInPlayer(@Param() params: string[]): Promise<void> {
    await this.categoriesService.assingCategoryInPlayer(params)
  }
}
