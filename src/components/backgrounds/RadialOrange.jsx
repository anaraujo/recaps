import { useEffect, useRef } from 'react';
import paper from 'paper';

export default function RadialOrange() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scope = new paper.PaperScope();
    scope.setup(canvas);

    let point = scope.view.center;

    const stops = 60;
    const cycles = 4;
    const hue = 20;
    const colors = [];
    for (let i = 0; i < stops; i++) {
      const t = (i / stops) * cycles * Math.PI * 2;
      const fade = 1 - (i / stops) * 0.6;
      const brightness = (0.5 + 0.5 * Math.cos(t)) * fade;
      colors.push({ hue, saturation: 1, brightness });
    }

    let radius =
      Math.max(scope.view.size.width, scope.view.size.height) * 0.75;

    const path = new scope.Path.Rectangle({
      rectangle: scope.view.bounds,
      fillColor: {
        origin: point,
        destination: point.add([radius, 0]),
        gradient: { stops: colors, radial: true },
      },
    });

    const color = path.fillColor;
    const gradient = color.gradient;
    let mouseDown = false;
    let mousePoint = scope.view.center;
    let grow = false;
    const vector = new scope.Point(150, 0);
    let phase = 0;

    const tool = new scope.Tool();
    tool.onMouseDown = (event) => {
      mouseDown = true;
      mousePoint = event.point;
    };
    tool.onMouseDrag = (event) => {
      mousePoint = event.point;
    };
    tool.onMouseUp = () => {
      vector.length = 10;
      mouseDown = false;
    };

    scope.view.onFrame = () => {
      phase += 0.08;
      for (let i = 0; i < gradient.stops.length; i++) {
        const t = (i / stops) * cycles * Math.PI * 2 + phase;
        const fade = 1 - (i / stops) * 0.6;
        gradient.stops[i].color.brightness =
          (0.5 + 0.5 * Math.cos(t)) * fade;
      }
      if (grow && vector.length > 300) grow = false;
      else if (!grow && vector.length < 75) grow = true;
      if (mouseDown) {
        point = point.add(mousePoint.subtract(point).divide(10));
      } else {
        vector.length += grow ? 1 : -1;
        vector.angle += 5;
      }
      color.highlight = mouseDown ? point : point.add(vector);
    };

    scope.view.onResize = () => {
      point = scope.view.center;
      path.bounds = scope.view.bounds;
      const c = path.fillColor;
      c.origin = point;
      radius =
        Math.max(scope.view.size.width, scope.view.size.height) * 0.75;
      c.destination = point.add([radius, 0]);
    };

    return () => {
      tool.remove();
      scope.view.onFrame = null;
      scope.view.onResize = null;
      scope.project.clear();
      scope.remove();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
