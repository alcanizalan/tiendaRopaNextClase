"use client"

import React from "react"
import { 
    Dialog, 
    DialogClose, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTrigger, 
    DialogTitle, 
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "../ui/button" 
import { Trash } from "lucide-react"
import { toast } from "sonner"
import { deleteProduct } from "@/lib/actions/product.actions"

export default function ProductDeleteButton({id}:{id: string}){
    const handleDelete = async () => {
        const result = await deleteProduct(id);
    }
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="text-destructive">
                    <Trash />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        ¿Seguro que quieres borrar?
                        <DialogDescription className="py-2">
                            Eta acción borrará el producto de forma permanente e irrecuperable!
                        </DialogDescription>
                    </DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleDelete} className="" variant={"destructive"}>Continue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}