import { Database } from '@/types/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = await genAI.getGenerativeModel({ model: 'gemini-pro' });

    type ProductWithBrewery =
      Database['public']['Tables']['products']['Row'] & {
        brewery: Database['public']['Tables']['breweries']['Row'] | null;
      };

    const { product, clientType } = await req.json();
    if (!product || !clientType) {
      throw new Error('Product and clientType are missing in request body');
    }
    const productWithBrewery = product as ProductWithBrewery;

    const breweryName = productWithBrewery.brewery?.name || '不明なブルワリー';
    const breweryRegion = productWithBrewery.brewery?.region || '不明な地域';
    const fermentation =
      productWithBrewery.fermentation === 'top' ? '上面発酵' : '下面発酵';
    const hopList = productWithBrewery.hops?.join(', ') || '不明';
    const maltList = productWithBrewery.malts?.join(', ') || '不明';

    const prompt = `
      以下の商品について、${clientType} 向けの魅力的な説明文を生成してください。

      商品名: ${productWithBrewery.name}
      ブルワリー名: ${breweryName}
      ブルワリーの所属地域: ${breweryRegion}
      発酵: ${fermentation}
      ビアスタイル: ${productWithBrewery.style}
      ABV: ${productWithBrewery.abv}
      IBU: ${productWithBrewery.ibu}
      使用HOP: ${hopList}
      使用モルト: ${maltList}
      内容量: ${productWithBrewery.volume}
    `;

    const result = await model.generateContent(prompt);
    return NextResponse.json({ text: result.response.text() });
  } catch (error: unknown) {
    console.error('Gemini API error:', error);
    let errorMessage = 'An unknown error occurred.';

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error && typeof error === 'object') {
      if ('message' in error) {
        errorMessage = (error as { message: string }).message;
      } else if ('error' in error) {
        errorMessage = (error as { error: string }).error;
      } else if (Array.isArray(error) && error[0] && 'message' in error[0]) {
        errorMessage = (error as Array<{ message: string }>)[0].message;
      } else {
        errorMessage = JSON.stringify(error);
      }
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
