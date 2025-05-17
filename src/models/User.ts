import { executeQuery } from '../config/database';

export interface User {
  id?: number;
  username: string;
  email: string;
  created_at?: Date;
}

export class UserModel {
  static async findAll(): Promise<User[]> {
    return executeQuery<User[]>('SELECT * FROM users');
  }

  static async findById(id: number): Promise<User | null> {
    const users = await executeQuery<User[]>('SELECT * FROM users WHERE id = ?', [id]);
    return users[0] || null;
  }

  static async create(user: Omit<User, 'id' | 'created_at'>): Promise<User> {
    const result = await executeQuery<any>(
      'INSERT INTO users (username, email) VALUES (?, ?)',
      [user.username, user.email]
    );
    return { ...user, id: result.insertId };
  }

  static async update(id: number, user: Partial<User>): Promise<boolean> {
    const { username, email } = user;
    const result = await executeQuery<any>(
      'UPDATE users SET username = ?, email = ? WHERE id = ?',
      [username, email, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await executeQuery<any>('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
} 