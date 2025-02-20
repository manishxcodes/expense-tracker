import { createFileRoute } from '@tanstack/react-router'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"


export const Route = createFileRoute('/expenses')({
  component: Expenses,
})

async function getAllExpenss() {
  const response = await api.expenses.$get();
  if(!response.ok) throw new Error("Server Error")
  const data = await response.json();
  return data;
}

function Expenses() {
  const { isPending, data, isFetching, error } = useQuery({
    queryKey: ['get-all-expenses'], 
    queryFn: getAllExpenss
  });

  if(error) return 'An error occured: ' + error.message;
  
  return (
    <div className="p-2">
      <div className="max-w-2xl px-2 py-4 border border-slate-500 rounded-md md:max-w-3xl m-auto">
        <Table>
        <TableCaption>A list of your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending 
          ? Array(3).fill(0).map((_, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium"><Skeleton className="h-4" /></TableCell>
              <TableCell><Skeleton className="h-4" /></TableCell>
              <TableCell className="text-right"><Skeleton className="h-4" /></TableCell>
            </TableRow>
          ))
          : data?.expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.id}</TableCell>
              <TableCell>{expense.title}</TableCell>
              <TableCell className="text-right">{expense.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    
      </div>
    </div>
  )
}
