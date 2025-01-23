import { db } from '@/db/client';
import { tasks } from '@/db/schema';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { PlusCircle } from 'lucide-react';

export default async function TaskList() {
  const taskList = await db.select().from(tasks).all();

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
            <p className="mt-1 text-gray-500">Manage your tasks and stay organized</p>
          </div>
          <Link href="/add">
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              New Task
            </Button>
          </Link>
        </div>

        {taskList.length === 0 ? (
          <div className="rounded-lg border border-gray-100 bg-white py-12 text-center shadow-sm">
            <h3 className="mb-2 text-lg font-medium text-gray-900">No tasks yet</h3>
            <p className="mb-4 text-gray-500">Get started by creating your first task</p>
            <Link href="/add">
              <Button>Create Task</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {taskList.map((task) => (
              <Link
                key={task.id}
                href={`/${task.id}`}
                className="block transform rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="mb-1 text-xl font-semibold text-gray-900">{task.title}</h2>
                      {task.description && (
                        <p className="line-clamp-2 text-gray-600">{task.description}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-gray-900">
                        Due {format(new Date(task.dueDate), 'MMM d, yyyy')}
                      </span>
                      <span className="mt-1 text-xs text-gray-500">
                        Created {format(new Date(task.createdAt!), 'MMM d')}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
