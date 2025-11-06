export type Professor = {
  id: string;
  name: string;
  email: string;
  subjects: string[];
};

export type Subject = {
  id: string;
  code: string;
  name: string;
  workload: number; // hours per week
  requiresSpecialRoom: boolean;
};

export type SchoolClass = {
  id: string;
  name: string;
  shift: 'Manhã' | 'Tarde' | 'Noite';
  capacity: number;
};

export type ScheduleEntry = {
  id: string;
  day: 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta';
  time: string;
  subject: string;
  professor: string;
  class: string;
  room: string;
};
