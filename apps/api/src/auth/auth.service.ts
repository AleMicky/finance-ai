import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  private async signToken(userId: string, email: string) {
    const payload = { sub: userId, email };
    return this.jwt.signAsync(payload);
  }

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase();

    const exist = await this.prisma.user.findUnique({ where: { email } });
    if (exist) throw new BadRequestException('Email already in use');

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: { email, name: dto.name.trim(), passwordHash },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    const accessToken = await this.signToken(user.id, user.email);
    return { user, accessToken };
  }

  async login(dto: LoginDto) {
    const email = dto.email.toLowerCase();
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        passwordHash: true,
      },
    });

    if (!user) throw new UnauthorizedException('Credenciales inválidas.');

    const ok = await bcrypt.compare(dto.password, user.passwordHash);

    if (!ok) throw new UnauthorizedException('Credenciales inválidas.');

    const accessToken = await this.signToken(user.id, user.email);

    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
    return { user: safeUser, accessToken };
  }
}
