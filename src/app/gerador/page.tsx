import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenerationForm } from "./components/generation-form";
import { RestrictionsForm } from "./components/restrictions-form";

export default function GeradorPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Gerador de Horários com IA
        </h1>
        <p className="text-muted-foreground">
          Configure as restrições e gere horários otimizados automaticamente.
        </p>
      </div>
      
      <Tabs defaultValue="generate">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="generate">Gerar Horário</TabsTrigger>
          <TabsTrigger value="restrictions">Configurar Restrições</TabsTrigger>
        </TabsList>
        <TabsContent value="generate">
          <GenerationForm />
        </TabsContent>
        <TabsContent value="restrictions">
          <RestrictionsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
