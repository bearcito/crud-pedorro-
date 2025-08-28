import { NextResponse } from 'next/server';
import { getWooCommerceApi } from '@/app/lib/woocommerce';

// Función para OBTENER productos (GET)
export async function GET() {
  try {
    const api = getWooCommerceApi();
    const response = await api.get("products");
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Función para CREAR un producto (POST)
export async function POST(request: Request) {
  try {
    const productData = await request.json();
    const api = getWooCommerceApi();
    const response = await api.post("products", productData);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}