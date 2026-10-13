import type { RenderStyles, RenderEvent, RenderChild } from './types';

export interface RenderNode {
  kind: 'element' | 'text' | 'group';
  tag: string;
  styles?: RenderStyles;
  text?: string;
  children?: RenderChild[];
  events?: RenderEvent[];
}
