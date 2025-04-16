import {
  IsAlpha,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

enum Permissions {
  ADMIN = 'ADMIN',
  USER = 'USER',
  DEVELOPER = 'DEVELOPER',
}

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
    message: 'password too weak',
  })
  password: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @IsAlpha()
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @IsAlpha()
  lastName: string;

  @IsNotEmpty()
  @IsEnum(Permissions, { each: true })
  role: Permissions[];
}

export class UserProfileDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  photoURL: string;

  @IsNotEmpty()
  isEmailVerified: boolean;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  @Matches(/^\d+$/, { message: 'phoneNumber must be numeric' })
  phoneNumber: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;

  @IsNotEmpty()
  lastLogin: Date;
}
