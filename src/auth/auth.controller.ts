import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterDto, SignUpResponse } from './dto/register.dto';
import { LoginDto, LoginResponse } from './dto/login.dto';
import { VerificationDto } from './dto/verification.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({
    type: SignUpResponse,
    description: 'User Created Successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Some Unknown Error Occurred',
  })
  @ApiOperation({ description: 'Create User', summary: 'Create User' })
  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password, body.name);
  }

  @ApiOkResponse({
    type: LoginResponse,
    description: 'User Login Successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Some Unknown Error Occurred',
  })
  @ApiOperation({ description: 'Login User', summary: 'Login User' })
  @ApiNotFoundResponse({
    description: 'User Not Found',
  })
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @ApiOkResponse({
    description: 'Verification email sent successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Some Unknown Error Occurred',
  })
  @ApiOperation({
    description: 'Send Verification Email',
    summary: 'Send Verification Email',
  })
  @Post('send-verification-email')
  async sendVerificationEmail(@Body() body: VerificationDto) {
    return this.authService.sendVerificationEmail(body.uid);
  }

  @ApiOkResponse({
    description: 'User verified successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Some Unknown Error Occurred',
  })
  @ApiOperation({ description: 'Verify User', summary: 'Verify User' })
  @Post('resend-verification-email')
  async resendVerificationEmail(@Body() body: VerificationDto) {
    return this.authService.resendVerificationEmail(body.email);
  }

  @ApiOkResponse({
    description: 'Password reset email sent successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Some Unknown Error Occurred',
  })
  @ApiOperation({
    description: 'Forgot Password',
    summary: 'Forgot Password',
  })
  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body.email);
  }
}
