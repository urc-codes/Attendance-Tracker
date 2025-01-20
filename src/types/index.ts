export interface Member {
  id: string;
  name: string;
  present?: boolean;
  role: string;
  projectGroup: string;
  totalHours: number;
  skills: string[];
}

export interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  sessionLength: number;
}