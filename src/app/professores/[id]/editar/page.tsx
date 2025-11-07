import { ProfessorForm } from "../../components/professor-form";
import { mockProfessors } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export default function EditarProfessorPage({ params }: { params: { id: string } }) {
  const professor = mockProfessors.find(p => p.id === params.id);

  if (!professor) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Editar Professor
        </h1>
        <p className="text-muted-foreground">
          Altere os dados do professor abaixo.
        </p>
      </div>
      <ProfessorForm professor={professor} />
    </div>
  );
}
