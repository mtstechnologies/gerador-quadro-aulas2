'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { daysOfWeek, timeSlots } from "@/lib/mock-data";
import { ScheduleEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ScheduleGridProps {
    schedule: ScheduleEntry[];
}

const subjectColors = [
    'bg-red-100 border-red-200',
    'bg-blue-100 border-blue-200',
    'bg-green-100 border-green-200',
    'bg-yellow-100 border-yellow-200',
    'bg-purple-100 border-purple-200',
    'bg-indigo-100 border-indigo-200',
    'bg-pink-100 border-pink-200',
    'bg-sky-100 border-sky-200',
];

const getSubjectColor = (subject: string) => {
    let hash = 0;
    for (let i = 0; i < subject.length; i++) {
        hash = subject.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % subjectColors.length);
    return subjectColors[index];
}


export function ScheduleGrid({ schedule }: ScheduleGridProps) {
    
    const findEntry = (day: string, time: string) => {
        return schedule.find(entry => entry.day === day && entry.time === time);
    }

    return (
        <div className="rounded-lg border bg-card">
            <Table className="min-w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-32">Horário</TableHead>
                        {daysOfWeek.map(day => (
                            <TableHead key={day} className="text-center">{day}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {timeSlots.map(time => (
                        <TableRow key={time}>
                            <TableCell className="font-medium text-muted-foreground">{time}</TableCell>
                            {daysOfWeek.map(day => {
                                const entry = findEntry(day, time);
                                return (
                                    <TableCell key={day} className="p-1 align-top">
                                        {entry ? (
                                            <div className={cn("h-full min-h-[100px] w-full cursor-grab rounded-md border p-2 shadow-sm", getSubjectColor(entry.subject))}>
                                                <p className="text-sm font-bold">{entry.subject}</p>
                                                <p className="text-xs text-gray-700">{entry.professor}</p>
                                                <p className="text-xs text-gray-500 mt-2">{entry.class}</p>
                                                <p className="text-xs text-gray-500">Sala: {entry.room}</p>
                                            </div>
                                        ) : <div className="h-full min-h-[100px] w-full"></div>}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
