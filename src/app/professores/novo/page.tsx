import { ProfessorForm } from "../components/professor-form";

export default function NovoProfessorPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Cadastrar Novo Professor
        </h1>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para adicionar um novo professor ao sistema.
        </p>
      </div>
      <ProfessorForm />
    </div>
  );
}
