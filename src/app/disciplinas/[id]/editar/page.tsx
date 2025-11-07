import { DisciplinaForm } from "../../components/disciplina-form";
import { mockSubjects } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export default function EditarDisciplinaPage({ params }: { params: { id: string } }) {
  const subject = mockSubjects.find(s => s.id === params.id);

  if (!subject) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Editar Disciplina
        </h1>
        <p className="text-muted-foreground">
          Altere os dados da disciplina abaixo.
        </p>
      </div>
      <DisciplinaForm subject={subject} />
    </div>
  );
}
