import { UnauthorizedException, Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy){

  constructor(
    @InjectRepository(User)
    private readonly userReposotory: Repository<User>,

    configService: ConfigService
  ){
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  async validate(payload: JwtPayload): Promise<User>{
    const {id} = payload;
    const user = await this.userReposotory.findOneBy({id});
    if(!user)
      throw new UnauthorizedException('Token no valid');
    
    if(!user.isActive)
      throw new UnauthorizedException('usuario no esta activo');

    return user;
  }

}