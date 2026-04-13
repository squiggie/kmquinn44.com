export const COLLECTION_NAMES = ['pages', 'posts', 'books', 'products', 'events', 'vendors', 'legal'] as const;

export type CollectionName = (typeof COLLECTION_NAMES)[number];

export const PURCHASE_PROVIDERS = ['paypal', 'external'] as const;

export type PurchaseProvider = (typeof PURCHASE_PROVIDERS)[number];
