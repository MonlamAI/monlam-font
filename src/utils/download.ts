export const downloadFont = async (filename: string, fontName: string) => {
  try {
    // Properly encode the filename for the fetch request
    const encodedFilename = encodeURIComponent(filename);
    const response = await fetch(`fonts/${encodedFilename}`);
    if (!response.ok) {
      throw new Error(`Failed to download font: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename; // Use original filename for download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading font:', error);
    alert(`Failed to download ${fontName}. Please try again.`);
  }
};

export const downloadAllFonts = async (fonts: Array<{filename: string, name: string}>) => {
  const downloadPromises = fonts.map(font => downloadFont(font.filename, font.name));
  const results = await Promise.allSettled(downloadPromises);
  
  const successful = results.filter(result => result.status === 'fulfilled').length;
  const total = results.length;
  
  if (successful === total) {
    alert(`Successfully downloaded all ${total} fonts!`);
  } else {
    alert(`Downloaded ${successful} out of ${total} fonts. Some downloads may have failed.`);
  }
};
