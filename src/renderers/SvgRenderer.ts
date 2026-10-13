import type { Renderer } from '../core/Renderer';
import type { RenderNode } from '../core/RenderNode';

export class SvgRenderer implements Renderer {
  private NS = 'http://www.w3.org/2000/svg';

  render(node: RenderNode, container: SVGElement): SVGElement {
    const el = this.createEl(node);
    container.appendChild(el);
    return el;
  }

  update(handle: SVGElement, node: RenderNode): void {
    const fresh = this.createEl(node);
    handle.replaceWith(fresh);
  }

  destroy(handle: SVGElement): void {
    handle.remove();
  }

  private createEl(node: RenderNode): SVGElement {
    const tag =
      node.tag === 'button' ? 'rect'
      : node.tag === 'h3' ? 'text'
      : 'g';

    const el = document.createElementNS(this.NS, tag);

    if (node.styles) {
      if (node.styles.backgroundColor && tag === 'rect') {
        el.setAttribute('fill', node.styles.backgroundColor);
      }
      if (node.styles.width && tag === 'rect') {
        el.setAttribute('width', String(node.styles.width));
      }
      if (node.styles.height && tag === 'rect') {
        el.setAttribute('height', String(node.styles.height));
        el.setAttribute('rx', '4');
      }
      if (node.styles.color) {
        el.setAttribute('fill', node.styles.color);
      }
    }

    if (node.text) el.textContent = node.text;

    return el;
  }
}
