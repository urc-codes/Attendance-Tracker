import { MoreVertical } from 'lucide-react';
import { Member } from '../../types';

interface MemberListProps {
  members: Member[];
  onMarkPresent: (id: string) => void;
  onShowDetails: (member: Member) => void;
  searchQuery: string;
  selectedGroup: string;
}

export function MemberList({ 
  members, 
  onMarkPresent, 
  onShowDetails,
  searchQuery,
  selectedGroup
}: MemberListProps) {
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = selectedGroup === 'All Groups' || member.projectGroup === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-4 p-4 border-b border-gray-800">
          <h3 className="text-gray-300 font-medium">Member</h3>
          <h3 className="text-gray-300 font-medium">Status</h3>
          <h3 className="text-gray-300 font-medium">Action</h3>
          <h3 className="text-gray-300 font-medium text-right">Details</h3>
        </div>
        {filteredMembers.map((member) => (
          <div key={member.id} className="grid grid-cols-4 p-4 border-b border-gray-800 items-center hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center text-gray-900 font-medium">
                {member.name[0]}
              </div>
              <div>
                <p className="text-white font-medium">{member.name}</p>
                <p className="text-gray-400 text-sm">ID: {member.id}</p>
              </div>
            </div>
            <div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                member.present ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {member.present ? 'Present' : 'Absent'}
              </span>
            </div>
            <button
              onClick={() => onMarkPresent(member.id)}
              className={`px-4 py-2 text-white rounded-md w-fit transition-colors ${
                member.present 
                  ? 'bg-gray-500 hover:bg-gray-600' 
                  : 'bg-emerald-500 hover:bg-emerald-600'
              }`}
            >
              {member.present ? 'Mark Absent' : 'Mark Present'}
            </button>
            <div className="flex justify-end">
              <button 
                onClick={() => onShowDetails(member)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-full"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {filteredMembers.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            No members found matching your search criteria
          </div>
        )}
      </div>
    </div>
  );
}