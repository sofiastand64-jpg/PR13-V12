import type { RenderNode } from '../core/RenderNode';

export function Button(label: string, onClick: () => void): RenderNode {
  return {
    kind: 'element',
    tag: 'button',
    text: label,
    styles: {
      backgroundColor: '#1db954',
      color: '#fff',
      padding: 8,
      borderRadius: 4,
      fontSize: 14,
      fontWeight: 'bold',
      width: 160,
      height: 40,
    },
    events: [{ type: 'click', handler: onClick }],
  };
}
