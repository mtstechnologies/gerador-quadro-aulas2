'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { mockSchoolClasses } from '@/lib/mock-data';
import { SchoolClass } from '@/lib/types';
import { MoreVertical, Users } from 'lucide-react';
import Link from 'next/link';

export function ClassGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {mockSchoolClasses.map((schoolClass) => (
        <ClassCard key={schoolClass.id} schoolClass={schoolClass} />
      ))}
    </div>
  );
}

function ClassCard({ schoolClass }: { schoolClass: SchoolClass }) {
    const shiftVariant = schoolClass.shift === 'Manhã' ? 'default' : schoolClass.shift === 'Tarde' ? 'secondary' : 'outline';

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <CardTitle className="font-headline text-xl">{schoolClass.name}</CardTitle>
                        <CardDescription>
                             <Badge variant={shiftVariant}>{schoolClass.shift}</Badge>
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
                            <DropdownMenuItem asChild>
                               <Link href={`/turmas/${schoolClass.id}/editar`}>Editar Turma</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">Excluir Turma</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Capacidade: {schoolClass.capacity} alunos</span>
                </div>
            </CardContent>
            <CardFooter>
                 <Button variant="outline" className="w-full" asChild>
                    <Link href={`/turmas/${schoolClass.id}/editar`}>Ver Detalhes</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
