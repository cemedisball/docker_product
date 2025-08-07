import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedProduct() { 
  await prisma.product.createMany({ 
    data: [ 
      { 
        name: "Notebook",   
        description: "A high-performance notebook for professionals.", 
        price: 999.99,
      }, 
      { 
        name: "Wireless Mouse", 
        description: "A sleek and ergonomic wireless mouse.",
        price: 49.99,
      }, 
    ], 
  }); 
}

async function main() { 
  await seedProduct(); 
  console.log(" Seeded data successfully!"); 
}

main() 
  .catch((e) => { 
    console.error(e); 
    process.exit(1); 
  }) 
  .finally(async () => { 
    await prisma.$disconnect(); 
  }); 