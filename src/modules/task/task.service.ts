import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './schemas/task.entity';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(id: string, task: TaskDto): Promise<Task> {
    const newTask = this.taskRepository.create({ ...task, assignedTo: id });
    return this.taskRepository.save(newTask);
  }
}
