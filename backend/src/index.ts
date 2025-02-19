import { Hono } from "hono";
import { logger } from 'hono/logger'
import { expensesRoute } from "./route/expenses";
import { cors } from "hono/cors";

const app = new Hono();

app.use('*', logger());
app.use('/*', cors())

app.get('/', (c) => {
  return c.json({message: "hello"});
})

app.get('/test', c => {
    return c.json({message: "test route"});
});

const apiRoutes = app.basePath("/api").route("/expenses", expensesRoute);

export default app;
export type ApiRoutes = typeof apiRoutes;

