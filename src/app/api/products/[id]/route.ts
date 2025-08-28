// Contenido para: src/app/api/products/[id]/route.ts

import { NextResponse } from 'next/server';
import { getWooCommerceApi } from '@/'

interface Params {
  params: {
    id: string;
  };
}

// --- Función para ACTUALIZAR (Update) un producto ---
export async function PUT(request: Request, { params }: Params) {
  const { id } = params;
  const productData = await request.json();
  try {
    const api = getWooCommerceApi();
    const response = await api.put(`products/${id}`, productData);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// --- Función para BORRAR (Delete) un producto ---
export async function DELETE(request: Request, { params }: Params) {
  const { id } = params;
  try {
    const api = getWooCommerceApi();
    // { force: true } es para borrarlo permanentemente
    const response = await api.delete(`products/${id}`, { force: true });
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}