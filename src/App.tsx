import { useState, useMemo } from 'react';
import { Task } from './types/task';
import { TaskCard } from './components/TaskCard';
import { TaskForm } from './components/TaskForm';
import { TaskStats } from './components/TaskStats';
import { TaskFilters } from './components/TaskFilters';
import { CheckSquare, Sparkles } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'created' | 'deadline' | 'priority'>('created');

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    if (filter === 'active') {
      filtered = tasks.filter((task) => !task.completed);
    } else if (filter === 'completed') {
      filtered = tasks.filter((task) => task.completed);
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'created') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'deadline') {
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      } else {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
    });

    return sorted;
  }, [tasks, filter, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12 animate-in fade-in slide-in-from-top duration-700">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Organize your day, achieve your goals, and stay productive with style.
          </p>
        </div>

        <div className="space-y-6">
          <div className="animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: '100ms' }}>
            <TaskStats tasks={tasks} />
          </div>

          <div className="animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: '200ms' }}>
            <TaskForm onAdd={addTask} />
          </div>

          {tasks.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: '300ms' }}>
              <TaskFilters filter={filter} onFilterChange={setFilter} sortBy={sortBy} onSortChange={setSortBy} />
            </div>
          )}

          <div className="space-y-4">
            {filteredAndSortedTasks.length === 0 ? (
              <div className="text-center py-16 animate-in fade-in duration-700">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-4">
                  <CheckSquare className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {filter === 'completed' ? 'No completed tasks yet' : filter === 'active' ? 'No active tasks' : 'No tasks yet'}
                </h3>
                <p className="text-gray-500">
                  {filter === 'all' ? 'Create your first task to get started!' : 'Try a different filter to see your tasks.'}
                </p>
              </div>
            ) : (
              filteredAndSortedTasks.map((task, index) => (
                <div
                  key={task.id}
                  className="animate-in fade-in slide-in-from-bottom duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TaskCard task={task} onToggle={toggleTask} onDelete={deleteTask} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
