import { serve } from 'https://deno.land/std@0.184.0/http/server.ts';
import { Hono } from 'https://deno.land/x/hono@v3.1.6/mod.ts';
import { cors, logger, prettyJSON } from "https://deno.land/x/hono@v3.1.6/middleware.ts";
import router from './src/routes/router.ts';

const app = new Hono();

// Port
const PORT = Number(Deno.env.get("PORT") ?? 5000);

// Middlewares
app.use('*', logger())
app.use('*', cors());
app.use('*', prettyJSON());

// Router
app.route("/", router);

// 404 Handle
app.get("*", c => c.notFound());

// Serve fetch
serve(app.fetch, {
  port: PORT,
  onListen: function ({ port }) {
    console.log("Listenin on http://localhost:" + port)
  }
})