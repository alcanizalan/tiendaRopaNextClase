'use client';
import React, {useState, useEffect} from "react";
import {useTheme} from "next-themes";
import {SunIcon, MoonIcon, SunMoon} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function ModeToggle(){
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);
    
    const themes = ["system", "light", "dark", "doom"];
    const [position, setPosition] = useState(0)

    useEffect(() => setMounted(true), []);

    const handleClick = () => {
        setPosition(prev =>  prev >= themes.length-1 ? 0 : prev+1);
    };

    useEffect(() => {
        setTheme(themes[position]);
    }, [position])

    if (!mounted) return null;
    return(
        <Button onClick={() => handleClick()} variant={"ghost"} className="focus-visible:ring-0 focus-visible:ring-offset-0">
            {theme === "system" ? (<SunMoon/>) : 
            theme === "light" ? (<SunIcon/>) : 
            theme === "doom" ? (<span>💀</span>) : 
            theme === "dark" ? (<MoonIcon/>) : 
            (<MoonIcon/>)}
        </Button>
    )
}