// @ts-nocheck
import { Router } from 'express';
import {
    categoryHandlers,
    userHandlers,
    newsHandlers,
    userInterestsHandlers,
    userBookmarksHandlers,
    newsCategoriesHandlers,
} from '../handlers/handlers';
import { loginHandler } from '../handlers/auth.handler';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

// Category routes
router.post('/categories', categoryHandlers.create);
router.get('/categories', categoryHandlers.getAll);
router.get('/categories/:id', categoryHandlers.getOne);
router.put('/categories/:id', categoryHandlers.update);
router.delete('/categories/:id', categoryHandlers.delete);

// User routes
router.post('/users', userHandlers.create);
router.get('/users', userHandlers.getAll);
router.get('/users/:id', userHandlers.getOne);
router.put('/users/:id', userHandlers.update);
router.delete('/users/:id', userHandlers.delete);

// News routes
router.post('/news', newsHandlers.create);
router.get('/news', newsHandlers.getAll);
router.get('/news/:id', newsHandlers.getOne);
router.put('/news/:id', newsHandlers.update);
router.delete('/news/:id', newsHandlers.delete);

// User Interests routes
router.post('/user-interests', userInterestsHandlers.create);
router.get('/user-interests/:userId', userInterestsHandlers.getByUser);
router.delete('/user-interests/:userId/:categoryId', userInterestsHandlers.delete);

// User Bookmarks routes
router.post('/user-bookmarks', userBookmarksHandlers.create);
router.get('/user-bookmarks/:userId', userBookmarksHandlers.getByUser);
router.delete('/user-bookmarks/:userId/:newsId', userBookmarksHandlers.delete);

// News Categories routes
router.post('/news-categories', newsCategoriesHandlers.create);
router.get('/news-categories/:newsId', newsCategoriesHandlers.getByNews);
router.delete('/news-categories/:newsId/:categoryId', newsCategoriesHandlers.delete);

router.post('/login', loginHandler);

export default router;