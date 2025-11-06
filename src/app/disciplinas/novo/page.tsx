import { DisciplinaForm } from "../components/disciplina-form";

export default function NovaDisciplinaPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Cadastrar Nova Disciplina
        </h1>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para adicionar uma nova disciplina ao sistema.
        </p>
      </div>
      <DisciplinaForm />
    </div>
  );
}
