import { ChevronDown } from 'lucide-react';

interface GroupSelectProps {
  groups: string[];
  selectedGroup: string;
  onSelect: (group: string) => void;
}

export function GroupSelect({ groups, selectedGroup, onSelect }: GroupSelectProps) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-md px-4 py-2 text-white w-full">
        <span>{selectedGroup}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-800 rounded-md shadow-lg hidden group-hover:block">
        {groups.map((group) => (
          <button
            key={group}
            onClick={() => onSelect(group)}
            className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800"
          >
            {group}
          </button>
        ))}
      </div>
    </div>
  );
}