import { Hono } from 'https://deno.land/x/hono@v3.1.6/mod.ts'
import getFileContent from '../utils/file.ts';
import { Source } from '../types/index.ts';

const sourcesRouter = new Hono();

sourcesRouter.get('/', async (c) => {
    try {
        const sources = await getFileContent<Source>("data/sources.json");
        return c.json(sources);
    } catch (error) {
        return c.json({
            status: "error",
            message: error?.message ?? error?.toString() ?? undefined,
            responseTime: Date.now()
        }, 500);
    }
});

sourcesRouter.get("/:id", async (c) => {
    try {
        const ids = c.req.param("id").split(",");
        const sources = await getFileContent<Source>("data/sources.json");
        const findedSources = sources.filter(s => s.id && ids.includes(s.id.toString()));
        return c.json(findedSources)
    } catch (error) {
        return c.json({
            status: "error",
            message: error?.message ?? error?.toString() ?? undefined,
            responseTime: Date.now()
        }, 500);
    }
})

export default sourcesRouter;