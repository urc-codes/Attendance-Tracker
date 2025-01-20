import { Plus } from 'lucide-react';

interface AddMemberButtonProps {
  onClick: () => void;
}

export function AddMemberButton({ onClick }: AddMemberButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 bg-cyan-500 text-white rounded-md px-4 py-2 hover:bg-cyan-600 transition-colors"
    >
      <Plus className="w-4 h-4" />
      Add Member
    </button>
  );
}