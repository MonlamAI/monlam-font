// Mapping of English font names to Tibetan names
export const fontNameTibetan: Record<string, string> = {
  'Monlam Uni OuChan2': 'སྨོན་ལམ་དབུ་ཅན་གཉིས་པ།',
  'Monlam Uni OuChan1': 'སྨོན་ལམ་དབུ་ཅན་དང་པོ།',
  'Monlam Uni OuChan3': 'སྨོན་ལམ་དབུ་ཅན་གསུམ་པ།',
  'Monlam Uni OuChan4': 'སྨོན་ལམ་དབུ་ཅན་བཞི་པ།',
  'Monlam Uni OuChan5': 'སྨོན་ལམ་དབུ་ཅན་ལྔ་པ།',
  'Monlam Uni Chouk': 'སྨོན་ལམ་འཁྱུག',
  'Monlam Uni ChoukMatik': 'སྨོན་ལམ་འཁྱུག་མ་ཚིགས།',
  'Monlam Uni Dutsa1': 'སྨོན་ལམ་འབྲུ་ཚ་དང་པོ།',
  'Monlam Uni Dutsa2': 'སྨོན་ལམ་འབྲུ་ཚ་གཉིས་པ།',
  'Monlam Uni Tikrang': 'སྨོན་ལམ་ཚིགས་རིང་།',
  'Monlam Uni TikTong': 'སྨོན་ལམ་ཚིགས་ཐུང་།',
  'Monlam Uni Sans Serif': 'སྨོན་ལམ་ Sans Serif',
  'MonlamUniPayTsik': 'སྨོན་ལམ་དཔེ་ཚིགས།',
  'Monlam Lakdi Ouchen': 'སྨོན་ལམ་ལག་བྲིས་དབུ་ཅན།',
  'Monlam Lanza-Regular': 'སྨོན་ལམ་ལཉྫ།',
  'Monlam Tsikmachok': 'སྨོན་ལམ་ཚིགས་མ་འཁྱུག',
  'Monlam yig-chong': 'སྨོན་ལམ་ཡིག་ཆུང་།',
};

/**
 * Get Tibetan name for a font, or return the original name if not found
 */
export function getTibetanFontName(englishName: string): string {
  return fontNameTibetan[englishName] || englishName;
}

