'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { mockSubjects } from '@/lib/mock-data';
import { Subject } from '@/lib/types';
import { Clock, FlaskConical, MoreVertical, CheckCircle, XCircle } from 'lucide-react';

export function SubjectGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {mockSubjects.map((subject) => (
        <SubjectCard key={subject.id} subject={subject} />
      ))}
    </div>
  );
}

function SubjectCard({ subject }: { subject: Subject }) {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <CardTitle className="font-headline text-xl">{subject.name}</CardTitle>
                        <CardDescription>
                             <Badge variant={'secondary'}>{subject.code}</Badge>
                        </CardDescription>
                    </div>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem>Editar Disciplina</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">Excluir Disciplina</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Carga Horária: {subject.workload} h/sem</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {subject.requiresSpecialRoom 
                        ? <CheckCircle className="h-4 w-4 text-green-500" />
                        : <XCircle className="h-4 w-4 text-red-500" />
                    }
                    <span>{subject.requiresSpecialRoom ? 'Requer sala especial' : 'Não requer sala especial'}</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">Ver Detalhes</Button>
            </CardFooter>
        </Card>
    )
}
