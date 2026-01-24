import React from "react";
import ProductList from "@/components/shared/header/product/product-list"
//import sampleData from '@/app/db/sample-data'
import { getLatestProducts } from "@/lib/actions/product.actions";
import { Product2 } from "@/types/Product";

export default async function Home() {
  const data = await getLatestProducts() as unknown as Product2[];
  return (
    <div>
      <ProductList data={data} title="Mi Lista" limit={4}/>
    </div>
  );
}
