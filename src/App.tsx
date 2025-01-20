import { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { StatsGrid } from './components/Stats/StatsGrid';
import { SearchBar } from './components/Controls/SearchBar';
import { GroupSelect } from './components/Controls/GroupSelect';
import { AddMemberButton } from './components/Controls/AddMemberButton';
import { SessionTimer } from './components/Controls/SessionTimer';
import { MemberList } from './components/Members/MemberList';
import { AddMemberModal } from './components/Members/AddMemberModal';
import { MemberDetailsModal } from './components/Members/MemberDetailsModal';
import { Member, TimerState } from './types';

const PROJECT_GROUPS = [
  'All Groups',
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Machine Learning',
  '3D Modelling',
  'Embedded Systems',
  'Hardware Programming'
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState<Member[]>([
    { 
      id: 'RC25001', 
      name: 'Alex Johnson',
      role: 'Programming Lead',
      projectGroup: 'Web Development',
      totalHours: 45,
      skills: ['React', 'TypeScript', 'Node.js'],
      present: false
    },
    { 
      id: 'RC25002', 
      name: 'Sarah Chen',
      role: 'UI/UX Designer',
      projectGroup: 'UI/UX Design',
      totalHours: 38,
      skills: ['Figma', 'Adobe XD', 'User Research'],
      present: false
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedGroup, setSelectedGroup] = useState('All Groups');
  
  const [timer, setTimer] = useState<TimerState>({
    timeLeft: 7200,
    isRunning: false,
    sessionLength: 7200
  });

  useEffect(() => {
    let interval: number;
    if (timer.isRunning && timer.timeLeft > 0) {
      interval = setInterval(() => {
        setTimer(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer.isRunning]);

  const handleAddMember = (name: string, role: string, projectGroup: string, skills: string[]) => {
    const newMember: Member = {
      id: `RC25${String(members.length + 1).padStart(3, '0')}`,
      name,
      role,
      projectGroup,
      totalHours: 0,
      skills,
      present: false
    };
    setMembers(prev => [...prev, newMember]);
    setIsAddModalOpen(false);
  };

  const handleMarkPresent = (id: string) => {
    setMembers(prev => prev.map(member => 
      member.id === id 
        ? { ...member, present: !member.present }
        : member
    ));
  };

  const startTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: true }));
  };

  const stopTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: false }));
  };

  const resetTimer = () => {
    setTimer(prev => ({ ...prev, timeLeft: prev.sessionLength }));
  };

  const presentCount = members.filter(member => member.present).length;

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <StatsGrid 
          totalMembers={members.length}
          presentMembers={presentCount}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,auto] gap-4 mb-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <GroupSelect 
            groups={PROJECT_GROUPS}
            selectedGroup={selectedGroup}
            onSelect={setSelectedGroup}
          />
          <AddMemberButton onClick={() => setIsAddModalOpen(true)} />
        </div>
        
        <div className="mb-6">
          <SessionTimer
            timer={timer}
            onStart={startTimer}
            onStop={stopTimer}
            onReset={resetTimer}
          />
        </div>
        
        <MemberList 
          members={members}
          onMarkPresent={handleMarkPresent}
          onShowDetails={setSelectedMember}
          searchQuery={searchQuery}
          selectedGroup={selectedGroup}
        />
      </main>

      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddMember}
        projectGroups={PROJECT_GROUPS.filter(group => group !== 'All Groups')}
      />

      {selectedMember && (
        <MemberDetailsModal
          member={selectedMember}
          isOpen={!!selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}

export default App;