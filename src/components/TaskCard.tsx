import { Check, Clock, Trash2, Calendar, Flag } from 'lucide-react';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const priorityColors = {
    low: 'from-emerald-400 to-teal-500',
    medium: 'from-amber-400 to-orange-500',
    high: 'from-rose-400 to-pink-600',
  };

  const priorityBg = {
    low: 'bg-emerald-100 text-emerald-700',
    medium: 'bg-amber-100 text-amber-700',
    high: 'bg-rose-100 text-rose-700',
  };

  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !task.completed;

  return (
    <div
      className={`group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1 ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${priorityColors[task.priority]} rounded-l-xl`}></div>

      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            task.completed
              ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-transparent scale-110'
              : 'border-gray-300 hover:border-blue-500 hover:scale-110'
          }`}
        >
          {task.completed && <Check className="w-4 h-4 text-white" />}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-gray-900 mb-1 transition-all ${
            task.completed ? 'line-through text-gray-500' : ''
          }`}>
            {task.title}
          </h3>

          {task.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className={`px-2.5 py-1 rounded-full font-medium ${priorityBg[task.priority]}`}>
              <Flag className="w-3 h-3 inline mr-1" />
              {task.priority}
            </span>

            {task.deadline && (
              <span className={`flex items-center gap-1.5 ${
                isOverdue ? 'text-rose-600 font-medium' : 'text-gray-500'
              }`}>
                <Calendar className="w-3.5 h-3.5" />
                {new Date(task.deadline).toLocaleDateString()}
              </span>
            )}

            <span className="flex items-center gap-1.5 text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-rose-50 rounded-lg text-gray-400 hover:text-rose-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
