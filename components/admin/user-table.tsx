import React from 'react'
import { Table, TableCaption, TableBody, TableCell, TableRow, TableHeader, TableHead} from '@/components/ui/table'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Pencil, Trash } from 'lucide-react'
import UserTablePagination from './user-table-pagination'
import { User } from 'better-auth';

export default function UserTable({
    users, 
    currentPage=1, 
    totalPages=1, 
    pageSize=2
}: {
    users: (User & { phone?: string; role?: string; comms?: string })[],
    currentPage?: number,
    totalPages?: number,
    pageSize?: number,
}){
    return (
        <>
            <Table>
                <TableCaption>
                    List of Users
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Updated At</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Comms</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.createdAt.toLocaleString()}</TableCell>
                                <TableCell>{user.updatedAt.toLocaleString()}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.comms}</TableCell>
                                <TableCell>
                                    <Button variant={'outline'} asChild>
                                        <Link href={`/admin/users/${user.id}`}>
                                            <Pencil />
                                        </Link>
                                    </Button>
                                    <Button variant={'outline'} className='text-destructive' asChild>
                                        <Link href={`/admin/users/${user.id}`}>
                                            <Trash />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <UserTablePagination
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </>
    )
}