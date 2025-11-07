import { ProfileForm } from "./components/profile-form";

export default function PerfilPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Meu Perfil
        </h1>
        <p className="text-muted-foreground">
          Atualize suas informações pessoais e configurações da conta.
        </p>
      </div>
      <ProfileForm />
    </div>
  );
}
