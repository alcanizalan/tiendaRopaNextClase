import React from "react";
import {auth} from "@/lib/auth";
import {headers} from "next/headers"
import UserTable from "@/components/admin/user-table";
import SignOutButton from "@/components/auth/sign-out-button";
import { getUsersTable } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminPage({searchParams}:{searchParams: Promise<{[key: string]: string | string[]}>}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    if(!session || session.user.role !== "admin"){
        return <div>NO AUTORIZADO</div>
    }
    const { page = 1, pageSize = 2 } = await searchParams;
    const {data, pageInfo} = await getUsersTable({ 
        page: Number(page), 
        pageSize: Number(pageSize) 
    });
    return (
        <div>
            Admin Page
            <UserTable
                users={data}
                currentPage={pageInfo.currentPage}
                totalPages={pageInfo.totalPages}
            />
            <SignOutButton />
            <Button className="mx-2"><Link href="/admin">Product Table</Link></Button>
        </div>
    )
}