import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScheduleGrid } from "./components/schedule-grid";
import { mockSchedule, mockSchoolClasses } from "@/lib/mock-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, SlidersHorizontal } from "lucide-react";

export default function HorarioPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Grade Horária
          </h1>
          <p className="text-muted-foreground">
            Visualize, filtre e ajuste os horários da instituição.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filtros
            </Button>
             <Button>
                <Download className="mr-2 h-4 w-4" />
                Exportar PDF
            </Button>
        </div>
      </div>
      
      <Tabs defaultValue="class">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="class">Turma</TabsTrigger>
          <TabsTrigger value="professor">Professor</TabsTrigger>
          <TabsTrigger value="room">Sala</TabsTrigger>
        </TabsList>
        <TabsContent value="class" className="space-y-4">
          <div className="max-w-xs">
            <Select defaultValue={mockSchoolClasses[0].id}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma turma" />
              </SelectTrigger>
              <SelectContent>
                {mockSchoolClasses.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <ScheduleGrid schedule={mockSchedule} />
        </TabsContent>
        <TabsContent value="professor">
           <ScheduleGrid schedule={mockSchedule} />
        </TabsContent>
         <TabsContent value="room">
           <ScheduleGrid schedule={mockSchedule} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
