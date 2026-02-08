"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import {Product2} from "@/types/Product"

export async function getLatestProducts(){
    const { prisma } = await import("@/db/prisma");
    const data = await prisma.product.findMany({
        orderBy: {createdAt: "desc"}
    });
    return convertToPlainObject(data);
}

export async function getProductsTable({
        page = 1, pageSize = 2

    }:{
        page?: number;
        pageSize?: number;
    }
){
    const skip = (page -1)*pageSize;

    const [data, totalCount] = await Promise.all([
        prisma.product.findMany({
            skip,
            take: pageSize,
            orderBy: {createdAt: "desc"},
        }),
        prisma.product.count(),
    ]);
    const totalPages = Math.ceil(totalCount/pageSize);
    return {
        data: convertToPlainObject(data) as unknown as Product2[],
        pageInfo: {totalCount, totalPages, currentPage: page },
    };
}

export async function getProductBySlug(slug: string){
    const data = await prisma.product.findFirst({
        where: { slug },
    });

    return data ? convertToPlainObject(data) : null;
}