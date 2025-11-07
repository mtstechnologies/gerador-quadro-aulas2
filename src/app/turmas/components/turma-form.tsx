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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { SchoolClass } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  shift: z.enum(['Manhã', 'Tarde', 'Noite'], {
    required_error: 'Selecione um turno.',
  }),
  capacity: z.coerce.number().min(1, 'A capacidade deve ser de pelo menos 1 aluno.'),
});

type TurmaFormValues = z.infer<typeof formSchema>;

interface TurmaFormProps {
  schoolClass?: SchoolClass;
}

export function TurmaForm({ schoolClass }: TurmaFormProps) {
  const { toast } = useToast();
  const isEditing = !!schoolClass;

  const form = useForm<TurmaFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: schoolClass || {
      name: '',
      shift: 'Manhã',
      capacity: 30,
    },
  });

  function onSubmit(data: TurmaFormValues) {
    console.log(data);
    toast({
      title: isEditing ? 'Turma Atualizada!' : 'Turma Cadastrada!',
      description: `A turma ${data.name} foi ${isEditing ? 'atualizada' : 'adicionada'} com sucesso.`,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Dados da Turma</CardTitle>
        <CardDescription>
          Forneça as informações da turma.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Turma</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 9º Ano C" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shift"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Turno</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Manhã" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Manhã
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Tarde" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Tarde
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Noite" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Noite
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacidade</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex: 35" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {isEditing ? 'Salvar Alterações' : 'Salvar Turma'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
