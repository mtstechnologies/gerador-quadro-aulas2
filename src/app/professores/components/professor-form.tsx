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
import { mockSubjects } from '@/lib/mock-data';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  email: z.string().email('Forneça um email válido.'),
  subjectIds: z.array(z.string()).min(1, 'Selecione pelo menos uma disciplina.'),
});

type ProfessorFormValues = z.infer<typeof formSchema>;

export function ProfessorForm() {
  const { toast } = useToast();
  const form = useForm<ProfessorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subjectIds: [],
    },
  });

  function onSubmit(data: ProfessorFormValues) {
    console.log(data);
    toast({
      title: 'Professor Cadastrado!',
      description: `O professor ${data.name} foi adicionado com sucesso.`,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Dados do Professor</CardTitle>
        <CardDescription>
          Forneça as informações básicas e as disciplinas que o professor leciona.
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
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: João da Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: joao.silva@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subjectIds"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Disciplinas</FormLabel>
                    <FormDescription>
                      Selecione as disciplinas que este professor pode lecionar.
                    </FormDescription>
                  </div>
                  <div className="space-y-2">
                    {mockSubjects.map((subject) => (
                      <FormField
                        key={subject.id}
                        control={form.control}
                        name="subjectIds"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={subject.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(subject.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, subject.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== subject.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {subject.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Salvar Professor
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
