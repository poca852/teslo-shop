import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService')

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto)
      await this.userRepository.save(user)
      return user
    } catch (error) {
      this.handleDbExceptions(error)
    }
  }

  private handleDbExceptions(error: any): never{
    if(error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs')
  }

 
}
