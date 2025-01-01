import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { LoginSchema } from '../types/auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const prisma = new PrismaClient();

export const loginHandler = async (req: Request, res: Response) => {
    try {
        const data = LoginSchema.parse(req.body);
        
        const user = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const validPassword = await bcrypt.compare(data.password, user.passwordHash);
        
        if (!validPassword) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign(
            { 
                userId: user.id,
                email: user.email 
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                location: user.location,
                interests: user.interests
            }
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: 'Invalid input',
                errors: error
            });
        }

        console.error('Login error:', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};