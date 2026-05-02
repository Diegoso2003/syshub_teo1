import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './dto/login.dto';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';
import { UsuarioService } from '../usuario/usuario.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @Post('login')
  async login(@Body() login: Login) {
    return await this.authService.validarLogin(login);
  }

  @Post('registro')
  async registro(@Body() usuario: CreateUsuarioDto) {
    usuario.rol = 1;
    return await this.usuarioService.create(usuario);
  }
}
