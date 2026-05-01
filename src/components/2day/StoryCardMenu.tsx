'use client';

import { Heart, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SaveButtonProps {
  storyId: number;
  isSaved: boolean;
  onToggleSave: (id: number) => void;
  className?: string;
}

export function SaveButton({ storyId, isSaved, onToggleSave, className }: SaveButtonProps) {
  return (
    <button
      className={cn(
        'h-8 w-8 rounded-full flex items-center justify-center transition-all',
        isSaved ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-red-500',
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleSave(storyId);
      }}
      aria-label={isSaved ? 'Quitar de guardados' : 'Guardar historia'}
    >
      <Heart className={cn('h-4 w-4', isSaved && 'fill-current')} />
    </button>
  );
}

interface ShareButtonProps {
  storyId: number;
  className?: string;
}

export function ShareButton({ storyId, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      className={cn(
        'h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all',
        copied && 'text-green-600 hover:text-green-600',
        className
      )}
      onClick={handleShare}
      aria-label="Compartir"
    >
      <Upload className="h-4 w-4" />
    </button>
  );
}
