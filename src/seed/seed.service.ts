import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {

  constructor(
    private readonly productService: ProductService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async runSeed(){
    await this.deleteTables();
    const adminUser = await this.inserUserts();
    await this.insertNewProducts(adminUser);
    return 'SEED EXECUTED'
  }

  private async deleteTables(){
    await this.productService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute()
  }

  private async inserUserts(){
    const seedUsers = initialData.users;
    const users: User[] = [];

    seedUsers.forEach( user => {
      users.push(this.userRepository.create(user))
    })

    await this.userRepository.save(users);

    return users[0]
  }

  private async insertNewProducts(user: User){
    await this.productService.deleteAllProducts();


    const products = initialData.products;

    const insertPromise = [];

    products.forEach( product => {
      insertPromise.push(this.productService.create(product, user));
    })

    await Promise.all(insertPromise)


    return true
  }
}
