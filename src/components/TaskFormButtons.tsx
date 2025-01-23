'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function TaskFormButtons() {
  const router = useRouter();

  return (
    <div className="flex gap-4">
      <Button type="submit">Save Task</Button>
      <Button variant="outline" onClick={() => router.back()}>
        Cancel
      </Button>
    </div>
  );
}
