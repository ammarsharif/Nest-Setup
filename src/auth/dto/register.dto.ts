import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;
}

export class SignUpResponse {
  @ApiProperty({ example: '12345', description: 'The ID of the user' })
  id: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;
}
