import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string().min(1),
});

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  interests: z.array(z.string()),
  location: z.array(z.string()),
});

export const NewsSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  description: z.string().min(1),
  url: z.string().url(),
  datePublished: z.string().datetime(),
  authors: z.array(z.string()),
  sources: z.array(z.string()),
});

export const UserInterestsSchema = z.object({
  userId: z.string(),
  categoryId: z.string(),
});

export const UserBookmarksSchema = z.object({
  userId: z.string(),
  newsId: z.string(),
});

export const NewsCategoriesSchema = z.object({
  newsId: z.string(),
  categoryId: z.string(),
});