"use client"
import React from "react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
    return( 
        <Button onClick={() => authClient.signOut()}>
            Sign Out
        </Button>
    )
}