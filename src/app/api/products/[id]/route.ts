// Contenido para: src/app/api/products/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getWooCommerceApi, handleWooCommerceError } from '@/app/lib/woocommerce';
import { UpdateProductData } from '@/types/product';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: UpdateProductData = await request.json();
    const api = getWooCommerceApi();

    const productData = {
      name: body.name,
      type: body.type,
      ...(body.type === 'simple' && body.price && {
        regular_price: body.price
      }),
      ...(body.images && body.images.length > 0 && {
        images: body.images
      })
    };

    const response = await api.put(`products/${params.id}`, productData);

    return NextResponse.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    const errorResponse = handleWooCommerceError(error);
    return NextResponse.json(errorResponse, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const api = getWooCommerceApi();
    
    // WooCommerce doesn't actually delete products, it moves them to trash
    const response = await api.delete(`products/${params.id}`, {
      force: true // This will permanently delete the product
    });

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    const errorResponse = handleWooCommerceError(error);
    return NextResponse.json(errorResponse, { status: 400 });
  }
}