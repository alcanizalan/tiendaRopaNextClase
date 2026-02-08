import React from 'react'
import { Product2 } from '@/types/Product'
import { Table, TableCaption, TableBody, TableCell, TableRow, TableHeader, TableHead} from '@/components/ui/table'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Pencil, Trash } from 'lucide-react'
import ProductTablePagination from './product-table-pagination'

export default function ProductTable({
    products, 
    currentPage=1, 
    totalPages=1, 
    pageSize=2
}: {
    products: Product2[],
    currentPage?: number,
    totalPages?: number,
    pageSize?: number,
}){
    return (
        <>
            <Table>
                <TableCaption>
                    List of Products
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.slug}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>
                                    <Button variant={'outline'} asChild>
                                        <Link href={`/admin/products/${product.id}`}>
                                            <Pencil />
                                        </Link>
                                    </Button>
                                    <Button variant={'outline'} className='text-destructive' asChild>
                                        <Link href={`/admin/products/${product.id}`}>
                                            <Trash />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <ProductTablePagination
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </>
    )
}