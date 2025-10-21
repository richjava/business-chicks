import createImageUrlBuilder from '@sanity/image-url';
import { getSanityConfig } from '@/sanity/config';

// Create an instance of ImageUrlBuilder
const imageBuilder = createImageUrlBuilder(getSanityConfig());

export const urlForImage = (source: string | undefined): string => {
  return source ? imageBuilder.image(source).auto('format').fit('max').url() ?? '' : '';
};

export const widthForImage = (source: { metadata?: { dimensions?: { width?: number } } }): number | undefined =>
  source?.metadata?.dimensions?.width;

export const heightForImage = (source: { metadata?: { dimensions?: { height?: number } } }): number | undefined =>
  source?.metadata?.dimensions?.height;

export const collectionSlug = (entry: { _type?: string }): string =>
  entry._type ? entry._type.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`) : '';

export const entrySlug = (entry: { slug?: { current?: string } | string }): string =>
  entry.slug ? (typeof entry.slug === 'string' ? entry.slug : entry.slug.current ?? '') : '';
