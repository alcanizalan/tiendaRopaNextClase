"use client";
import React from "react";
import { Label } from "../ui/label";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signUpDefaultValues } from "@/lib/constants";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner"

export default function CredentialsSignUpForm(){
    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>){
        evt.preventDefault();
        const formData = new FormData(evt.currentTarget);
        const name = String(formData.get("name"));
        const email = String(formData.get("email"));
        const password = String(formData.get("password"));
        const confirmPassword = String(formData.get("confirmPassword"));
        const phone = String(formData.get("phone"));
        const comms = String(formData.get("comms"));
        if(!name || !password || !confirmPassword || !email){
            toast.error("Completa nombre, email y contraseña");
            return;
        }
        if (password !== confirmPassword){
            toast.error("Las contraseñas no coinciden");
            return;
        }
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
                    console.log(ctx.error.message) },
                onSuccess: () => { 
                    toast.success("Registro Correcto")
                    console.log("Registro Correcto"); },
            }
        );
    }

    const [isFormValid, setIsFormValid] = useState(false);

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6">
                <div>
                    <Label htmlFor="name">
                        Name
                    </Label>
                    <Input id="name" name="name" type="text" defaultValue={signUpDefaultValues.name} required/>
                </div>
                <div>
                    <Label htmlFor="email">
                        Email
                    </Label>
                    <Input id="email" name="email" type="email" defaultValue={signUpDefaultValues.email} required/>
                </div>
                <div>
                    <Label htmlFor="phone">
                        Phone <span className="text-muted-foreground">(Optional)</span>
                    </Label>
                    <Input id="phone" name="phone" type="tel" defaultValue={signUpDefaultValues.phone}/>
                </div>
                <div>
                    <Label htmlFor="password">
                        Password
                    </Label>
                    <Input id="password" name="password" type="password" defaultValue={signUpDefaultValues.password} required/>
                </div>
                <div>
                    <Label htmlFor="confirmPassword">
                        Confirm Password
                    </Label>
                    <Input id="confirmPassword" name="confirmPassword" type="password" defaultValue={signUpDefaultValues.password} required/>
                </div>
                <div className="flex justify-start items-center">
                    <Input className="h-4 w-4 mr-2" id="terms" name="terms" type="checkbox" onClick={() => setIsFormValid(!isFormValid)} required />
                    <Label htmlFor="terms">
                        I agree to the terms and conditions
                    </Label>
                </div>
                <div>
                    <Label htmlFor="notification-preference">
                        How do you want to receive notifications?
                    </Label>
                    <div className="flex gap-4 mt-2 justify-start">
                        <Input className="h-4 w-4" type="radio" id="comms-email" name="comms" value="email" defaultChecked />
                        <Label htmlFor="comms-email">
                            Email
                        </Label>
                        <Input className="h-4 w-4" type="radio" id="comms-sms" name="comms" value="sms" />
                        <Label htmlFor="comms-sms">
                            SMS
                        </Label>
                    </div>
                </div>
                <div>
                    <Button className="w-full" type="submit" disabled={!isFormValid}>
                        Sign up
                    </Button>
                </div>
            </div>
        </form>
    )
}