export interface Tarea {
  id?: string;
  description: string;
  completed?: boolean;
  createdAt: string;
  direccion?: Record<string, any>;
}
