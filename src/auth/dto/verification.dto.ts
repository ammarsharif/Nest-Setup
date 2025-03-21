import { ApiProperty } from '@nestjs/swagger';

export class VerificationDto {
  @ApiProperty({ example: '12345', description: 'The UID of the user' })
  uid: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  email: string;
}
