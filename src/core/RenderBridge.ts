import type { Renderer } from './Renderer';
import type { RenderNode } from './RenderNode';

export class RenderBridge {
  private renderer: Renderer;
  private handles = new Map<string, unknown>();
  private container: unknown;

  constructor(renderer: Renderer, container: unknown) {
    this.renderer = renderer;
    this.container = container;
  }

  setRenderer(renderer: Renderer): void {
    this.renderer = renderer;
  }

  render(id: string, node: RenderNode): void {
    const existing = this.handles.get(id);
    if (existing) {
      this.renderer.update(existing, node);
    } else {
      const handle = this.renderer.render(node, this.container);
      this.handles.set(id, handle);
    }
  }

  destroy(id: string): void {
    const handle = this.handles.get(id);
    if (handle) {
      this.renderer.destroy(handle);
      this.handles.delete(id);
    }
  }
}
