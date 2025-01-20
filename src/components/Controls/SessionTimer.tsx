import { Timer } from 'lucide-react';
import { useEffect } from 'react';
import { TimerState } from '../../types';

interface SessionTimerProps {
  timer: TimerState;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

export function SessionTimer({ timer, onStart, onStop, onReset }: SessionTimerProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (timer.timeLeft === 0 && timer.isRunning) {
      onStop();
      onReset();
    }
  }, [timer.timeLeft, timer.isRunning]);

  return (
    <div className="flex items-center gap-4">
      <div className="bg-gray-900 px-4 py-2 rounded-md border border-gray-800">
        <span className="text-xl font-mono text-white">{formatTime(timer.timeLeft)}</span>
      </div>
      <button
        onClick={timer.isRunning ? onStop : onStart}
        className="flex items-center gap-2 bg-cyan-500 text-white rounded-md px-4 py-2 hover:bg-cyan-600 transition-colors"
      >
        <Timer className="w-4 h-4" />
        {timer.isRunning ? 'Stop Session' : 'Start Session'}
      </button>
    </div>
  );
}