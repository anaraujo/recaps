import { useEffect, useRef } from 'react';
import paper from 'paper';

export default function FutureSplash() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scope = new paper.PaperScope();
    scope.setup(canvas);

    const values = {
      friction: 0.8,
      timeStep: 0.01,
      amount: 15,
      mass: 2,
    };
    const invMass = 1 / values.mass;
    const mamb = invMass * invMass;

    let springs = [];
    let size = scope.view.size.multiply(new scope.Point(1.2, 1));

    function Spring(a, b, strength, restLength) {
      this.a = a;
      this.b = b;
      this.restLength = restLength || 80;
      this.strength = strength || 0.55;
    }

    Spring.prototype.update = function () {
      const delta = this.b.subtract(this.a);
      const dist = delta.length;
      const normDistStrength =
        ((dist - this.restLength) / (dist * mamb)) * this.strength;
      delta.y *= normDistStrength * invMass * 0.2;
      if (!this.a.fixed) this.a.y += delta.y;
      if (!this.b.fixed) this.b.y -= delta.y;
    };

    function createPath(strength) {
      const path = new scope.Path({ fillColor: '#f45203' });
      springs = [];
      for (let i = 0; i <= values.amount; i++) {
        const segment = path.add(
          new scope.Point(i / values.amount, 0.5).multiply(size),
        );
        const point = segment.point;
        if (i === 0 || i === values.amount) point.y += size.height;
        point.px = point.x;
        point.py = point.y;
        point.fixed = i < 2 || i > values.amount - 2;
        if (i > 0) {
          springs.push(new Spring(segment.previous.point, point, strength));
        }
      }
      path.position.x -= size.width / 4;
      return path;
    }

    size = scope.view.bounds.size.multiply(new scope.Point(2, 1));
    const path = createPath(0.1);

    const tool = new scope.Tool();
    tool.onMouseMove = (event) => {
      const location = path.getNearestLocation(event.point);
      const segment = location.segment;
      const point = segment.point;

      if (!point.fixed && location.distance < size.height / 4) {
        const y = event.point.y;
        point.y += (y - point.y) / 6;
        const prev = segment.previous && segment.previous.point;
        const next = segment.next && segment.next.point;
        if (prev && !prev.fixed) prev.y += (y - prev.y) / 24;
        if (next && !next.fixed) next.y += (y - next.y) / 24;
      }
    };

    scope.view.onFrame = () => {
      const force =
        1 - values.friction * values.timeStep * values.timeStep;
      for (let i = 0; i < path.segments.length; i++) {
        const point = path.segments[i].point;
        const dy = (point.y - point.py) * force;
        point.py = point.y;
        point.y = Math.max(point.y + dy, 0);
      }
      for (let j = 0; j < springs.length; j++) {
        springs[j].update();
      }
      path.smooth({ type: 'continuous' });
    };

    return () => {
      tool.remove();
      scope.view.onFrame = null;
      scope.project.clear();
      scope.remove();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
