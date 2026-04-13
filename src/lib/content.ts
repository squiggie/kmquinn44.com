import { getCollection, type CollectionEntry } from 'astro:content';

type PageEntry = CollectionEntry<'pages'>;
type PostEntry = CollectionEntry<'posts'>;
type ProductEntry = CollectionEntry<'products'>;

export async function getPages() {
  const pages = await getCollection('pages', ({ data }) => !data.draft);
  return pages.sort((left, right) => {
    const leftOrder = left.data.order ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = right.data.order ?? Number.MAX_SAFE_INTEGER;
    return leftOrder - rightOrder || left.data.title.localeCompare(right.data.title);
  });
}

export async function getPageBySlug(slug: string) {
  const pages = await getPages();
  return pages.find((page) => page.slug === slug);
}

export async function getPosts() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort(
    (left, right) => right.data.publishDate.getTime() - left.data.publishDate.getTime(),
  );
}

export async function getPostByDatePath(year: string, month: string, day: string, slug: string) {
  const posts = await getPosts();
  return posts.find((post) => {
    const dateParts = getPostDateParts(post);
    return (
      dateParts.year === year &&
      dateParts.month === month &&
      dateParts.day === day &&
      post.slug === slug
    );
  });
}

export async function getProducts() {
  const products = await getCollection('products', ({ data }) => !data.draft);
  return products.sort((left, right) => left.data.title.localeCompare(right.data.title));
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}

export function getPagePath(page: PageEntry) {
  return page.slug === 'home' ? '/' : `/${page.slug}/`;
}

export function getPostPath(post: PostEntry) {
  const { year, month, day } = getPostDateParts(post);
  return `/${year}/${month}/${day}/${post.slug}/`;
}

export function getProductPath(product: ProductEntry) {
  return `/product/${product.slug}/`;
}

export function getPostDateParts(post: PostEntry) {
  return {
    year: String(post.data.publishDate.getUTCFullYear()),
    month: String(post.data.publishDate.getUTCMonth() + 1).padStart(2, '0'),
    day: String(post.data.publishDate.getUTCDate()).padStart(2, '0'),
  };
}

export function formatPublishDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
