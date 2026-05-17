'use client';

import { useLenis } from '@/hooks/useLenis';
import type { PropsWithChildren } from 'react';

export function SmoothScrollProvider({ children }: PropsWithChildren) {
  useLenis();
  return <>{children}</>;
}
