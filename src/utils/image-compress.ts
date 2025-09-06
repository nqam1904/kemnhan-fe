export type CompressOptions = {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0..1
  mimeType?: 'image/jpeg' | 'image/webp' | 'image/png';
  thresholdBytes?: number; // only compress if file size > threshold
};

const DEFAULTS: Required<CompressOptions> = {
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 0.8,
  mimeType: 'image/jpeg',
  thresholdBytes: 1024 * 1024, // 1MB
};

function getTargetSize(width: number, height: number, maxWidth: number, maxHeight: number) {
  const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
  return { width: Math.round(width * ratio), height: Math.round(height * ratio) };
}

export async function compressImageIfNeeded(file: File, options?: CompressOptions): Promise<File> {
  const opts = { ...DEFAULTS, ...(options || {}) };

  if (!file || !file.type.startsWith('image/')) return file;
  if (file.size <= opts.thresholdBytes) return file;

  const src = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (e) => reject(e);
      image.src = src;
    });

    const { width, height } = getTargetSize(
      img.naturalWidth || img.width,
      img.naturalHeight || img.height,
      opts.maxWidth,
      opts.maxHeight
    );

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, width, height);

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b), opts.mimeType, opts.quality)
    );

    if (!blob) return file;

    // If compression didn't help, keep original
    if (blob.size >= file.size) return file;

    const newExt =
      opts.mimeType === 'image/png' ? 'png' : opts.mimeType === 'image/webp' ? 'webp' : 'jpg';
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    const compressed = new File([blob], `${baseName}.compressed.${newExt}`, {
      type: opts.mimeType,
      lastModified: Date.now(),
    });
    return compressed;
  } catch (_e) {
    return file;
  } finally {
    URL.revokeObjectURL(src);
  }
}

export async function compressImagesIfNeeded(
  files: File[],
  options?: CompressOptions
): Promise<File[]> {
  return Promise.all(files.map((f) => compressImageIfNeeded(f, options)));
}
