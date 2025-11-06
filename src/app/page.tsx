import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Calendar, Cpu, School, Users } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'Gerenciar Professores',
    description: 'Adicione, edite e organize os dados dos professores.',
    href: '/professores',
    icon: <Users className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Gerenciar Disciplinas',
    description: 'Defina as disciplinas, cargas horárias e requisitos.',
    href: '/disciplinas',
    icon: <Book className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Gerenciar Turmas',
    description: 'Crie e configure as turmas para o ano letivo.',
    href: '/turmas',
    icon: <School className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Gerador de Horários',
    description: 'Use a IA para gerar horários otimizados automaticamente.',
    href: '/gerador',
    icon: <Cpu className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Visualizar Horário',
    description: 'Consulte e ajuste a grade horária completa.',
    href: '/horario',
    icon: <Calendar className="h-8 w-8 text-primary" />,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Bem-vindo ao SchoolTime Optimizer</h1>
        <p className="text-muted-foreground">Sua solução completa para otimização de horários escolares.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.href} className="flex flex-col transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              {feature.icon}
              <div className="grid gap-1">
                <CardTitle className="font-headline">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button asChild className="w-full">
                <Link href={feature.href}>Acessar</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
