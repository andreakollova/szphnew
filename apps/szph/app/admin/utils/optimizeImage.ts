/**
 * Converts any image file to optimized WebP before upload.
 * Uses Canvas API — works in all modern browsers.
 * Max width: 1920px, quality: 0.82
 */
export async function optimizeImage(
  file: File,
  opts?: { maxWidth?: number; quality?: number }
): Promise<{ blob: Blob; filename: string }> {
  const maxWidth = opts?.maxWidth ?? 1920;
  const quality = opts?.quality ?? 0.82;

  // If already a small webp or svg, skip
  if (file.type === "image/svg+xml") {
    return { blob: file, filename: file.name };
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let w = img.naturalWidth;
      let h = img.naturalHeight;

      // Downscale if wider than max
      if (w > maxWidth) {
        h = Math.round(h * (maxWidth / w));
        w = maxWidth;
      }

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("Canvas not supported")); return; }

      ctx.drawImage(img, 0, 0, w, h);

      canvas.toBlob(
        (blob) => {
          if (!blob) { reject(new Error("Conversion failed")); return; }
          const baseName = file.name.replace(/\.[^.]+$/, "");
          resolve({ blob, filename: `${baseName}.webp` });
        },
        "image/webp",
        quality
      );
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}
