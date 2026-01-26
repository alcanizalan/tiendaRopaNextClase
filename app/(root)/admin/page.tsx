import React from "react";
import {auth} from "@/lib/auth";
import {headers} from "next/headers"
import SignOutButton from "@/components/auth/sign-out-button";

export default async function AdminPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    if(!session){
        return <div>NO AUTORIZADO</div>
    }
    return (
        <div>
            Admin Page
            <SignOutButton />
        </div>
    )
}