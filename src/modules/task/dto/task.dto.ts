import { IsAlpha, IsEnum, IsNotEmpty, MaxLength } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @MaxLength(200)
  description: string;

  @IsNotEmpty()
  @IsEnum(['TODO', 'IN_PROGRESS', 'DONE'])
  status: string;

  @IsNotEmpty()
  @IsAlpha()
  assignedTo: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;
}
