import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
 constructor(
    @InjectRepository(Product)
    private readonly productModel: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    // checking unique name
    const existing = await this.productModel.findOne({ where: { name: dto.name } });
    if (existing) throw new BadRequestException('Product name must be unique');

    const p = this.productModel.create({
      name: dto.name,
      price: dto.price,
      quantity: dto.quantity,
      status: dto.status ?? true,
    });
    return this.productModel.save(p);
  }

  // get all products which is not soft deletd
  findAllActive() {
    return this.productModel.find({ where: { status: true } });
  }
 // Only updating price and quantity
  async updatePartial(id: number, dto: UpdateProductDto) {
    const p = await this.productModel.findOne({ where: { id } });
    if (!p) throw new NotFoundException('Product not found');

    if (dto.price !== undefined) p.price = dto.price;
    if (dto.quantity !== undefined) p.quantity = dto.quantity;

    return this.productModel.save(p);
  }
// soft deleting the product marking status as false
  async softDelete(id: number) {
    const p = await this.productModel.findOne({ where: { id } });
    if (!p) throw new NotFoundException('Product not found');
    p.status = false;
    return this.productModel.save(p);
  }

}
