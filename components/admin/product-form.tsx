"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { cn } from '@/lib/utils';
import { actionPrueba } from '@/lib/actions/product.actions';

export default function ProductForm(){
    const router = useRouter();

    return (
        <Card>
            <CardHeader className='border-b border-foreground/20'>
                <CardTitle className="flex items-center justify-between">
                    Create Form
                    <Button type='button' onClick={() => router.back()}></Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form action={actionPrueba} className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>Name</Label>
                    <Input type='text' name="name" className='col-span-2' defaultValue={"Nombre producto"} />
                    {/* Meter mensaje de error de name */}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>Slug</Label>
                    <Input type='text' name="slug" className='col-span-2' defaultValue={"Slug"} />
                    {/* Meter mensaje de error de slug */}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>Brand</Label>
                    <Input type='text' name="brand" className='col-span-2' defaultValue={"Marca"} />
                    {/* Meter mensaje de error de brand */}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>Banner</Label>
                    <Input type='text' name="banner" className='col-span-2' defaultValue={"Banner"} />
                    {/* Meter mensaje de error de banner */}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>Category</Label>
                    <Input type='text' name="category" className='col-span-2' defaultValue={"Categoria"} />
                    {/* Meter mensaje de error de category */}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>Description</Label>
                    <Textarea name="description" className='col-span-2' defaultValue={"Descripción"} />
                    {/* Meter mensaje de error de description */}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>Stock</Label>
                    <Input type='number' name="stock" className='col-span-2' defaultValue={10} />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>NumReviews</Label>
                    <Input type='number' name="numReviews" className='col-span-2' defaultValue={0} />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>Price</Label>
                    <Input type='number' name="price" className='col-span-2' defaultValue={22.3} />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>isFeatured</Label>
                    <Checkbox name="isFeatured" className='col-span-2'/>
                </div>
                <Button type='submit' className={cn("w-full text-2xl")}>Create Product</Button>
            </form>
            </CardContent>
        </Card>
    )
}