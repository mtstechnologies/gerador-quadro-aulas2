'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LogOut, Settings, User } from 'lucide-react';
import { useSidebar } from '../ui/sidebar';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Header() {
  const { state } = useSidebar();
  const avatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

  return (
    <div
      className={cn(
        "flex h-16 w-full items-center justify-between border-t p-2",
        state === 'collapsed' && 'justify-center'
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative flex h-10 w-full items-center justify-center gap-2 rounded-md hover:bg-sidebar-accent">
            <Avatar className="h-8 w-8">
              {avatar && <AvatarImage src={avatar.imageUrl} alt="Avatar do usuário" />}
              <AvatarFallback>CP</AvatarFallback>
            </Avatar>
            <div className={cn("shrink-0 truncate", state === 'collapsed' && 'hidden')}>
              <p className="text-sm font-medium leading-none text-sidebar-foreground">Coordenador</p>
              <p className="text-xs leading-none text-sidebar-foreground/70">
                coordenador@escola.com
              </p>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" side="top" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Coordenador</p>
              <p className="text-xs leading-none text-muted-foreground">
                coordenador@escola.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/perfil">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configurações</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
