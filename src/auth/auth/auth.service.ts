import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { CreateUserDto, CredentialsDto } from '../user/dto';
import { JwtPayload, LoginResponse } from '../../interfaces';
import { UserCreated } from '../user/interface/user-created.interface';

@Injectable()
export class AuthService {constructor(
  private usersService: UserService,
  private jwtService: JwtService,
) {}

  async create(user: CreateUserDto): Promise<UserCreated> {
    return  await this.usersService.create(user);
  }

  async login(credentials: CredentialsDto): Promise<LoginResponse> {

    const { email, password } = credentials;
    const userInDb = await this.usersService.findOneByEmail(email);
    if (!userInDb) {
      throw new NotFoundException('User not found');
    }

    const passwordMatches = await bcrypt.compare(password, userInDb.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateAccessToken(userInDb.id);
  }

  private generateAccessToken(userId: string): { access_token: string } {
    const payload = { id: userId };
    const access_token = this.getAccessToken(payload);
    return { access_token };
  }

  private getAccessToken( payload: JwtPayload ) {
    return this.jwtService.sign(payload);
  }
}