import { Injectable, BadRequestException } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getStaticProductImage(image: string){
    const path = join(__dirname, '../../static/products', image);

    if(!existsSync(path))
      throw new BadRequestException(`No product found with image ${image}`)

    return path;
  }
} 
