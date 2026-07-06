import sharp from 'sharp';
import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const artistsDir = path.resolve(__dirname, '../src/assets/artists');
const MAX_SIZE = 600;

const files = (await readdir(artistsDir)).filter((f) => f.endsWith('.png'));

for (const file of files) {
  const filePath = path.join(artistsDir, file);
  const image = sharp(filePath);
  const meta = await image.metadata();
  const needsResize =
    (meta.width && meta.width > MAX_SIZE) ||
    (meta.height && meta.height > MAX_SIZE);

  let pipeline = image;
  if (needsResize) {
    pipeline = pipeline.resize({
      width: MAX_SIZE,
      height: MAX_SIZE,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  await pipeline
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(filePath + '.tmp');

  const { rename } = await import('fs/promises');
  await rename(filePath + '.tmp', filePath);

  const after = await sharp(filePath).metadata();
  console.log(`${file}: ${meta.width}x${meta.height} -> ${after.width}x${after.height}`);
}
