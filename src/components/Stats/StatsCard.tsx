import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  Icon: LucideIcon;
  iconColor?: string;
}

export function StatsCard({ title, value, Icon, iconColor = 'text-cyan-400' }: StatsCardProps) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-gray-400 text-sm">{title}</h3>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
    </div>
  );
}