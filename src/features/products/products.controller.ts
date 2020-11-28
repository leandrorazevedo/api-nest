import { TimestampGuard } from './../../common/guards/timestamp.guard';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Req, SetMetadata, UseGuards } from '@nestjs/common';

import { JwtGuard } from './../../common/guards/jwt.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@UseGuards(TimestampGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @SetMetadata('avaliarJwtGuard', false)
  @Get()
  findAll(@Req() req, @Query() query) {
    // console.log(query);
    console.log(req.jwtDecoded)
    if (req.userData?.user_id && req.userData.user_id === 'zQNzsCOzGbS8pZX21eiYlxFVO0U2' ) {
      return 'Flamengo é fregues do São Paulo !!';
    }
    return this.productsService.findAll({
      page: query.page,
      limit: query.limit,
    });
  }
  
  @SetMetadata('avaliarJwtGuard', false)
  @Get(':id')
  @UseGuards(JwtGuard)
  findOne(@Req() req, @Param('id') id: string) {
    // console.log(req.user);
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
