export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}
