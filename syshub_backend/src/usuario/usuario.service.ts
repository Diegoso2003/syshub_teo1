/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ValidadorUsuario } from './validador-usuario';
import { PrismaService } from '../prisma/prisma.service';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class UsuarioService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcrypt: BcryptService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const validador = new ValidadorUsuario();
    validador.validar(createUsuarioDto);
    await this.validarEmailUnico(createUsuarioDto.email);
    createUsuarioDto.password = await this.bcrypt.hashPassword(createUsuarioDto.password);
    const { confirPassword, ...nuevo } = createUsuarioDto;
    await this.prisma.usuario.create({
      data: nuevo,
    });
    return 'Usuario creado correctamente';
  }

  findAll() {
    return `This action returns all usuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

  async validarEmailUnico(email: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });
    if (usuario) {
      throw new ConflictException('Ya existe una cuenta enlazada con este correo electronico.');
    }
  }
}
