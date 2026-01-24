"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signUpDefaultValues } from "@/lib/constants";

export default function CredentialsSignUpForm(){
    return (
        <form>
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
                    <Label htmlFor="password">
                        Password
                    </Label>
                    <Input id="password" name="password" type="password" defaultValue={signUpDefaultValues.password} required/>
                </div>
                <div>
                    <Button className="w-full" type="submit">
                        Sign up
                    </Button>
                </div>
            </div>
        </form>
    )
}