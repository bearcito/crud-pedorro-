import { NextRequest, NextResponse } from 'next/server';
import { getWooCommerceApi, handleWooCommerceError } from '@/app/lib/woocommerce';
import { CreateProductData } from '@/types/product';

export async function GET() {
  try {
    const api = getWooCommerceApi();
    
    const response = await api.get('products', {
      per_page: 100,
      status: 'publish,draft,pending'
    });

    return NextResponse.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    const errorResponse = handleWooCommerceError(error);
    return NextResponse.json(errorResponse, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateProductData = await request.json();
    const api = getWooCommerceApi();

    const productData = {
      name: body.name,
      type: body.type,
      status: 'publish',
      ...(body.type === 'simple' && body.price && {
        regular_price: body.price
      }),
      ...(body.images && body.images.length > 0 && {
        images: body.images
      })
    };

    const response = await api.post('products', productData);

    return NextResponse.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    const errorResponse = handleWooCommerceError(error);
    return NextResponse.json(errorResponse, { status: 400 });
  }
}