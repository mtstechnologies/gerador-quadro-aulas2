import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { mockSubjects } from "@/lib/mock-data";
import Link from "next/link";

export default function DisciplinasPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Gerenciamento de Disciplinas
          </h1>
          <p className="text-muted-foreground">
            Adicione, edite e visualize as disciplinas da instituição.
          </p>
        </div>
        <Button asChild>
          <Link href="/disciplinas/novo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Disciplina
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={mockSubjects} />
    </div>
  );
}
