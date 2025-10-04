import { ListFilter } from 'lucide-react';

interface TaskFiltersProps {
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  sortBy: 'created' | 'deadline' | 'priority';
  onSortChange: (sort: 'created' | 'deadline' | 'priority') => void;
}

export function TaskFilters({ filter, onFilterChange, sortBy, onSortChange }: TaskFiltersProps) {
  const filters = [
    { value: 'all' as const, label: 'All Tasks' },
    { value: 'active' as const, label: 'Active' },
    { value: 'completed' as const, label: 'Completed' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex items-center gap-2">
        <ListFilter className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filter:</span>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === f.value
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as 'created' | 'deadline' | 'priority')}
          className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
        >
          <option value="created">Date Created</option>
          <option value="deadline">Deadline</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
}
