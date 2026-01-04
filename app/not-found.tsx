import React from "react";
import Image from "next/image";
import Link from "next/link";
import {APP_NAME } from "@/lib/constants";
import {Button} from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <Image src={"/images/logo.svg"} alt={`Logo de ${APP_NAME}`} width={48} height={48}/>
        <div className="p-6 rounded-lg shadow-md text-center">
            <h1 className="text-3xl font-bold mb-4">Not found</h1>
            <p className="text-destructive">Could not find the requested page</p>
            <Link href="/">
                <Button variant={"outline"} 
                className="mt-4 ml-2"
                >
                    Go back
                </Button>
            </Link>
        </div>
    </div>
  );
}