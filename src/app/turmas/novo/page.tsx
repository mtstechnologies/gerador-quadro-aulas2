import { TurmaForm } from "../components/turma-form";

export default function NovaTurmaPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Cadastrar Nova Turma
        </h1>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para adicionar uma nova turma ao sistema.
        </p>
      </div>
      <TurmaForm />
    </div>
  );
}
