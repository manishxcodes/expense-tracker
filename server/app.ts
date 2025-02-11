import { Hono } from "hono";
import { logger } from 'hono/logger'
import { expensesRoute } from "./route/expenses";

const app = new Hono();

app.use('*', logger());

app.get('/test', c => {
    return c.json({message: "test route"});
});

app.route("/api/expenses", expensesRoute);

export default app;