import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('admin-session');

    if (!sessionToken) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify session token (in production, use proper JWT verification)
    try {
      const decoded = Buffer.from(sessionToken.value, 'base64').toString();
      const [username, timestamp] = decoded.split(':');
      
      // Check if session is not too old (24 hours)
      const sessionAge = Date.now() - parseInt(timestamp);
      if (sessionAge > 24 * 60 * 60 * 1000) {
        return NextResponse.json(
          { message: 'Session expired' },
          { status: 401 }
        );
      }

      return NextResponse.json({ authenticated: true, username });
    } catch (error) {
      return NextResponse.json(
        { message: 'Invalid session' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}
