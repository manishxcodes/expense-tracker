import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

type Expense = z.infer<typeof expenseSchema>;

const expenseSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(3).max(15),
    amount: z.number().positive()
})

const createPostSchema = expenseSchema.omit({id: true});

const fakeExpenses: Expense[] = [
    {id: 1, title: 'groceries', amount: 490},
    {id: 2, title: 'food', amount: 500},
    {id: 3, title: 'clothes', amount: 3000},
];

export const expensesRoute = new Hono()
.get('/', (c) => {
    return c.json({expenses: fakeExpenses});
})
.post('/', zValidator("json", createPostSchema), async (c) => {
    const data = await c.req.valid("json");
    const expense = createPostSchema.safeParse(data);
    console.log(data);
    fakeExpenses.push({id: fakeExpenses.length, ...data});
    return c.json({data, fakeExpenses});
})
.get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const expense = fakeExpenses.find(expense => expense.id === id);
    if(!expense) {
        return c.notFound();
    }

    return c.json({expense: expense});
})
.delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const index = fakeExpenses.findIndex(expense => expense.id === id);
    if (index === -1) return c.notFound();

    const deleteExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({
        expense: deleteExpense,
        expenses: fakeExpenses
    });
});