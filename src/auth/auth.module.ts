import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configServide: ConfigService) => {
        return {
          secret: configServide.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '1h'
          }
        }
      },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  exports: [TypeOrmModule, AuthService, JWTStrategy, PassportModule, JwtModule]
})
export class AuthModule { }
