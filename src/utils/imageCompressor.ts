export interface CompressionResult {
  dataUrl: string;
  blob: Blob;
  originalSizeBytes: number;
  compressedSizeBytes: number;
  originalSizeKb: number;
  compressedSizeKb: number;
  savingsPercentage: number;
  dimensions: { width: number; height: number };
}

/**
 * Client-Side Image Compression for Rural 2G/3G Networks
 * Uses HTML5 <canvas> to resize high-resolution smartphone camera images (5MB+)
 * down to max 600px width at 60% JPEG quality, shrinking payload to ~40-60 KB.
 */
export async function compressCropImage(
  fileOrDataUrl: File | Blob | string,
  maxWidth = 600,
  quality = 0.60
): Promise<CompressionResult> {
  return new Promise((resolve, reject) => {
    let originalSizeBytes = 0;

    const img = new Image();

    img.onload = () => {
      // Calculate aspect ratio scaling
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      // Render to HTML5 canvas
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas 2D context unavailable'));
        return;
      }

      // Fill clean background to avoid transparent png artifacts
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Smooth bicubic rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';
      ctx.drawImage(img, 0, 0, width, height);

      // Export as 60% quality JPEG
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to create compressed blob'));
            return;
          }

          const compressedSizeBytes = blob.size;
          const origBytes = originalSizeBytes || compressedSizeBytes * 12; // fallback estimate if dataUrl
          const savingsPercentage = Math.max(
            0,
            Math.round(((origBytes - compressedSizeBytes) / origBytes) * 100)
          );

          resolve({
            dataUrl: compressedDataUrl,
            blob,
            originalSizeBytes: origBytes,
            compressedSizeBytes,
            originalSizeKb: Math.round(origBytes / 1024),
            compressedSizeKb: Math.round(compressedSizeBytes / 1024),
            savingsPercentage,
            dimensions: { width, height },
          });
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image for compression'));

    if (typeof fileOrDataUrl === 'string') {
      originalSizeBytes = Math.round((fileOrDataUrl.length * 3) / 4);
      img.src = fileOrDataUrl;
    } else {
      originalSizeBytes = fileOrDataUrl.size;
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(fileOrDataUrl);
    }
  });
}
