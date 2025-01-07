import { NextRequest, NextResponse } from 'next/server';
import { handleAuthCallback } from '@/lib/auth/callback';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    await handleAuthCallback(code);
  }

  return NextResponse.redirect(requestUrl.origin);
}
