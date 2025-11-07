'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { mockProfessors } from '@/lib/mock-data';
import { Professor } from '@/lib/types';
import { Mail, MoreVertical } from 'lucide-react';

export function ProfessorGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {mockProfessors.map((professor) => (
        <ProfessorCard key={professor.id} professor={professor} />
      ))}
    </div>
  );
}

function ProfessorCard({ professor }: { professor: Professor }) {

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <CardTitle className="font-headline text-xl">{professor.name}</CardTitle>
                        <CardDescription className='flex items-center gap-2'>
                            <Mail className='h-4 w-4'/>
                            {professor.email}
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
                            <DropdownMenuItem>Editar Professor</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">Excluir Professor</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
                <p className='text-sm font-medium'>Disciplinas</p>
                 <div className="flex flex-wrap gap-2">
                    {professor.subjects.map(subject => (
                        <Badge key={subject} variant={'secondary'}>{subject}</Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">Ver Detalhes</Button>
            </CardFooter>
        </Card>
    )
}
