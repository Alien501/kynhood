// src/handlers/index.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {
    CategorySchema,
    UserSchema,
    NewsSchema,
    UserInterestsSchema,
    UserBookmarksSchema,
    NewsCategoriesSchema,
} from '../types/types';

const prisma = new PrismaClient();

// Category Handlers
export const categoryHandlers = {
    async create(req: Request, res: Response) {
        try {
            const data = CategorySchema.parse(req.body);
            const category = await prisma.category.create({ data });
            res.json(category);
        } catch (error) {
            console.error(error);
            
            res.status(400).json({ error: 'Invalid category data' });
        }
    },

    async getAll(req: Request, res: Response) {
        const categories = await prisma.category.findMany();
        res.json(categories);
    },

    async getOne(req: Request, res: Response) {
        const { id } = req.params;
        const category = await prisma.category.findUnique({ where: { id } });
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json(category);
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = CategorySchema.parse(req.body);
            const category = await prisma.category.update({
                where: { id },
                data,
            });
            res.json(category);
        } catch (error) {
            res.status(400).json({ error: 'Invalid category data' });
        }
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await prisma.category.delete({ where: { id } });
        res.status(204).send();
    },
};

// User Handlers
export const userHandlers = {
    async create(req: Request, res: Response) {
        try {
            console.log(req.body);
            const data = UserSchema.parse(req.body);
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const { password, ...rest } = data;
            const user = await prisma.user.create({
                data: {
                    ...rest,
                    passwordHash: hashedPassword,
                },
            });
            res.json({ ...user, passwordHash: undefined });
        } catch (error) {
            console.error(error)
            res.status(400).json({ error: 'Invalid user data' });
        }
    },

    async getAll(req: Request, res: Response) {
        const users = await prisma.user.findMany({
            select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
        });
        res.json(users);
    },

    async getOne(req: Request, res: Response) {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id },
            select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = UserSchema.partial().parse(req.body);
            const updateData: any = { ...data };
            if (data.password) {
                updateData.passwordHash = await bcrypt.hash(data.password, 10);
                delete updateData.password;
            }
            const user = await prisma.user.update({
                where: { id },
                data: updateData,
                select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
            });
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: 'Invalid user data' });
        }
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await prisma.user.delete({ where: { id } });
        res.status(204).send();
    },
};

// News Handlers
export const newsHandlers = {
    async create(req: Request, res: Response) {
        try {
            console.log(req.body);
            const data = NewsSchema.parse(req.body);
            const news = await prisma.news.create({ data });
            res.json(news);
        } catch (error) {
            console.error(error)
            res.status(400).json({ error: 'Invalid news data' });
        }
    },

    async getAll(req: Request, res: Response) {
        const news = await prisma.news.findMany();
        res.json(news);
    },

    async getOne(req: Request, res: Response) {
        const { id } = req.params;
        const news = await prisma.news.findUnique({ where: { id } });
        if (!news) return res.status(404).json({ error: 'News not found' });
        res.json(news);
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = NewsSchema.parse(req.body);
            const news = await prisma.news.update({
                where: { id },
                data,
            });
            res.json(news);
        } catch (error) {
            res.status(400).json({ error: 'Invalid news data' });
        }
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await prisma.news.delete({ where: { id } });
        res.status(204).send();
    },
};

// User Interests Handlers
export const userInterestsHandlers = {
    async create(req: Request, res: Response) {
        try {
            const data = UserInterestsSchema.parse(req.body);
            const userInterest = await prisma.userInterests.create({ data });
            res.json(userInterest);
        } catch (error) {
            res.status(400).json({ error: 'Invalid user interest data' });
        }
    },

    async getByUser(req: Request, res: Response) {
        const { userId } = req.params;
        const interests = await prisma.userInterests.findMany({
            where: { userId },
        });
        res.json(interests);
    },

    async delete(req: Request, res: Response) {
        const { userId, categoryId } = req.params;
        await prisma.userInterests.delete({
            where: {
                userId_categoryId: { userId, categoryId },
            },
        });
        res.status(204).send();
    },
};

// User Bookmarks Handlers
export const userBookmarksHandlers = {
    async create(req: Request, res: Response) {
        try {
            const data = UserBookmarksSchema.parse(req.body);
            const bookmark = await prisma.userBookmarks.create({ data });
            res.json(bookmark);
        } catch (error) {
            res.status(400).json({ error: 'Invalid bookmark data' });
        }
    },

    async getByUser(req: Request, res: Response) {
        const { userId } = req.params;
        const bookmarks = await prisma.userBookmarks.findMany({
            where: { userId },
        });
        res.json(bookmarks);
    },

    async delete(req: Request, res: Response) {
        const { userId, newsId } = req.params;
        await prisma.userBookmarks.delete({
            where: {
                userId_newsId: { userId, newsId },
            },
        });
        res.status(204).send();
    },
};

// News Categories Handlers
export const newsCategoriesHandlers = {
    async create(req: Request, res: Response) {
        try {
            const data = NewsCategoriesSchema.parse(req.body);
            const newsCategory = await prisma.newsCategories.create({ data });
            res.json(newsCategory);
        } catch (error) {
            res.status(400).json({ error: 'Invalid news category data' });
        }
    },

    async getByNews(req: Request, res: Response) {
        const { newsId } = req.params;
        const categories = await prisma.newsCategories.findMany({
            where: { newsId },
        });
        res.json(categories);
    },

    async delete(req: Request, res: Response) {
        const { newsId, categoryId } = req.params;
        await prisma.newsCategories.delete({
            where: {
                newsId_categoryId: { newsId, categoryId },
            },
        });
        res.status(204).send();
    },
};