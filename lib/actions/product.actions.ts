"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import {Product2} from "@/types/Product"
import { Product } from "../generated/prisma/client";
import { insertProductSchema } from "../validators";

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

export async function actionPrueba(formData:FormData){
    const rawFormData = {
        name: formData.get("name"),
        slug: formData.get("slug"),
    }
    console.log(rawFormData)
}

/*
export type ProductFormState = {
    success: boolean;
    error: {
        name?: string[];
        slug?: string[];
        price?: string[];
        category?: string[];
        brand?: string[];
        description?: string[];
        stock?: string[];
        images?: string[];
        numReviews?: string[];
        isFeatored?: string[];
        banner?: string[];
        additional?: string[];
    };
    message: string[];
    data?: Partial<Product>;
};
*/

export type ProductFormState = {
    success: boolean,
    errors?: {[K in keyof Product]?:string[]} & {additional?: string[]},
    message: string[],
    data?: Partial<Product> | unknown,
}

export async function createActionProduct(
    prevState: ProductFormState,
    formData: FormData,
): Promise<ProductFormState>{
    const rawData = Object.fromEntries(formData.entries())
    const submittedData = {
        ...rawData,
        isFeatured: rawData.isfeatured === "on",
        stock: Number(rawData.stock),
        numReviews: Number(rawData.numReviews),
        //price: rawData.price?.toString() || "0",
        price: "22.03",
        images: ["/images/imagen.jpg"]
    };
    const validatedData = insertProductSchema.safeParse(submittedData);
    if(!validatedData.success){
        const flatened = validatedData.error.flatten((issue)=> issue.message);
        return {
            success: false,
            errors: flatened.fieldErrors,
            message: ["Error de validación de los datos"],
            data: submittedData as unknown as Partial<Product>
        };
    };
    try{
        const result = await prisma.product.create({
            data: validatedData.data
        })
        /*if(!result){
            return{
                success: false,
                message: "Product not created",
                errors: {additional: ["Product not created"]},
                data: validatedData.data as unknown as Partial<Product>,
            }
        }*/
        if (!result) throw new Error ("Problemas con la base de datos");
        return{
            success: true,
            message: ["Product added successfully"],
            errors: {},
            data: validatedData.data as unknown as Partial<Product>,
        }

    }catch(error){
        return {
            success: false,
            message: ["Error al crear el producto"],
            errors: {additional: [error instanceof Error ? error.message : "Error desconocido"]},
            data: validatedData.data as unknown as Partial<Product>,
        }
    }
}

