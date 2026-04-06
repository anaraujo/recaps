import { useEffect, useRef } from 'react';
import paper from 'paper';

export default function RoundedRectanglesLoader() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scope = new paper.PaperScope();
    scope.setup(canvas);

    let mousePoint = scope.view.center;
    const amount = 25;
    const colors = ['#f45203', '#f0efea', '#ff6b35', '#f0efea'];

    for (let i = 0; i < amount; i++) {
      const rect = new scope.Rectangle([0, 0], [25, 25]);
      rect.center = mousePoint;
      const path = new scope.Path.Rectangle(rect, 6);
      path.fillColor = colors[i % 4];
      const scale = (1 - i / amount) * 20;
      path.scale(scale);
    }

    const tool = new scope.Tool();
    tool.onMouseMove = (event) => {
      mousePoint = event.point;
    };

    const children = scope.project.activeLayer.children;
    scope.view.onFrame = (event) => {
      for (let i = 0; i < children.length; i++) {
        const item = children[i];
        const delta = mousePoint.subtract(item.position).divide(i + 5);
        item.rotate(Math.sin((event.count + i) / 10) * 7);
        if (delta.length > 0.1) item.position = item.position.add(delta);
      }
    };

    return () => {
      tool.remove();
      scope.view.onFrame = null;
      scope.project.clear();
      scope.remove();
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
