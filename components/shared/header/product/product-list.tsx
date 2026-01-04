import React from "react";
import {Product} from "@/types/Product";
import ProductCard from "./product-card"

export default function ProductList({
    data,title,limit
}:{
    data: Product[];
    title?: string;
    limit?: number;
}){
    const limitedData = limit ? data.slice(0,limit) : data;
    return(
        <div>
            <h2 className="h2-bold mb-4">{title?(title):'Lista Productos'}</h2>
            {
                limitedData.length>0 ? 
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{
                    limitedData.map((p) => <ProductCard product={p} key={p.slug} />)
                }</div>
                :
                <div>
                    <p>No products found</p>
                </div>
            }
        </div>
    )
}