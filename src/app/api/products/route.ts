import { NextRequest, NextResponse } from 'next/server';
import { dataService } from '@/lib/dataService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') as 'name' | 'price' | 'rating' | 'newest' | null;
    const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' | null;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const featured = searchParams.get('featured') === 'true';

    let products;

    if (featured) {
      products = dataService.getFeaturedProducts(limit || 8);
    } else {
      products = dataService.getProductsByFilter({
        category: category || undefined,
        minPrice,
        maxPrice,
        brand: brand || undefined,
        search: search || undefined,
        sortBy: sortBy || undefined,
        sortOrder: sortOrder || undefined,
      });

      if (limit) {
        products = products.slice(0, limit);
      }
    }

    return NextResponse.json({
      success: true,
      data: products,
      total: products.length
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}