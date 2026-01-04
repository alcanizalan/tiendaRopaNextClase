"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Product } from "@/lib/generated/prisma/client";

type Props = { product: Product };

export default function ProductImages({ product }: Props){
    const initial = product && product.images && product.images.length > 0 ? product.images[0] : '/images/sample-products/p1-1.jpg';
    const [imgUsed, setImgUsed] = useState<string>(initial);
    if (!product) return <div>No product found</div>;

    return(
        <>
            <div className='mb-4'>
                <Image
                    src={imgUsed}
                    alt={product.name ?? 'product image'}
                    width={1000}
                    height={1000}
                    className='w-full max-h-[500px] object-cover object-center'
                />
            </div>
            <div className='grid grid-cols-3 gap-2'>
                {product.images?.map((image, idx) => (
                    <div key={idx} className='w-full h-32 relative cursor-pointer' onClick={() => setImgUsed(image)}>
                        <Image
                            src={image}
                            alt={`${product.name} image ${idx + 1}`}
                            fill
                            sizes='(min-width: 768px) 33vw, 100vw'
                            className='object-cover'
                        />
                    </div>
                ))}
            </div>
        </>
    )
}