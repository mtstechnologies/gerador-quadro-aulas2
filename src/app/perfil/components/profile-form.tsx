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
import { Save, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const formSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  email: z.string().email('Forneça um email válido.'),
});

type ProfileFormValues = z.infer<typeof formSchema>;

export function ProfileForm() {
  const { toast } = useToast();
  const avatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'Coordenador',
      email: 'coordenador@escola.com',
    },
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    toast({
      title: 'Perfil Atualizado!',
      description: `Suas informações foram salvas com sucesso.`,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Dados Pessoais</CardTitle>
        <CardDescription>
          Gerencie suas informações de perfil.
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
                    <Input placeholder="Seu nome completo" {...field} />
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
                    <Input type="email" placeholder="Seu email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Foto de Perfil</FormLabel>
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                    {avatar && <AvatarImage src={avatar.imageUrl} alt="Avatar do usuário" />}
                    <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                    <FormDescription>
                        Para alterar sua foto, envie uma nova imagem.
                    </FormDescription>
                    <Input type="file" className="max-w-xs" />
                </div>
              </div>
            </FormItem>

            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
