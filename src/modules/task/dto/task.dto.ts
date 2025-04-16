import { IsEnum, IsNotEmpty, MaxLength } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @MaxLength(200)
  description: string;

  @IsNotEmpty()
  @IsEnum(['TODO', 'IN_PROGRESS', 'DONE'])
  status: string;
}

export class TaskUpdateDto {
  @IsEnum(['TODO', 'IN_PROGRESS', 'DONE'])
  status?: string;

  @IsNotEmpty()
  assignedUserId?: string;
}
