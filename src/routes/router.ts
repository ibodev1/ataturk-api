import { Hono } from 'https://deno.land/x/hono@v3.1.6/mod.ts'
import indexRouter from './index.ts';
import quotesRouter from './quotes.ts';
import sourcesRouter from './sources.ts';

const router = new Hono();

// Routes
router.route("/", indexRouter);
router.route('/quotes', quotesRouter);
router.route('/sources', sourcesRouter);

export default router;