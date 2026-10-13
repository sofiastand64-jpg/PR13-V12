import type { Renderer } from '../core/Renderer';
import type { RenderNode } from '../core/RenderNode';

export class DomRenderer implements Renderer {
  render(node: RenderNode, container: HTMLElement): HTMLElement {
    const el = this.createEl(node);
    container.appendChild(el);
    return el;
  }

  update(handle: HTMLElement, node: RenderNode): void {
    const fresh = this.createEl(node);
    handle.replaceWith(fresh);
  }

  destroy(handle: HTMLElement): void {
    handle.remove();
  }

  private createEl(node: RenderNode): HTMLElement {
    if (node.kind === 'text') {
      return document.createTextNode(node.text ?? '') as unknown as HTMLElement;
    }

    const el = document.createElement(node.tag);

    if (node.styles) {
      const s = node.styles;
      Object.assign(el.style, {
        color: s.color,
        backgroundColor: s.backgroundColor,
        fontSize: s.fontSize ? `${s.fontSize}px` : undefined,
        fontWeight: s.fontWeight,
        padding: s.padding ? `${s.padding}px` : undefined,
        borderRadius: s.borderRadius ? `${s.borderRadius}px` : undefined,
        width: s.width ? `${s.width}px` : undefined,
        height: s.height ? `${s.height}px` : undefined,
      });
    }

    if (node.text) el.textContent = node.text;

    if (node.events) {
      node.events.forEach(e => el.addEventListener(e.type, e.handler));
    }

    if (node.children) {
      node.children.forEach(child => {
        if (typeof child === 'string') {
          el.appendChild(document.createTextNode(child));
        } else {
          el.appendChild(this.createEl(child));
        }
      });
    }

    return el;
  }
}
