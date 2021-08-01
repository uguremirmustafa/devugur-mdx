import fs from 'fs';
import { join } from 'path';

/**
 * @param route The route path, excluding base path, without leading or trailing slashes. E.g. test/page or page
 * @param includeSharedImages Whether the images in the base images folder should be included
 */
export async function getRouteImageMeta(route, includeSharedImages) {
  const routeImgPath = join(
    process.cwd(),
    'public',
    'images',
    route === '' ? 'home' : route,
    'imgMeta.json'
  );

  const routeImgMeta = JSON.parse(fs.readFileSync(routeImgPath, 'utf-8'));

  if (includeSharedImages) {
    const sharedImgMeta = JSON.parse(
      fs.readFileSync(join(process.cwd(), 'public', 'images', 'imgMeta.json'), 'utf-8')
    );
    return { ...sharedImgMeta, ...routeImgMeta };
  }

  return routeImgMeta;
}
