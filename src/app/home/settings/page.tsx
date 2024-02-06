'use client';
import { Button } from '@/components/UI/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/UI/card';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/UI/tabs';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session, status } = useSession();

  return (
    <div>
      <div className='w-4/5 m-auto'>
        {/* <h3 className=' text-4xl'>Profile</h3> */}
        <Tabs defaultValue='account' className='max-w-3xl m-auto'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='account'>Account</TabsTrigger>
            <TabsTrigger value='password'>Password</TabsTrigger>
          </TabsList>
          <TabsContent value='account'>
            <Card>
              <CardHeader>
                <CardTitle>
                  {status !== 'authenticated' ? '...' : session.user?.email}
                </CardTitle>
                <CardDescription>
                  Make changes to your account here.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                <div className='space-y-1'>
                  <Label htmlFor='email'>Email</Label>
                  <Input id='email' defaultValue={`${session?.user?.email}`} />
                </div>
                <div className='space-y-1'>
                  <Label htmlFor='username'>Username</Label>
                  <Input
                    id='username'
                    //@ts-ignore
                    defaultValue={`${session?.user.username}`}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value='password'>
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password here.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                <div className='space-y-1'>
                  <Label htmlFor='current'>Current password</Label>
                  <Input id='current' type='password' />
                </div>
                <div className='space-y-1'>
                  <Label htmlFor='new'>New password</Label>
                  <Input id='new' type='password' />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
