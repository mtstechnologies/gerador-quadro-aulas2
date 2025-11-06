"use client"

import { SchoolClass } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<SchoolClass>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "shift",
    header: "Turno",
    cell: ({ row }) => {
        const shift = row.getValue("shift") as string;
        const variant = shift === 'Manhã' ? 'default' : shift === 'Tarde' ? 'secondary' : 'outline';
        return <Badge variant={variant}>{shift}</Badge>
    }
  },
  {
    accessorKey: "capacity",
    header: "Capacidade",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const schoolClass = row.original

      return (
        <div className="text-right">
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(schoolClass.id)}
                >
                Copiar ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Editar Turma</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">Excluir Turma</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
      )
    },
  },
]
