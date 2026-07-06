import { useEffect, useRef } from 'react';
import paper from 'paper';
import VoronoiLib from 'voronoi';
import { rafThrottle, setupPaperScope } from 'utils/paperCanvas';

export default function Voronoi() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scope = new paper.PaperScope();
    setupPaperScope(scope, canvas);

    const voronoi = new VoronoiLib();
    const spotColor = '#f45203';

    const size = scope.view.size;
    const gridSize = size.divide(200);
    const sites = [];

    for (let i = -1; i < gridSize.width + 1; i++) {
      for (let j = -1; j < gridSize.height + 1; j++) {
        const col = size.divide(gridSize);
        let point = new scope.Point(i, j)
          .divide(gridSize)
          .multiply(size)
          .add(new scope.Point(col.width / 2, col.height / 2));
        if (j % 2)
          point = point.add(new scope.Point(col.width / 2, 0));
        point = point.add(
          new scope.Point(
            (col.width / 4) * (Math.random() - 0.5),
            (col.height / 4) * (Math.random() - 0.5),
          ),
        );
        sites.push(point);
      }
    }

    let bbox;

    function removeSmallBits(path) {
      const min = path.length / 50;
      for (let i = path.segments.length - 1; i >= 0; i--) {
        const segment = path.segments[i];
        const cur = segment.point;
        const nextSeg = segment.next;
        const next = nextSeg.point.add(nextSeg.handleIn);
        if (cur.getDistance(next) < min) segment.remove();
      }
    }

    function createPath(points) {
      const path = new scope.Path({ fillColor: spotColor, closed: true });
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const next = points[(i + 1) % points.length];
        const vector = next.subtract(point).divide(2);
        path.add({
          point: point.add(vector),
          handleIn: vector.negate(),
          handleOut: vector,
        });
      }
      path.scale(0.95);
      removeSmallBits(path);
      return path;
    }

    function renderDiagram() {
      scope.project.activeLayer.removeChildren();
      const diagram = voronoi.compute(sites, bbox);
      if (diagram) {
        for (let i = 0; i < sites.length; i++) {
          const cell = diagram.cells[sites[i].voronoiId];
          if (cell) {
            const halfedges = cell.halfedges;
            if (halfedges.length > 2) {
              const pts = [];
              for (let j = 0; j < halfedges.length; j++) {
                const v = halfedges[j].getEndpoint();
                pts.push(new scope.Point(v));
              }
              createPath(pts);
            }
          }
        }
      }
    }

    function onResize() {
      const margin = 20;
      bbox = {
        xl: margin,
        xr: scope.view.bounds.width - margin,
        yt: margin,
        yb: scope.view.bounds.height - margin,
      };
    }

    onResize();
    renderDiagram();

    const tool = new scope.Tool();
    tool.onMouseMove = rafThrottle((event) => {
      sites[sites.length - 1] = event.point;
      renderDiagram();
    });

    return () => {
      tool.remove();
      scope.project.clear();
      scope.remove();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
