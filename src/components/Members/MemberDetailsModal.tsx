import { X } from 'lucide-react';
import { Member } from '../../types';

interface MemberDetailsModalProps {
  member: Member;
  isOpen: boolean;
  onClose: () => void;
}

export function MemberDetailsModal({ member, isOpen, onClose }: MemberDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center text-gray-900 text-xl font-bold">
              {member.name[0]}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{member.name}</h2>
              <p className="text-gray-400">ID: {member.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-gray-400 mb-1">Role</h3>
            <p className="text-white text-lg">{member.role}</p>
          </div>

          <div>
            <h3 className="text-gray-400 mb-1">Project Group</h3>
            <p className="text-white text-lg">{member.projectGroup}</p>
          </div>

          <div>
            <h3 className="text-gray-400 mb-1">Total Hours</h3>
            <p className="text-white text-lg">{member.totalHours} hours</p>
          </div>

          <div>
            <h3 className="text-gray-400 mb-1">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}