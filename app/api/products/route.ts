import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const categoryId = url.searchParams.get('categoryId');

    let products;

    if (categoryId) {
      products = await prisma.product.findMany({
        where: {
          categoryId: Number(categoryId),
        },
      });
    } else {
      products = await prisma.product.findMany();
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  try {
    const { name, description, price, categoryId } = await request.json();
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        categoryId, // ส่ง categoryId มาด้วยตอนสร้าง
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

