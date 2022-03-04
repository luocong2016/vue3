import { inBrowser } from './validate';

export const supportsPassive = true;

export function raf(fn: FrameRequestCallback): number {
  return inBrowser ? requestAnimationFrame(fn) : -1;
}

export function cacelRaf(id: number) {
  if (inBrowser) {
    cancelAnimationFrame(id);
  }
}

