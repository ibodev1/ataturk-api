import { serve } from 'https://deno.land/std@0.184.0/http/server.ts';
import { Hono } from 'https://deno.land/x/hono@v3.1.6/mod.ts';
import { cors, logger, prettyJSON } from "https://deno.land/x/hono@v3.1.6/middleware.ts";
import indexRouter from './src/routes/index.ts';
import quotesRouter from './src/routes/quotes.ts';
import sourcesRouter from './src/routes/sources.ts';

const app = new Hono();

const PORT = Number(Deno.env.get("PORT") ?? 5000);

app.use('*', logger())
app.use('*', cors());
app.use('*', prettyJSON());

app.route('/', indexRouter);
app.route('/quotes', quotesRouter);
app.route('/sources', sourcesRouter);

app.get("*", c => c.notFound());

serve(app.fetch, {
  port: PORT,
  onListen: function ({ port }) {
    console.log("Listenin on http://localhost:" + port)
  }
})