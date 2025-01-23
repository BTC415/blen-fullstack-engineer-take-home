'use client';

import { Button } from '@/components/ui/button';

export function CancelButton() {
  return (
    <Button variant="outline" onClick={() => history.back()}>
      Cancel
    </Button>
  );
}
