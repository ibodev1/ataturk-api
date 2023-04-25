import { serve } from 'https://deno.land/std@0.184.0/http/server.ts'
import { Hono } from 'https://deno.land/x/hono@v3.1.6/mod.ts'

const app = new Hono();

const PORT = Number(Deno.env.get("PORT") ?? 5000);

app.get('/', (c) => {
  return c.notFound();
});

app.get("*", c => c.notFound());

serve(app.fetch, {
  port: PORT,
  onListen: function ({ port }) {
    console.log("Listenin on http://localhost:" + port)
  }
})