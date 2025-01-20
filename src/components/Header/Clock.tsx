import { useEffect, useState } from 'react';
import { Clock as ClockIcon } from 'lucide-react';

export function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-6 text-gray-300">
      <div className="flex items-center gap-2">
        <ClockIcon className="w-5 h-5 text-cyan-400" />
        {date.toLocaleTimeString()}
      </div>
      <div>
        {date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
    </div>
  );
}