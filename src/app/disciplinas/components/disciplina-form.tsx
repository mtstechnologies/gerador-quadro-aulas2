'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const formSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  code: z.string().min(3, 'O código deve ter pelo menos 3 caracteres.'),
  workload: z.coerce.number().min(1, 'A carga horária deve ser de pelo menos 1 hora.'),
  requiresSpecialRoom: z.boolean().default(false),
});

type DisciplinaFormValues = z.infer<typeof formSchema>;

export function DisciplinaForm() {
  const { toast } = useToast();
  const form = useForm<DisciplinaFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      code: '',
      workload: 4,
      requiresSpecialRoom: false,
    },
  });

  function onSubmit(data: DisciplinaFormValues) {
    console.log(data);
    toast({
      title: 'Disciplina Cadastrada!',
      description: `A disciplina ${data.name} foi adicionada com sucesso.`,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Dados da Disciplina</CardTitle>
        <CardDescription>
          Forneça as informações da disciplina.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nome da Disciplina</FormLabel>
                    <FormControl>
                        <Input placeholder="Ex: Matemática Avançada" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Código</FormLabel>
                    <FormControl>
                        <Input placeholder="Ex: MAT123" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="workload"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carga Horária (horas/semana)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex: 5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requiresSpecialRoom"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Requer Sala Especial?
                    </FormLabel>
                    <FormDescription>
                      Marque se esta disciplina necessita de um laboratório ou sala com equipamentos especiais.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Salvar Disciplina
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
