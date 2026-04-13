import { defineCollection, z } from 'astro:content';

const legacyFields = {
  draft: z.boolean().default(false),
  legacyId: z.number().int().optional(),
  legacyUrl: z.string().url().optional(),
};

const seoFields = {
  description: z.string().default(''),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  canonical: z.string().url().optional(),
  heroImage: z.string().optional(),
};

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number().int().optional(),
    ...seoFields,
    ...legacyFields,
  }),
});

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    excerpt: z.string().default(''),
    tags: z.array(z.string()).default([]),
    ...seoFields,
    ...legacyFields,
  }),
});

const books = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    series: z.string().optional(),
    status: z.enum(['published', 'upcoming', 'archived']).default('published'),
    trailerUrl: z.string().url().optional(),
    ...seoFields,
    ...legacyFields,
  }),
});

const products = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    book: z.string(),
    format: z.string(),
    price: z.number().nonnegative(),
    currency: z.string().default('USD'),
    purchaseProvider: z.enum(['paypal', 'external']).default('paypal'),
    purchaseUrl: z.string().url(),
    availability: z.enum(['in-stock', 'preorder', 'sold-out']).default('in-stock'),
    coverImage: z.string().optional(),
    ...seoFields,
    ...legacyFields,
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    eventDate: z.coerce.date().optional(),
    location: z.string().optional(),
    externalUrl: z.string().url().optional(),
    ...seoFields,
    ...legacyFields,
  }),
});

const vendors = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    role: z.string().optional(),
    externalUrl: z.string().url().optional(),
    image: z.string().optional(),
    ...seoFields,
    ...legacyFields,
  }),
});

const legal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lastUpdated: z.coerce.date().optional(),
    ...seoFields,
    ...legacyFields,
  }),
});

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    book: z.string(),
    author: z.string(),
    rating: z.number().min(1).max(5),
    text: z.string(),
    source: z.enum(['amazon', 'goodreads', 'personal', 'other']).default('amazon'),
    sourceUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    ...legacyFields,
  }),
});

export const collections = {
  pages,
  posts,
  books,
  products,
  events,
  vendors,
  legal,
  reviews,
};
