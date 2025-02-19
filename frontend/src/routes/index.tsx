import { createFileRoute } from '@tanstack/react-router'
import { 
  Card, 
  CardHeader,
  CardTitle,
  CardDescription, 
  CardContent
} from "../components/ui/card"
import { api } from "../lib/api"
import { useQuery } from "@tanstack/react-query"

export const Route = createFileRoute('/')({
  component: App,
})


async function getTotalSpent() {
  const response = await api.expenses["total-spent"].$get();
  if(!response.ok) throw new Error("Server Error")
  const data = await response.json();
  return data;
}

function App() {
  const { isPending, data, isFetching, error } = useQuery({queryKey: ['get-total-spent'], queryFn: getTotalSpent});

  if(error) return 'An error occured: ' + error.message;

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent.</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? "..." : data.total}</CardContent>
    </Card>
  )
}
