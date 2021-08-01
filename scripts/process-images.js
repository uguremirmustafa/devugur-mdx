const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

async function processImage(imagePath) {
  const sharpImg = sharp(imagePath);
  const meta = await sharpImg.metadata();
  const placeholderImgWidth = 20;
  const imgAspectRatio = meta.width / meta.height;
  const placeholderImgHeight = Math.round(placeholderImgWidth / imgAspectRatio);
  const imgBase64 = await sharpImg
    .resize(placeholderImgWidth, placeholderImgHeight)
    .toBuffer()
    .then((buffer) => `data:image/${meta.format};base64,${buffer.toString('base64')}`);

  return {
    fileName: path.basename(imagePath),
    // Strip public prefix, /public is / in Nextjs runtime environment
    relativePath: path.relative(process.cwd(), imagePath).substring('public'.length),
    width: meta.width,
    height: meta.height,
    imgBase64,
  };
}

async function processImages(folderName, recrusive) {
  const imageFolder = fs.readdirSync(folderName);

  const recurseFolders = [];
  const folderImgMeta = {};

  for await (const item of imageFolder) {
    const itemIsDir = fs.lstatSync(path.join(folderName, item)).isDirectory();
    if (itemIsDir) {
      recurseFolders.push(path.join(folderName, item));
    } else if (path.extname(item) !== '.json') {
      const imgMeta = await processImage(path.join(folderName, item));
      folderImgMeta[imgMeta.fileName] = imgMeta;
    }
  }

  fs.writeFileSync(path.join(folderName, 'imgMeta.json'), JSON.stringify(folderImgMeta));

  if (recrusive) recurseFolders.forEach(async (folder) => await processImages(folder, true));

  return;
}

async function processAllImages() {
  await processImages(path.join(process.cwd(), 'public', 'images'), true);
}

processAllImages();
