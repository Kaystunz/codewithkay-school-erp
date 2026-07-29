export type UserRole =
  | "Admin"
  | "Teacher"
  | "Parent"
  | "Student";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  address: string;
  profileImage: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type ProfileUpdateData = {
  name: string;
  phone: string;
  address: string;
  profileImage: string;
};