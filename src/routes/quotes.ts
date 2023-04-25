import { Hono } from 'https://deno.land/x/hono@v3.1.6/mod.ts'
import getFileContent from '../utils/file.ts';
import { Quote } from '../types/index.ts';

const quotesRouter = new Hono();

quotesRouter.get('/', async (c) => {
    try {
        const quotes = await getFileContent<Quote>("data/quotes.json");
        return c.json(quotes);
    } catch (error) {
        return c.json({
            status: "error",
            message: error?.message ?? error?.toString() ?? undefined,
            responseTime: Date.now()
        }, 500);
    }
});

quotesRouter.get("/:id", async (c) => {
    try {
        const id = c.req.param("id");
        const quotes = await getFileContent<Quote>("data/quotes.json");
        const findedQuotes = quotes.filter((q) => q.id === Number(id));
        return c.json(findedQuotes.length > 1 ? findedQuotes : findedQuotes[0]);
    } catch (error) {
        return c.json({
            status: "error",
            message: error?.message ?? error?.toString() ?? undefined,
            responseTime: Date.now()
        }, 500);
    }
})

export default quotesRouter;