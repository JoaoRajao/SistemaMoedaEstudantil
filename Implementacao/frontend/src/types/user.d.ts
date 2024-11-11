export interface User {
  id: string;
  email: string;
  name: string;
  empresaId?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
