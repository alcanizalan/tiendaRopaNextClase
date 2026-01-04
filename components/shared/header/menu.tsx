import React from "react";
import {ShoppingCart, UserIcon, EllipsisVertical } from "lucide-react"
import Link from "next/link";
import {Button} from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import {Sheet, SheetTrigger, SheetContent, SheetDescription, SheetTitle} from "@/components/ui/sheet";


export default function MenuHeader(){
    return(
        <div className="flex justify-end gap-3">
            <nav className="hidden md:flex max-w-xs gap-1">
            <ModeToggle />
            <Button asChild variant={"ghost"}>
                <Link href="/cart"><ShoppingCart />Cart</Link>
            </Button>
            <Button asChild variant={"ghost"}>
                <Link href="/cart"><UserIcon />Sign-In</Link>
            </Button>
            </nav>
            <nav className="md:hidden">
                <Sheet>
                    <SheetTrigger className="align-middle" asChild>
                        <EllipsisVertical/>
                    </SheetTrigger>
                    <SheetContent className="flex flex-col items-start p-4 max-w-xs">
                        <SheetTitle>Menu</SheetTitle>
                        <ModeToggle />
                        <Button asChild variant={"ghost"}>
                            <Link href="/cart"><ShoppingCart />Cart</Link>
                        </Button>
                        <Button asChild variant={"ghost"}>
                            <Link href="/cart"><UserIcon />Sign-In</Link>
                        </Button>
                        <SheetDescription />
                    </SheetContent>

                </Sheet>
            
            </nav>
        </div>
    )
}