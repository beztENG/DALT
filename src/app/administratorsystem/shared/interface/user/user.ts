export interface IUser {
  name?: string;
  email: string;
  password: string;
  address?: string;
  role?: string;
  studentId?: string; // Thêm trường studentId vào IUser
  }