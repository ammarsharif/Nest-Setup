import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './schemas/task.entity';
import { TaskDto, TaskUpdateDto } from './dto/task.dto';
import { User } from '../user/schemas/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: string, taskDto: TaskDto): Promise<Task> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newTask = this.taskRepository.create({
      ...taskDto,
      assignedUser: user,
    });

    return this.taskRepository.save(newTask);
  }

  async update(
    id: string,
    updates: Partial<TaskUpdateDto>,
    newUserId?: string,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');

    if (newUserId) {
      const newUser = await this.userRepository.findOne({
        where: { id: newUserId },
      });
      if (!newUser) throw new NotFoundException('User not found');
      task.assignedUser = newUser;
    }

    Object.assign(task, updates);
    return this.taskRepository.save(task);
  }

  async removeAssignment(id: string, newUserId?: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');

    if (newUserId) {
      const newUser = await this.userRepository.findOne({
        where: { id: newUserId },
      });
      if (!newUser) throw new NotFoundException('User not found');
      task.assignedUser = newUser;
    } else {
      task.assignedUser = null;
    }

    return this.taskRepository.save(task);
  }

  async delete(id: string): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');

    await this.taskRepository.remove(task);
  }
}
