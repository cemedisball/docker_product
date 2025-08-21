import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedCategory() {
  await prisma.category.createMany({  
    data: [
      { name: "Toy" },
      { name: "Computer" },
      { name: "Food" },
    ],
    skipDuplicates: true,
  });
}

async function seedProduct() {
  // หา categoryId แต่ละประเภท
  const toy = await prisma.category.findUnique({ where: { name: "Toy" } });
  const computer = await prisma.category.findUnique({ where: { name: "Computer" } });
  const food = await prisma.category.findUnique({ where: { name: "Food" } });

  // เช็คว่าหาเจอไหมก่อนจะใช้
  if (!toy || !computer || !food) {
    throw new Error("Category not found");
  }

  // สร้างสินค้า 5 ชนิดต่อ category
  const products = [
    // Toy 5 ชนิด
    { name: "Lego Set", description: "Creative building blocks", price: 49.99, categoryId: toy.id },
    { name: "Action Figure", description: "Superhero collectible", price: 19.99, categoryId: toy.id },
    { name: "Puzzle", description: "1000-piece jigsaw puzzle", price: 14.99, categoryId: toy.id },
    { name: "Toy Car", description: "Remote controlled car", price: 29.99, categoryId: toy.id },
    { name: "Doll House", description: "Miniature doll house", price: 59.99, categoryId: toy.id },

    // Computer 5 ชนิด
    { name: "Notebook", description: "High-performance notebook", price: 999.99, categoryId: computer.id },
    { name: "Wireless Mouse", description: "Ergonomic mouse", price: 49.99, categoryId: computer.id },
    { name: "Mechanical Keyboard", description: "RGB backlit keyboard", price: 89.99, categoryId: computer.id },
    { name: "Gaming Monitor", description: "27 inch 144Hz", price: 299.99, categoryId: computer.id },
    { name: "USB-C Hub", description: "Multiport adapter", price: 39.99, categoryId: computer.id },

    // Food 5 ชนิด
    { name: "Chocolate Bar", description: "Dark chocolate", price: 2.99, categoryId: food.id },
    { name: "Organic Apple", description: "Fresh and sweet", price: 1.99, categoryId: food.id },
    { name: "Bagel", description: "Freshly baked", price: 0.99, categoryId: food.id },
    { name: "Coffee Beans", description: "Premium roast", price: 12.99, categoryId: food.id },
    { name: "Cheese", description: "Aged cheddar", price: 5.99, categoryId: food.id },
  ];

  await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });
}

async function seedUser() {
  await prisma.user.create({
    data : { 
      name: "ceme",
      email: "ball@gmail.com",
      password: "123456789",
    },
  });
}

async function main() { 
  //await prisma.product.deleteMany(); // ลบข้อมูลเก่าออกก่อน
  //await prisma.user.deleteMany(); // ลบข้อมูลผู้ใช้เก่าออกก่อน
  await seedCategory();
  await seedProduct();
  await seedUser();
  console.log("Seeded data successfully!"); 
}

main()

  .catch((e) => { 
    console.error(e); 
    process.exit(1); 
  })
  .finally(async () => { 
    await prisma.$disconnect(); 
  });
