import { Notebook as Robot } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gray-900 p-4 flex justify-between items-center border-b border-gray-800">
      <div className="flex items-center gap-2">
        <Robot className="w-8 h-8 text-cyan-400" />
        <h1 className="text-xl font-bold text-white">URC A Tracker</h1>
      </div>
      <div className="text-gray-300">
        Monday, January 20, 2025
      </div>
    </header>
  );
}