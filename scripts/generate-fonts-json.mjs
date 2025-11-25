import { readdir, writeFile } from 'fs/promises';
import { join } from 'path';

const fontsDir = join(process.cwd(), 'public', 'fonts');
const outFile = join(process.cwd(), 'public', 'fonts.json');

const fontNameTibetan = {
  'Monlam Uni OuChan2': 'སྨོན་ལམ་དབུ་ཅན་གཉིས་པ།',
  'Monlam Uni OuChan1': 'སྨོན་ལམ་དབུ་ཅན་དང་པོ།',
  'Monlam Uni OuChan3': 'སྨོན་ལམ་དབུ་ཅན་གསུམ་པ།',
  'Monlam Uni OuChan4': 'སྨོན་ལམ་དབུ་ཅན་བཞི་པ།',
  'Monlam Uni OuChan5': 'སྨོན་ལམ་དབུ་ཅན་ལྔ་པ།',
  'Monlam Uni Chouk': 'སྨོན་ལམ་འཁྱུག',
  'Monlam Uni ChoukMatik': 'སྨོན་ལམ་འཁྱུག་མ་ཚུགས།',
  'Monlam Uni Dutsa1': 'སྨོན་ལམ་འབྲུ་ཚ་དང་པོ།',
  'Monlam Uni Dutsa2': 'སྨོན་ལམ་འབྲུ་ཚ་གཉིས་པ།',
  'Monlam Uni Tikrang': 'སྨོན་ལམ་ཚུགས་རིང་།',
  'Monlam Uni TikTong': 'སྨོན་ལམ་ཚུགས་ཐུང་།',
  'Monlam Uni Sans Serif': 'སྨོན་ལམ་ Sans Serif',
  'MonlamUniPayTsik': 'སྨོན་ལམ་དཔེ་ཚུགས།',
  'Monlam Lakdi Ouchen': 'སྨོན་ལམ་ལག་བྲིས་དབུ་ཅན།',
  'Monlam Lanza-Regular': 'སྨོན་ལམ་ལཉྫ།',
  'Monlam Tsikmachok': 'སྨོན་ལམ་ཚུགས་མ་འཁྱུག',
  'Monlam yig-chong': 'སྨོན་ལམ་ཡིག་ཆུང་།',
};

function getTibetanFontName(name) {
  return fontNameTibetan[name] || name;
}

function categorize(name) {
  const s = name.toLowerCase();
  if (s.includes('ouchan') || s.includes('lakdi ouchen')) return 'དབུ་ཅན།';
  if (s.includes('tikrang') || s.includes('tiktong')) return 'དབུ་མེད་';
  if (s.includes('chouk') || s.includes('tsikmachok')) return 'འཁྱུག';
  if (s.includes('lanza')) return 'ལཉྫ།';
  if (s.includes('dutsa') || s.includes('paytsik')) return 'འབྲུ་ཚ།';
  if (s.includes('sans serif') || s.includes('yig-chong')) return 'དབུ་ཅན།';
  return 'དབུ་ཅན།';
}

const main = async () => {
  const files = (await readdir(fontsDir)).filter(f => /\.(ttf|otf)$/i.test(f));
  const fonts = files.map(file => {
    const name = file.replace(/\.(ttf|otf)$/i, '');
    return {
      id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name,
      tibetanName: getTibetanFontName(name),
      filename: file,
      category: categorize(name),
    };
  });
  await writeFile(outFile, JSON.stringify({ fonts }, null, 2));
  console.log(`Wrote ${outFile} with ${fonts.length} fonts`);
};

main().catch(err => {
  console.error(err);
  process.exit(1);
});


