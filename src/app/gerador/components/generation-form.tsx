'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateSchedule, type GenerateScheduleOutput } from '@/ai/flows/automatic-schedule-generation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  numClasses: z.coerce.number().min(1, 'Pelo menos uma turma é necessária.'),
  restrictions: z.string().min(10, 'Descreva as restrições com mais detalhes.'),
});

export function GenerationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateScheduleOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numClasses: 50,
      restrictions: 'Considerar todas as restrições de professores, salas e disciplinas. Minimizar janelas dos professores e distribuir as aulas de forma equilibrada durante a semana.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await generateSchedule(values);
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erro ao gerar horário',
        description: 'Ocorreu um problema ao se comunicar com a IA. Tente novamente.',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Parâmetros de Geração</CardTitle>
          <CardDescription>Defina os parâmetros para a geração automática dos horários.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="numClasses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Turmas</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="restrictions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Restrições e Preferências</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descreva as restrições..." {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Gerar Horários
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed bg-card p-8 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h3 className="font-headline text-xl font-semibold">Gerando horários...</h3>
            <p className="text-muted-foreground">A IA está trabalhando para otimizar as opções. Isso pode levar alguns minutos.</p>
        </div>
      )}

      {result && (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="font-headline text-2xl font-bold">Opções de Horário Geradas</h2>
                <p className="text-muted-foreground">
                    Geração concluída em {result.generationTime}. Selecione a melhor opção.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {result.scheduleOptions.map((option, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle className="font-headline">Opção {index + 1}</CardTitle>
                        <CardDescription>Métricas de qualidade:</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <pre className="whitespace-pre-wrap rounded-md bg-muted p-4 text-sm text-muted-foreground">
                            {option.qualityMetrics}
                        </pre>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Ver Horário Detalhado</Button>
                    </CardFooter>
                </Card>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
