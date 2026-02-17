"use client"
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { cn } from '@/lib/utils';
import { createActionProduct, ProductFormState } from '@/lib/actions/product.actions';
import { useActionState } from 'react';
import { Product2 } from '@/types/Product';
import { toast } from "sonner";

export default function ProductForm({type, product, productId}:{
    type: 'create' | 'edit';
    product?: Product2;
    productId?: string;
}){
    const router = useRouter();
    const initState: ProductFormState = {
        success: false,
        message: "",
        errors: {},
        data: undefined,
    };
    const [state, formAction] = useActionState(createActionProduct, initState);
    useEffect(() => {
        if (state.success){
            toast.success("Producto insertado con éxito");
            router.push("/admin");
        }
    }, [state, router])

    return (
        <Card>
            <CardHeader className='border-b border-foreground/20'>
                <CardTitle className="flex items-center justify-between">
                    Create Form
                    <Button type='button' onClick={() => router.back()}>Go Back</Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction} className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>Name</Label>
                    <Input 
                    type='text' 
                    name="name" 
                    className='col-span-2' 
                    defaultValue={state.data && typeof state.data === 'object' && 'name' in state.data ? String(state.data.name) : ""}
                     />
                </div>
                {state.errors?.name && (
                    <div className='text-red-500'>{state.errors.name.join(",")}</div>
                )}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>Slug</Label>
                    <Input 
                    type='text' 
                    name="slug" 
                    className='col-span-2' 
                    defaultValue={state.data && typeof state.data === 'object' && 'slug' in state.data ? String(state.data.slug) : ""} />
                </div>
                {state.errors?.slug && (
                    <div className='text-red-500'>{state.errors.slug.join(",")}</div>
                )}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>Brand</Label>
                    <Input 
                    type='text' 
                    name="brand" 
                    className='col-span-2' 
                    defaultValue={state.data && typeof state.data === 'object' && 'brand' in state.data ? String(state.data.brand) : ""} />
                </div>
                {state.errors?.brand && (
                    <div className='text-red-500'>{state.errors.brand.join(",")}</div>
                )}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>Banner</Label>
                    <Input 
                    type='text' 
                    name="banner" 
                    className='col-span-2' 
                    defaultValue={state.data && typeof state.data === 'object' && 'banner' in state.data ? String(state.data.banner) : ""} />
                </div>
                {state.errors?.banner && (
                    <div className='text-red-500'>{state.errors.banner.join(",")}</div>
                )}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>Category</Label>
                    <Input 
                    type='text' 
                    name="category" 
                    className='col-span-2' 
                    defaultValue={state.data && typeof state.data === 'object' && 'category' in state.data ? String(state.data.category) : ""} />
                </div>
                {state.errors?.category && (
                    <div className='text-red-500'>{state.errors.category.join(",")}</div>
                )}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>Description</Label>
                    <Textarea 
                    name="description" 
                    className='col-span-2' 
                    defaultValue={state.data && typeof state.data === 'object' && 'description' in state.data ? String(state.data.description) : ""} />
                </div>
                {state.errors?.description && (
                    <div className='text-red-500'>{state.errors.description.join(",")}</div>
                )}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>Stock</Label>
                    <Input 
                    type='number' 
                    name="stock" 
                    className='col-span-2' 
                    defaultValue={state.data && typeof state.data === 'object' && 'stock' in state.data ? String(state.data.stock) : ""} />
                </div>
                {state.errors?.stock && (
                    <div className='text-red-500'>{state.errors.stock.join(",")}</div>
                )}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>NumReviews</Label>
                    <Input 
                    type='number' 
                    name="numReviews" 
                    className='col-span-2' 
                    defaultValue={state.data && typeof state.data === 'object' && 'numReviews' in state.data ? String(state.data.numReviews) : ""}
                    step={0.1}
                    min={0}
                    max={5} />
                </div>
                {state.errors?.numReviews && (
                    <div className='text-red-500'>{state.errors.numReviews.join(",")}</div>
                )}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>Price</Label>
                    <Input 
                    type='number' 
                    name="price" 
                    className='col-span-2' 
                    defaultValue={state.data && typeof state.data === 'object' && 'price' in state.data ? String(state.data.price) : ""} 
                    step={0.01}
                    />
                </div>
                {state.errors?.price && (
                    <div className='text-red-500'>{state.errors.price.join(",")}</div>
                )}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Label>isFeatured</Label>
                    <Checkbox 
                    name="isFeatured" 
                    className='col-span-2' 
                    defaultChecked={state.data && typeof state.data === 'object' && 'isFeatured' in state.data ? Boolean(state.data.isFeatured) : false} />
                </div>
                {state.errors?.isFeatured && (
                    <div className='text-red-500'>{state.errors.isFeatured.join(",")}</div>
                )}
                <Button type='submit' className={cn("w-full text-2xl")}>Create Product</Button>
            </form>
            </CardContent>
        </Card>
    )
}