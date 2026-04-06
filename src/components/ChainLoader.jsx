import { useEffect, useRef } from 'react';
import paper from 'paper';

export default function ChainLoader() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scope = new paper.PaperScope();
    scope.setup(canvas);

    const points = 25;
    const length = 35;

    const path = new scope.Path({
      strokeColor: '#f45203',
      strokeWidth: 20,
      strokeCap: 'round',
    });

    const start = scope.view.center;
    for (let i = 0; i < points; i++) {
      path.add(new scope.Point(start.x + i * length, start.y));
    }

    const tool = new scope.Tool();

    tool.onMouseMove = (event) => {
      path.firstSegment.point = event.point;

      for (let i = 0; i < points - 1; i++) {
        const segment = path.segments[i];
        const nextSegment = segment.next;
        const vector = segment.point.subtract(nextSegment.point);
        vector.length = length;
        nextSegment.point = segment.point.subtract(vector);
      }

      path.smooth({ type: 'continuous' });
    };

    return () => {
      tool.remove();
      scope.project.clear();
      scope.remove();
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
