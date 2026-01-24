"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";

export async function getLatestProducts(){
    const { prisma } = await import("@/db/prisma");
    const data = await prisma.product.findMany({
        orderBy: {createdAt: "desc"}
    });
    return convertToPlainObject(data);
}

export async function getProductBySlug(slug: string){
    const data = await prisma.product.findFirst({
        where: { slug },
    });
    // Ensure plain object for Client Components (no Decimal/Date proxies or symbol properties)
    return data ? convertToPlainObject(data) : null;
}