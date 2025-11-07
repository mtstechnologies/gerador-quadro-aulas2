import { mockProfessors, mockSchoolClasses, mockSubjects } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Building, School, Users, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type KpiCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  change?: number;
  changePeriod?: string;
  color: string;
};

function KpiCard({ title, value, icon, change, changePeriod, color }: KpiCardProps) {
  return (
    <Card className={cn('border-l-4', color)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}</div>
        {change && changePeriod && (
          <p className="flex items-center gap-1 text-xs text-green-600">
            <ArrowUp className="h-4 w-4" />+{change} {changePeriod}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  // Hardcoded, as there is no room management yet
  const roomCount = 22; 
  
  const kpis = [
    {
      title: 'Professores',
      value: mockProfessors.length,
      icon: <Users className="h-5 w-5 text-primary" />,
      change: 1,
      changePeriod: 'este mês',
      color: 'border-primary',
    },
    {
      title: 'Disciplinas',
      value: mockSubjects.length,
      icon: <Book className="h-5 w-5 text-green-500" />,
      color: 'border-green-500',
    },
    {
      title: 'Turmas',
      value: mockSchoolClasses.length,
      icon: <School className="h-5 w-5 text-gray-700" />,
      color: 'border-gray-700',
    },
    {
      title: 'Salas',
      value: roomCount,
      icon: <Building className="h-5 w-5 text-orange-500" />,
      color: 'border-orange-500',
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Visão geral do sistema
        </h1>
        <p className="text-muted-foreground">
          Acompanhe os principais indicadores da sua instituição.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>
    </div>
  );
}
