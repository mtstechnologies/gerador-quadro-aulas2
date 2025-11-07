import { TurmaForm } from "../../components/turma-form";
import { mockSchoolClasses } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export default function EditarTurmaPage({ params }: { params: { id: string } }) {
  const schoolClass = mockSchoolClasses.find(s => s.id === params.id);

  if (!schoolClass) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Editar Turma
        </h1>
        <p className="text-muted-foreground">
          Altere os dados da turma abaixo.
        </p>
      </div>
      <TurmaForm schoolClass={schoolClass} />
    </div>
  );
}
