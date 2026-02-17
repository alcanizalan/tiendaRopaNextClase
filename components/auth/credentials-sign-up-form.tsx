"use client";
import React from "react";
import { Label } from "../ui/label";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signUpDefaultValues } from "@/lib/constants";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CredentialsSignUpForm(){
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    
    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>){
        evt.preventDefault();
        const formData = new FormData(evt.currentTarget);
        const name = String(formData.get("name"));
        const email = String(formData.get("email"));
        const password = String(formData.get("password"));
        const confirmPassword = String(formData.get("confirmPassword"));
        const phone = String(formData.get("phone"));
        const comms = String(formData.get("comms"));
        const terms = (evt.currentTarget.elements.namedItem("terms") as HTMLInputElement).checked;
        if(!name || !password || !confirmPassword || !email){
            toast.error("Completa nombre, email y contraseña");
            setStateError("Completa nombre, email y contraseña");
            return;
        }
        if (comms === "sms" && !phone) {
            toast.error("Completa el número de teléfono");
            setStateError("Completa el número de teléfono");
            return;
        }
        if (password !== confirmPassword){
            toast.error("Las contraseñas no coinciden");
            setStateError("Las contraseñas no coinciden");
            return;
        }
        if (!terms) {
            toast.error("Debes aceptar los términos y condiciones");
            setStateError("Debes aceptar los términos y condiciones");
            return;
        }
        
        setIsPending(true);
        
        await authClient.signUp.email(
            {
                name,
                email,
                password,
                phone,
                comms,
            },
            {
                onRequest: () => {},
                onResponse: () => {},
                onError: (ctx) => { 
                    toast.error(ctx.error.message);
                    console.log(ctx.error.message);
                    setIsPending(false);
                },
                onSuccess: () => { 
                    toast.success("Registro Correcto")
                    console.log("Registro Correcto");
                    setStateError("NO_ERRORS");
                    router.push("/profile");
                },
            }
        );
    }

    const [isFormValid, setIsFormValid] = useState(false);
    const [commsSelected, setCommsSelected] = useState("mail");
    const [stateError, setStateError] = useState("NO_ERRORS");

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6">
                <div>
                    <Label htmlFor="name">
                        Name
                    </Label>
                    <Input id="name" name="name" type="text" defaultValue={signUpDefaultValues.name}/>
                </div>
                <div>
                    <Label htmlFor="email">
                        Email
                    </Label>
                    <Input id="email" name="email" type="email" defaultValue={signUpDefaultValues.email}/>
                </div>
                <div>
                    <Label htmlFor="phone">
                        Phone <span className={`text-muted-foreground ${commsSelected === "mail" ? '' : 'hidden'}`}> (Optional)</span>
                    </Label>
                    <Input id="phone" name="phone" type="tel" defaultValue={signUpDefaultValues.phone}/>
                </div>
                <div>
                    <Label htmlFor="password">
                        Password
                    </Label>
                    <Input id="password" name="password" type="password" defaultValue={signUpDefaultValues.password}/>
                </div>
                <div>
                    <Label htmlFor="confirmPassword">
                        Confirm Password
                    </Label>
                    <Input id="confirmPassword" name="confirmPassword" type="password" defaultValue={signUpDefaultValues.password}/>
                </div>
                <div className="flex justify-start items-center border-1 p-3 rounded-md">
                    <Input className="h-4 w-4 mr-2" id="terms" name="terms" type="checkbox" onClick={() => setIsFormValid(!isFormValid)}/>
                    <Label htmlFor="terms">
                        I agree to the terms and conditions
                    </Label>
                </div>
                <div>
                    <Label htmlFor="notification-preference">
                        How do you want to receive notifications?
                    </Label>
                    <div className="flex gap-4 mt-2 justify-start">
                        <Input className="h-4 w-4" type="radio" id="comms-email" name="comms" value="mail" defaultChecked onChange={() => setCommsSelected("mail")} />
                        <Label htmlFor="comms-email">
                            Email
                        </Label>
                        <Input className="h-4 w-4" type="radio" id="comms-sms" name="comms" value="sms" onChange={() => setCommsSelected("sms")} />
                        <Label htmlFor="comms-sms">
                            SMS
                        </Label>
                    </div>
                </div>
                <div>
                    <Button className="w-full" type="submit" disabled={isPending}>
                        {isPending ? "Registrando..." : "Sign up"}
                    </Button>
                    <div className={stateError === "NO_ERRORS" ? "hidden" : ""}>
                        <p className="mt-2 text-sm text-red-500">{stateError}</p>
                    </div>
                    <p className="mt-4 text-center text-muted-foreground text-sm">
                        Already have an account? <Link href="/sign-in" className="underline">Sign in</Link>
                    </p>
                    
                </div>
            </div>
        </form>
    )
}

// Nombre ✅
// Email ✅
// Teléfono (Opcional y no opcional) ✅
// Contraseña ✅
// Confirmar Contraseña ✅
// Condiciones 
// Errores
// Sign in ✅
