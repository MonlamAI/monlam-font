import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { getTibetanFontName } from '@/utils/fontNames';

export async function GET() {
  try {
    const fontsDir = join(process.cwd(), 'public', 'fonts');
    
    // Read all files from the fonts directory
    const files = await readdir(fontsDir);
    
    // Filter for font files and create font objects
    const fonts = files
      .filter(file => file.toLowerCase().endsWith('.ttf') || file.toLowerCase().endsWith('.otf'))
      .map(file => {
        // Extract font name from filename
        const name = file.replace(/\.(ttf|otf)$/i, '');
        
        // Get Tibetan name
        const tibetanName = getTibetanFontName(name);
        
        // Determine category based on filename - Tibetan categories
        let category = 'དབུ་ཅན།'; // Default to Uchen
        const nameLower = name.toLowerCase();
        
        if (nameLower.includes('ouchan') || nameLower.includes('lakdi ouchen')) {
          category = 'དབུ་ཅན།';
        } else if (nameLower.includes('tikrang') || nameLower.includes('tiktong')) {
          category = 'དབུ་མེད་';
        } else if (nameLower.includes('chouk') || nameLower.includes('tsikmachok')) {
          category = 'འཁྱུག';
        } else if (nameLower.includes('lanza')) {
          category = 'ལཉྫ།';
        } else if (nameLower.includes('dutsa') || nameLower.includes('paytsik')) {
          category = 'འབྲུ་ཚ།';
        } else if (nameLower.includes('sans serif') || nameLower.includes('yig-chong')) {
          category = 'དབུ་ཅན།'; // Default serif fonts to Uchen
        }
        
        return {
          id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name: name,
          tibetanName: tibetanName,
          filename: file,
          category: category
        };
      });

    return NextResponse.json({ fonts });
  } catch (error) {
    console.error('Error reading fonts:', error);
    return NextResponse.json(
      { message: 'Failed to load fonts' },
      { status: 500 }
    );
  }
}

