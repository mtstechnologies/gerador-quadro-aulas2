'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Grid, List, PlusCircle } from 'lucide-react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { mockProfessors } from '@/lib/mock-data';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfessorGrid } from './components/professor-grid';

type ViewMode = 'list' | 'grid';

export default function ProfessoresPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Gerenciamento de Professores
          </h1>
          <p className="text-muted-foreground">
            Adicione, edite e visualize os professores da instituição.
          </p>
        </div>
        <div className="flex w-full items-center justify-between gap-2 md:w-auto md:justify-start">
          <Tabs
            defaultValue="list"
            onValueChange={(value) => setViewMode(value as ViewMode)}
            className="hidden md:block"
          >
            <TabsList>
              <TabsTrigger value="list" aria-label="Visualização em lista">
                <List className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="grid" aria-label="Visualização em grade">
                <Grid className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button asChild>
            <Link href="/professores/novo">
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Professor
            </Link>
          </Button>
        </div>
      </div>
      {viewMode === 'list' ? (
        <DataTable columns={columns} data={mockProfessors} />
      ) : (
        <ProfessorGrid />
      )}
    </div>
  );
}
