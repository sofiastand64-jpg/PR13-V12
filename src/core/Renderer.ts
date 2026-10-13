import type { RenderNode } from './RenderNode';

export interface Renderer {
  render(node: RenderNode, container: unknown): unknown;
  update(handle: unknown, node: RenderNode): void;
  destroy(handle: unknown): void;
}
