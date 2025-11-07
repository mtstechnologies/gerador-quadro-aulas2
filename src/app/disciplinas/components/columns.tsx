"use client"

import { Subject } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

export const columns: ColumnDef<Subject>[] = [
  {
    accessorKey: "code",
    header: "Código",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "workload",
    header: "Carga Horária (h/sem)",
  },
  {
    accessorKey: "requiresSpecialRoom",
    header: "Sala Especial",
    cell: ({ row }) => {
        const requires = row.getValue("requiresSpecialRoom")
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        {requires ? <CheckCircle2 className="text-green-500"/> : <XCircle className="text-red-500" />}
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{requires ? "Requer sala especial" : "Não requer sala especial"}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const subject = row.original

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
                onClick={() => navigator.clipboard.writeText(subject.id)}
                >
                Copiar ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/disciplinas/${subject.id}/editar`}>Editar Disciplina</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">Excluir Disciplina</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
      )
    },
  },
]
