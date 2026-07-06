import { useEffect, useRef } from 'react';
import paper from 'paper';
import {
  bindVisibilityPause,
  rafThrottle,
  setupPaperScope,
} from 'utils/paperCanvas';

export default function Smoothing() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scope = new paper.PaperScope();
    setupPaperScope(scope, canvas);

    const points = 10;
    let width, height, pathHeight;
    let mousePos = scope.view.center.divide(2);
    pathHeight = mousePos.y;

    const path = new scope.Path({ fillColor: '#f45203' });

    function initializePath() {
      const center = scope.view.center;
      width = scope.view.size.width;
      height = scope.view.size.height / 2;
      path.segments = [];
      path.add(scope.view.bounds.bottomLeft);
      for (let i = 1; i < points; i++) {
        path.add(new scope.Point((width / points) * i, center.y));
      }
      path.add(scope.view.bounds.bottomRight);
    }

    initializePath();

    const tool = new scope.Tool();
    tool.onMouseMove = (event) => {
      mousePos = event.point;
    };

    const onFrame = (event) => {
      pathHeight += (scope.view.center.y - mousePos.y - pathHeight) / 10;
      for (let i = 1; i < points; i++) {
        const sinSeed = event.count + (i + (i % 10)) * 100;
        const sinHeight = Math.sin(sinSeed / 200) * pathHeight;
        const yPos = Math.sin(sinSeed / 100) * sinHeight + height;
        path.segments[i].point.y = yPos;
      }
      path.smooth({ type: 'continuous' });
    };

    scope.view.onFrame = onFrame;
    const unbindVisibility = bindVisibilityPause(
      () => onFrame,
      (handler) => {
        scope.view.onFrame = handler;
      },
    );

    return () => {
      unbindVisibility();
      tool.remove();
      scope.view.onFrame = null;
      scope.project.clear();
      scope.remove();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
