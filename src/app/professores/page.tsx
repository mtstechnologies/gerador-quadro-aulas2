import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { mockProfessors } from "@/lib/mock-data";

export default function ProfessoresPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Gerenciamento de Professores
          </h1>
          <p className="text-muted-foreground">
            Adicione, edite e visualize os professores da instituição.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Professor
        </Button>
      </div>
      <DataTable columns={columns} data={mockProfessors} />
    </div>
  );
}
