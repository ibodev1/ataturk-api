import { Hono } from 'https://deno.land/x/hono@v3.1.6/mod.ts'

const indexRouter = new Hono();

indexRouter.get('/', (c) => {
    return c.notFound();
});

export default indexRouter;