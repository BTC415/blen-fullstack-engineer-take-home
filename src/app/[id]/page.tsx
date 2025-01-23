import { db } from '@/db/client';
import { tasks } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DeleteTask from './delete-task';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export default async function TaskDetail({ params: { id } }: { params: { id: string } }) {
  const task = await db.query.tasks.findFirst({
    where: eq(tasks.id, parseInt(id)),
  });

  if (!task) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-2xl px-4">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Tasks
        </Link>

        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-8 flex items-start justify-between">
            <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
            <div className="flex gap-3">
              <Link href={`/${id}/edit`}>
                <Button variant="outline">Edit Task</Button>
              </Link>
              <DeleteTask id={task.id} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center text-gray-500">
              <Calendar className="mr-2 h-5 w-5" />
              <span>Due {format(new Date(task.dueDate), 'MMMM d, yyyy')}</span>
            </div>

            {task.description && (
              <div className="border-t border-gray-100 pt-6">
                <h2 className="mb-3 text-sm font-semibold text-gray-900">Description</h2>
                <p className="whitespace-pre-wrap text-gray-600">{task.description}</p>
              </div>
            )}

            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-2 h-4 w-4" />
                <span>Created on {format(new Date(task.createdAt!), 'MMMM d, yyyy')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
