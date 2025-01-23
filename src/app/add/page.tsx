import { db } from '@/db/client';
import { tasks } from '@/db/schema';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

async function createTask(formData: FormData) {
  'use server';

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const dueDate = formData.get('dueDate') as string;

  if (!title || !dueDate) {
    throw new Error('Title and due date are required');
  }

  await db.insert(tasks).values({
    title,
    description,
    dueDate,
  });

  redirect('/');
}

export default function AddTask() {
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
          <h1 className="mb-6 text-2xl font-bold text-gray-900">Create New Task</h1>

          <form action={createTask} className="space-y-6">
            <div>
              <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task description (optional)"
              />
            </div>

            <div>
              <label htmlFor="dueDate" className="mb-1 block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" size="lg">
                Create Task
              </Button>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}