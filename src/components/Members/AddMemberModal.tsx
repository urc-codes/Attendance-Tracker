import { useState } from 'react';
import { X } from 'lucide-react';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, role: string, projectGroup: string, skills: string[]) => void;
  projectGroups: string[];
}

export function AddMemberModal({ isOpen, onClose, onAdd, projectGroups }: AddMemberModalProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [projectGroup, setProjectGroup] = useState(projectGroups[0]);
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(name, role, projectGroup, skills);
    setName('');
    setRole('');
    setProjectGroup(projectGroups[0]);
    setSkills([]);
    onClose();
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Add New Member</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Project Group</label>
              <select
                value={projectGroup}
                onChange={(e) => setProjectGroup(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
                required
              >
                {projectGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Skills</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-white px-2 py-1 rounded-md text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-cyan-500 text-white rounded-md px-4 py-2 hover:bg-cyan-600"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}