import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/user/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getUnique(id: string): User | null {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new BadRequestException({
        statusCode: 404,
        message: "User with this id doesn't exist",
      });
    }
    return user;
  }

  create(user: User): User {
    const newUser = {
      id: uuidv4(),
      ...user,
      version: 1,
      createdAt: Date.now(),
      updatedAt: null,
    };
    this.users.push(newUser);
    return newUser;
  }
}
