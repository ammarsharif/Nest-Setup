import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../../auth/guards/firebase-auth.guard';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';

@Controller('task')
@UseGuards(FirebaseAuthGuard)
@ApiBearerAuth('access-token')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOkResponse({
    type: TaskDto,
    description: 'Task Created Successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({
    description: 'Some Unknown Error Occurred',
  })
  @ApiOperation({
    summary: 'Create Task',
    description: 'Create a new task',
  })
  @Post('create/:id')
  async createTask(@Param('id') id: string, task: TaskDto): Promise<TaskDto> {
    return this.taskService.create(id, task);
  }
}
