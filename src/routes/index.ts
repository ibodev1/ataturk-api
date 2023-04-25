import { Hono } from 'https://deno.land/x/hono@v3.1.6/mod.ts'
import getFileContent from '../utils/file.ts';
import { Quote, Source } from '../types/index.ts';

const indexRouter = new Hono();

indexRouter.get('/', async (c) => {
    try {
        const quotes = await getFileContent<Quote>("data/quotes.json");
        const sources = await getFileContent<Source>("data/sources.json");
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        const findedSources = sources.filter(s => s.id && randomQuote.source_ids?.includes(s.id.toString()));
        const responseQuote = {
            ...randomQuote,
            sources: findedSources.length > 0 ? findedSources : undefined
        }
        return c.json(responseQuote);
    } catch (error) {
        return c.json({
            status: "error",
            message: error?.message ?? error?.toString() ?? undefined,
            responseTime: Date.now()
        }, 500);
    }
});

export default indexRouter;