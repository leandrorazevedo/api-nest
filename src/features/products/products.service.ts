import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';

import newErrorApp from '../../common/ErrorApp/ErrorApp';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

type findAllParams = {
  page: number;
  limit: number;
};

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: PaginateModel<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = new this.productModel(createProductDto);

      const doc = await newProduct.save();

      return doc;
    } catch (error) {
      return new BadRequestException(
        newErrorApp({
          message: 'Erro ao inserir produto',
          devMessage: error.message,
        }),
      );
    }
  }

  async findAll({ limit = 50, page = 1 }: findAllParams) {
    return await this.productModel.paginate({}, { page, limit });
  }

  async findOne(id: string) {
    return await this.productModel.findById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(
        newErrorApp({ message: 'produto não encontrado' }),
      );
    }

    try {
      product.set(updateProductDto);
      return await product.save();
    } catch (error) {
      if (error.name === 'VersionError') {
        throw new ConflictException (
          newErrorApp({
            message: 'algum erro na atualização',
            devMessage: error.message,
          }),
        );
      }
    }

    // return await this.productModel.findByIdAndUpdate(id, updateProductDto, {
    //   new: true,
    // });
  }

  remove(id: string) {
    this.productModel.findByIdAndRemove(id);
  }
}
