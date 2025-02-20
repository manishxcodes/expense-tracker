import { createFileRoute } from '@tanstack/react-router'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { useForm } from '@tanstack/react-form'
import type { FieldApi } from '@tanstack/react-form'

export const Route = createFileRoute('/create-expense')({
  component: CreateExpense,
})

function CreateExpense() {
  const form = useForm({
    defaultValues: {
      title: '',
      amount: 0
    },
    onSubmit: async ({value})=>  {
      console.log(value);
    }
  })

  return (
    <div className="p-4 ">
      <h2 className='font-bold text-3xl text-center my-4'>Create Expenses</h2>
      <form className="w-96 m-auto" 
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}>
      <form.Field
            name="title"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'A title is required'
                  : value.length < 3
                    ? 'title must be at least 3 characters'
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                return (
                  value.includes('error') && 'No "error" allowed in title'
                )
              },
            }}
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <Label htmlFor={field.name}>Title</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                    {field.state.meta.isTouched && field.state.meta.errors.length 
                    ? (
                      <div className="text-red-500 text-sm mt-1">{field.state.meta.errors.join(',')}</div>
                    ) 
                    : null}
                </>
              )
            }}
          />
      <form.Field
            name="amount"
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <Label htmlFor={field.name}>Value</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "") {
                        field.handleChange(0); 
                      } else if (!isNaN(Number(val))) {
                        field.handleChange(Number(val)); // Convert to number only if valid
                      }
                    }}
                  />
                    {field.state.meta.isTouched && field.state.meta.errors.length 
                    ? (
                      <div className="text-red-500 text-sm mt-1">{field.state.meta.errors.join(',')}</div>
                    ) 
                    : null}
                </>
              )
            }}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <>
                <Button className='w-full mt-4' type="submit" disabled={!canSubmit}>
                  {isSubmitting ? '...' : 'Submit'}
                </Button>
              </>
            )}
          />
      </form>
    </div>
  )
}
