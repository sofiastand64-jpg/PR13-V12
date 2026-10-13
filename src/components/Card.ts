import type { RenderNode } from '../core/RenderNode';

export function Card(title: string, children: RenderNode[]): RenderNode {
  return {
    kind: 'element',
    tag: 'div',
    styles: {
      backgroundColor: '#f0f8ff',
      padding: 16,
      borderRadius: 8,
      width: 340,
    },
    children: [
      {
        kind: 'text',
        tag: 'h3',
        text: title,
        styles: { fontSize: 18, fontWeight: 'bold', color: '#222' },
      },
      ...children,
    ],
  };
}
