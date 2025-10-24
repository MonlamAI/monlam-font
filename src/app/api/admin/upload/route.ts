import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const sessionToken = request.cookies.get('admin-session');

    if (!sessionToken) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const fontFile = formData.get('font') as File;
    const fontName = formData.get('name') as string;
    const category = formData.get('category') as string;

    if (!fontFile) {
      return NextResponse.json(
        { message: 'No font file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['font/ttf', 'font/otf', 'application/font-ttf', 'application/font-otf'];
    const fileType = fontFile.type;
    const fileName = fontFile.name.toLowerCase();
    
    if (!allowedTypes.includes(fileType) && !fileName.endsWith('.ttf') && !fileName.endsWith('.otf')) {
      return NextResponse.json(
        { message: 'Invalid file type. Please upload a .ttf or .otf font file.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (fontFile.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { message: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Create fonts directory if it doesn't exist
    const fontsDir = join(process.cwd(), 'public', 'fonts');
    try {
      await mkdir(fontsDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    // Save file
    const fileBuffer = await fontFile.arrayBuffer();
    const originalFileName = fontFile.name;
    const filePath = join(fontsDir, originalFileName);
    
    await writeFile(filePath, Buffer.from(fileBuffer));

    return NextResponse.json({
      success: true,
      message: 'Font uploaded successfully',
      filename: originalFileName,
      name: fontName || originalFileName.replace(/\.(ttf|otf)$/i, ''),
      category: category || 'Monlam Classic'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
