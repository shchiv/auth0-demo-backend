import { Controller, Get, Param } from '@nestjs/common';
import { AuthService, AuthReponse } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/:code')
  async requestToken(@Param('code') code: string): Promise<AuthReponse> {
    return this.authService.getJWToken(code);
  }
}
