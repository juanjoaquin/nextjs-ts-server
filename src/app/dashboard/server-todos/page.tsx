import prisma from "../../lib/prisma";
import { NewTodo, TodosGrid } from "../../todos";

export const metadata = {
 title: 'Listado Todos',
 description: 'Listado de los todos',
};

export default async function ServerTodosPage() {

    const todos = await prisma.todo.findMany({orderBy: {description: 'asc'}})

  return (
    <div>
      <span className="text-2xl">Server actions</span>

      <div className="w-full px-3 mx-5 mb-5">

      <NewTodo />
      </div>
      
      <TodosGrid todos={todos}/>
    </div>
  );
}