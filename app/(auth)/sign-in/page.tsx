import React from 'react'
import {Metadata} from "next";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CredentialsSignInForm from '@/components/auth/credentials-sign-in-form';

export const metadata:Metadata = {
    title: "Sign-In"
}

export default function SignInPage() {
    return (
        <div>
            <Card>
                <CardHeader className="space-y-4">
                    <Link href={"/"} className='flex-center'>
                        <Image 
                        src="/images/logo.svg" 
                        alt={APP_NAME} 
                        width={70} 
                        height={70} />
                    </Link>
                    <CardTitle className='text-center'>Sign In</CardTitle>
                    <CardDescription className='text-center'>Sign in for a new account</CardDescription>
                </CardHeader>
                <CardContent>
                    <CredentialsSignInForm />
                </CardContent>
            </Card>
        </div>
    )
}