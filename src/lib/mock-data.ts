import type { Professor, Subject, SchoolClass, ScheduleEntry } from './types';

export const mockProfessors: Professor[] = [
  { id: '1', name: 'Dr. Arnaldo Cohen', email: 'arnaldo.c@escola.com', subjects: ['Matemática', 'Física'] },
  { id: '2', name: 'Dra. Beatriz Souza', email: 'beatriz.s@escola.com', subjects: ['Português', 'Literatura'] },
  { id: '3', name: 'Dr. Carlos Lima', email: 'carlos.l@escola.com', subjects: ['História', 'Geografia'] },
  { id: '4' , name: 'Dra. Diana Martins', email: 'diana.m@escola.com', subjects: ['Biologia', 'Química'] },
  { id: '5' , name: 'Dr. Eduardo Faria', email: 'eduardo.f@escola.com', subjects: ['Inglês'] },
];

export const mockSubjects: Subject[] = [
  { id: '1', code: 'MAT01', name: 'Matemática', workload: 5, requiresSpecialRoom: false },
  { id: '2', code: 'FIS01', name: 'Física', workload: 4, requiresSpecialRoom: true },
  { id: '3', code: 'POR01', name: 'Português', workload: 5, requiresSpecialRoom: false },
  { id: '4', code: 'HIS01', name: 'História', workload: 3, requiresSpecialRoom: false },
  { id: '5', code: 'BIO01', name: 'Biologia', workload: 4, requiresSpecialRoom: true },
];

export const mockSchoolClasses: SchoolClass[] = [
  { id: '1', name: '9º Ano A', shift: 'Manhã', capacity: 30 },
  { id: '2', name: '9º Ano B', shift: 'Manhã', capacity: 30 },
  { id: '3', name: '1º Ano A', shift: 'Tarde', capacity: 35 },
  { id: '4', name: '1º Ano B', shift: 'Tarde', capacity: 35 },
  { id: '5', name: '2º Ano A', shift: 'Manhã', capacity: 32 },
];

export const mockSchedule: ScheduleEntry[] = [
    { id: '1', day: 'Segunda', time: '07:30 - 08:20', subject: 'Matemática', professor: 'Dr. Arnaldo Cohen', class: '9º Ano A', room: '101' },
    { id: '2', day: 'Segunda', time: '08:20 - 09:10', subject: 'Português', professor: 'Dra. Beatriz Souza', class: '9º Ano A', room: '101' },
    { id: '3', day: 'Terça', time: '09:30 - 10:20', subject: 'Física', professor: 'Dr. Arnaldo Cohen', class: '1º Ano A', room: 'Lab 1' },
    { id: '4', day: 'Quarta', time: '10:20 - 11:10', subject: 'História', professor: 'Dr. Carlos Lima', class: '9º Ano B', room: '202' },
    { id: '5', day: 'Quinta', time: '14:00 - 14:50', subject: 'Biologia', professor: 'Dra. Diana Martins', class: '1º Ano A', room: 'Lab 2' },
    { id: '6', day: 'Sexta', time: '11:10 - 12:00', subject: 'Inglês', professor: 'Dr. Eduardo Faria', class: '2º Ano A', room: '301' },
];

export const timeSlots = [
    '07:30 - 08:20',
    '08:20 - 09:10',
    '09:30 - 10:20',
    '10:20 - 11:10',
    '11:10 - 12:00',
    '13:00 - 13:50',
    '14:00 - 14:50',
    '15:00 - 15:50',
]
export const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'] as const;
