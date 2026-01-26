"use client"
import React from "react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import {useRouter} from "next/navigation"

export default function SignOutButton() {
    const router = useRouter();
    return( 
        <Button onClick={() => 
            authClient.signOut({
                fetchOptions: {
                    onSuccess: () => router.push("/")
                }
            })
        }>
            Sign Out
        </Button>
    )
}