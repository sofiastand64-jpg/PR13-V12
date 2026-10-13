export interface RenderStyles {
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  padding?: number;
  borderRadius?: number;
  width?: number;
  height?: number;
}

export interface RenderEvent {
  type: 'click' | 'input' | 'hover';
  handler: () => void;
}

export type RenderChild = string | RenderNode;

import type { RenderNode } from './RenderNode';
