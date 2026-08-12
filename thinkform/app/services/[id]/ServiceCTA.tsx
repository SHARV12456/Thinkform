'use client';

import { Button } from '@/components/ui/Button';

interface ServiceCTAProps {
  title: string;
}

export function ServiceCTA({ title }: ServiceCTAProps) {
  return (
    <Button 
      href={`/book?plan=${encodeURIComponent(title)}`} 
      variant="primary" 
      className="px-10 py-4 text-lg"
    >
      Request a Session
    </Button>
  );
}
