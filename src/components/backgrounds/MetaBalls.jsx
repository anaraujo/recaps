import { useEffect, useRef } from 'react';
import paper from 'paper';
import { rafThrottle, setupPaperScope } from 'utils/paperCanvas';

export default function MetaBalls() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scope = new paper.PaperScope();
    setupPaperScope(scope, canvas);

    scope.project.currentStyle = { fillColor: '#f45203' };

    const handleLenRate = 2.4;
    const circlePaths = [];
    const size = scope.view.size;

    const positions = [];
    for (let i = 0; i < 12; i++) {
      positions.push([
        Math.random() * size.width,
        Math.random() * size.height,
      ]);
    }

    for (let i = 0; i < positions.length; i++) {
      circlePaths.push(
        new scope.Path.Circle({ center: positions[i], radius: 50 }),
      );
    }

    const largeCircle = new scope.Path.Circle({
      center: scope.view.center,
      radius: 100,
    });
    circlePaths.push(largeCircle);

    const connections = new scope.Group();

    function getVector(radians, length) {
      return new scope.Point({
        angle: (radians * 180) / Math.PI,
        length,
      });
    }

    function metaball(ball1, ball2, v, hRate, maxDist) {
      const center1 = ball1.position;
      const center2 = ball2.position;
      let radius1 = ball1.bounds.width / 2;
      let radius2 = ball2.bounds.width / 2;
      const pi2 = Math.PI / 2;
      const d = center1.getDistance(center2);

      if (radius1 === 0 || radius2 === 0) return;
      if (d > maxDist || d <= Math.abs(radius1 - radius2)) return;

      let u1, u2;
      if (d < radius1 + radius2) {
        u1 = Math.acos(
          (radius1 * radius1 + d * d - radius2 * radius2) / (2 * radius1 * d),
        );
        u2 = Math.acos(
          (radius2 * radius2 + d * d - radius1 * radius1) / (2 * radius2 * d),
        );
      } else {
        u1 = 0;
        u2 = 0;
      }

      const angle1 = center2.subtract(center1).angleInRadians;
      const angle2 = Math.acos((radius1 - radius2) / d);
      const angle1a = angle1 + u1 + (angle2 - u1) * v;
      const angle1b = angle1 - u1 - (angle2 - u1) * v;
      const angle2a = angle1 + Math.PI - u2 - (Math.PI - u2 - angle2) * v;
      const angle2b = angle1 - Math.PI + u2 + (Math.PI - u2 - angle2) * v;
      const p1a = center1.add(getVector(angle1a, radius1));
      const p1b = center1.add(getVector(angle1b, radius1));
      const p2a = center2.add(getVector(angle2a, radius2));
      const p2b = center2.add(getVector(angle2b, radius2));

      const totalRadius = radius1 + radius2;
      let d2 = Math.min(v * hRate, p1a.subtract(p2a).length / totalRadius);
      d2 *= Math.min(1, (d * 2) / (radius1 + radius2));
      radius1 *= d2;
      radius2 *= d2;

      const path = new scope.Path({
        segments: [p1a, p2a, p2b, p1b],
        style: ball1.style,
        closed: true,
      });
      const segs = path.segments;
      segs[0].handleOut = getVector(angle1a - pi2, radius1);
      segs[1].handleIn = getVector(angle2a + pi2, radius2);
      segs[2].handleOut = getVector(angle2b - pi2, radius2);
      segs[3].handleIn = getVector(angle1b + pi2, radius1);
      return path;
    }

    function generateConnections(paths) {
      connections.removeChildren();
      for (let i = 0; i < paths.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
          const p = metaball(paths[i], paths[j], 0.5, handleLenRate, 300);
          if (p) connections.addChild(p);
        }
      }
    }

    generateConnections(circlePaths);

    const tool = new scope.Tool();
    tool.onMouseMove = rafThrottle((event) => {
      largeCircle.position = event.point;
      generateConnections(circlePaths);
    });

    return () => {
      tool.remove();
      scope.project.clear();
      scope.remove();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
