'use client';
import { Button } from '@/components/UI/button';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/UI/dropdown-menu';
import { useSession, signOut } from 'next-auth/react';
import { logout } from '@/api/api';

export function Slider() {
  const { data: session, status } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          {
            //@ts-ignore
            status !== 'authenticated' ? '...' : session.user?.username
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className=' hover:cursor-pointer'>
          <DropdownMenuItem disabled>Profile</DropdownMenuItem>
          <DropdownMenuItem disabled>Dashboard</DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={'/home/settings'} className='w-full h-full'>
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={'/home'} className='w-full h-full'>
              View Products
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem disabled>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className=' hover:cursor-pointer'
          onClick={() => {
            return [logout(), signOut()];
          }}
        >
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
