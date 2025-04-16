import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FirebaseAuthGuard } from '../../auth/guards/firebase-auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';

@Controller('task')
@UseGuards(FirebaseAuthGuard)
@ApiBearerAuth('access-token')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create/:userId')
  @ApiOperation({ summary: 'Create and assign task' })
  async createTask(@Param('userId') userId: string, @Body() taskDto: TaskDto) {
    return this.taskService.create(userId, taskDto);
  }

  @Patch('update/:taskId')
  @ApiOperation({ summary: 'Update task status or assignment' })
  async updateTask(
    @Param('taskId') taskId: string,
    @Body()
    payload: {
      updates: Partial<TaskDto>;
      newUserId?: string;
    },
  ) {
    return this.taskService.update(taskId, payload.updates, payload.newUserId);
  }
}
