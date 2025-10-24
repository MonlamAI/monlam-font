import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';

export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
    const sessionToken = request.cookies.get('admin-session');

    if (!sessionToken) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Parse request body
    const { filename } = await request.json();

    if (!filename) {
      return NextResponse.json(
        { message: 'Filename is required' },
        { status: 400 }
      );
    }

    // Validate filename to prevent directory traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return NextResponse.json(
        { message: 'Invalid filename' },
        { status: 400 }
      );
    }

    // Construct file path
    const fontsDir = join(process.cwd(), 'public', 'fonts');
    const filePath = join(fontsDir, filename);

    // Check if file exists and delete it
    try {
      await unlink(filePath);
      return NextResponse.json({
        success: true,
        message: 'Font deleted successfully',
        filename: filename
      });
    } catch (error) {
      if ((error as any).code === 'ENOENT') {
        return NextResponse.json(
          { message: 'Font file not found' },
          { status: 404 }
        );
      }
      throw error;
    }

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { message: 'Failed to delete font' },
      { status: 500 }
    );
  }
}
