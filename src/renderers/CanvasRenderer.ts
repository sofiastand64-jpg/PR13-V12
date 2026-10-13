import type { Renderer } from '../core/Renderer';
import type { RenderNode } from '../core/RenderNode';

export class CanvasRenderer implements Renderer {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  render(node: RenderNode, _container: unknown): { node: RenderNode; x: number; y: number } {
    const handle = { node, x: 10, y: 10 };
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.draw(node, handle.x, handle.y);
    return handle;
  }

  update(handle: { node: RenderNode; x: number; y: number }, node: RenderNode): void {
    handle.node = node;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.draw(node, handle.x, handle.y);
  }

  destroy(_handle: unknown): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  private draw(node: RenderNode, x: number, y: number): void {
    const ctx = this.ctx;

    if (node.styles?.backgroundColor) {
      ctx.fillStyle = node.styles.backgroundColor;
      ctx.fillRect(x, y, node.styles.width ?? 200, node.styles.height ?? 40);
    }

    if (node.kind === 'text' || node.text) {
      ctx.fillStyle = node.styles?.color ?? '#000';
      ctx.font = `${node.styles?.fontSize ?? 14}px sans-serif`;
      ctx.fillText(node.text ?? '', x + 5, y + 20);
    }

    if (node.children) {
      let cy = y + 50;
      node.children.forEach(child => {
        if (typeof child !== 'string') {
          this.draw(child, x, cy);
          cy += 40;
        }
      });
    }
  }
}
