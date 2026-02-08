"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import { User } from "better-auth";

export async function getUsersTable({
        page = 1, pageSize = 2

    }:{
        page?: number;
        pageSize?: number;
    }
){
    const skip = (page -1)*pageSize;

    const [data, totalCount] = await Promise.all([
        prisma.user.findMany({
            skip,
            take: pageSize,
            orderBy: {createdAt: "desc"},
        }),
        prisma.user.count(),
    ]);
    const totalPages = Math.ceil(totalCount/pageSize);
    return {
        data: convertToPlainObject(data) as unknown as User[],
        pageInfo: {totalCount, totalPages, currentPage: page },
    };
}