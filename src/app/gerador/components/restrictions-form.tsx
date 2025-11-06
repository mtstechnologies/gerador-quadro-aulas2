import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export function RestrictionsForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Configuração de Restrições</CardTitle>
        <CardDescription>
          Defina as regras e pesos que a IA usará para otimizar os horários.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
            <h3 className="font-semibold">Restrições Gerais</h3>
            <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                <Label htmlFor="consecutive-classes" className="flex flex-col space-y-1">
                    <span>Máximo de aulas consecutivas</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                        Limite o número de aulas seguidas para um professor.
                    </span>
                </Label>
                <Input id="consecutive-classes" type="number" defaultValue={3} className="w-20" />
            </div>
             <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                <Label htmlFor="avoid-windows" className="flex flex-col space-y-1">
                    <span>Priorizar minimização de janelas</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                        A IA tentará evitar horários vagos entre as aulas dos professores.
                    </span>
                </Label>
                <Switch id="avoid-windows" defaultChecked />
            </div>
        </div>
        <Separator/>
        <div className="space-y-4">
            <h3 className="font-semibold">Pesos de Otimização</h3>
             <div className="space-y-3">
                <Label>Penalidade por Janelas</Label>
                <Slider defaultValue={[80]} max={100} step={1} />
                <p className="text-sm text-muted-foreground">Peso: Alto</p>
             </div>
             <div className="space-y-3">
                <Label>Preferência de Turno do Professor</Label>
                <Slider defaultValue={[60]} max={100} step={1} />
                <p className="text-sm text-muted-foreground">Peso: Médio</p>
             </div>
              <div className="space-y-3">
                <Label>Distribuição Balanceada de Disciplinas</Label>
                <Slider defaultValue={[70]} max={100} step={1} />
                 <p className="text-sm text-muted-foreground">Peso: Médio</p>
             </div>
        </div>

        <div className="flex justify-end pt-4">
            <Button>Salvar Configurações</Button>
        </div>
      </CardContent>
    </Card>
  );
}
