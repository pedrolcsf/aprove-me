import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './services/local-auth.guard';
import { JwtAuthGuard } from './services/jwt-auth.guard';

@Controller('/integrations/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  listProfile(@Request() req: any) {
    return this.authService.listProfile(req);
  }
}
