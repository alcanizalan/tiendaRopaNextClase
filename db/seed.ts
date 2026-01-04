import "dotenv/config";
import { PrismaClient} from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import sampleData from "./sample-data";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

async function main(){
    const prisma = new PrismaClient({adapter});
    try{
        // createMany with skipDuplicates prevents crashing on existing slugs
        const res = await prisma.product.createMany({data: sampleData.products, skipDuplicates: true});
        console.log(`Productos introducidos: ${res.count}`);
    }catch(err){
        console.error('Seed error:', err);
        throw err;
    }finally{
        await prisma.$disconnect();
    }
}

main().catch((e)=>{
    console.error(e);
    process.exit(1);
});