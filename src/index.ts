import { RenderBridge } from './core/RenderBridge';
import { DomRenderer } from './renderers/DomRenderer';
import { CanvasRenderer } from './renderers/CanvasRenderer';
import { SvgRenderer } from './renderers/SvgRenderer';
import { Button } from './components/Button';
import { Card } from './components/Card';

// 1. Компоненты описывают себя абстрактно
const card = Card('Добро пожаловать', [
  Button('Кнопка 1', () => alert('Клик 1')),
  Button('Кнопка 2', () => alert('Клик 2')),
]);

// 2. DOM
const domRoot = document.getElementById('dom-root')!;
const domBridge = new RenderBridge(new DomRenderer(), domRoot);
domBridge.render('card', card);

// 3. Canvas
const canvas = document.getElementById('canvas-root') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const canvasBridge = new RenderBridge(new CanvasRenderer(ctx), canvas);
canvasBridge.render('card', card);

// 4. SVG
const svgRoot = document.getElementById('svg-root') as unknown as SVGElement;
const svgBridge = new RenderBridge(new SvgRenderer(), svgRoot);
svgBridge.render('card', card);

// 5. Демонстрация: переключение движка без изменения компонента
console.log('Один и тот же card отрисован в DOM, Canvas и SVG');
console.log('Компонент Button и Card не знают о движках');
