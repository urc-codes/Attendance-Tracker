import { Users, Calendar } from 'lucide-react';
import { StatsCard } from './StatsCard';

interface StatsGridProps {
  totalMembers: number;
  presentMembers: number;
}

export function StatsGrid({ totalMembers, presentMembers }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <StatsCard
        title={`Present (${new Date().toLocaleDateString('en-US', { weekday: 'long' })})`}
        value={`${presentMembers}/${36}`}
        Icon={Calendar}
      />
      <StatsCard
        title="Total Members"
        value={totalMembers}
        Icon={Users}
      />
    </div>
  );
}