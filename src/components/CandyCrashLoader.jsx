import { useEffect, useRef } from 'react';
import paper from 'paper';

const brandColors = ['#f45203', '#f0efea', '#ff6b35', '#f0efea'];

function Ball(scope, r, p, v) {
  this.radius = r;
  this.point = p;
  this.vector = v;
  this.maxVec = 15;
  this.numSegment = Math.floor(r / 3 + 2);
  this.boundOffset = [];
  this.boundOffsetBuff = [];
  this.sidePoints = [];
  this.path = new scope.Path({
    fillColor: brandColors[Math.floor(Math.random() * brandColors.length)],
    blendMode: 'lighter',
  });

  for (let i = 0; i < this.numSegment; i++) {
    this.boundOffset.push(this.radius);
    this.boundOffsetBuff.push(this.radius);
    this.path.add(new scope.Point());
    this.sidePoints.push(
      new scope.Point({
        angle: (360 / this.numSegment) * i,
        length: 1,
      }),
    );
  }
}

Ball.prototype = {
  iterate(viewSize) {
    this.checkBorders(viewSize);
    if (this.vector.length > this.maxVec) this.vector.length = this.maxVec;
    this.point = this.point.add(this.vector);
    this.updateShape();
  },

  checkBorders(size) {
    if (this.point.x < -this.radius) this.point.x = size.width + this.radius;
    if (this.point.x > size.width + this.radius) this.point.x = -this.radius;
    if (this.point.y < -this.radius) this.point.y = size.height + this.radius;
    if (this.point.y > size.height + this.radius) this.point.y = -this.radius;
  },

  updateShape() {
    const segments = this.path.segments;
    for (let i = 0; i < this.numSegment; i++)
      segments[i].point = this.getSidePoint(i);

    this.path.smooth();
    for (let i = 0; i < this.numSegment; i++) {
      if (this.boundOffset[i] < this.radius / 4)
        this.boundOffset[i] = this.radius / 4;
      const next = (i + 1) % this.numSegment;
      const prev = i > 0 ? i - 1 : this.numSegment - 1;
      let offset = this.boundOffset[i];
      offset += (this.radius - offset) / 15;
      offset +=
        ((this.boundOffset[next] + this.boundOffset[prev]) / 2 - offset) / 3;
      this.boundOffsetBuff[i] = this.boundOffset[i] = offset;
    }
  },

  react(b) {
    const dist = this.point.getDistance(b.point);
    if (dist < this.radius + b.radius && dist !== 0) {
      const overlap = this.radius + b.radius - dist;
      const direc = this.point.subtract(b.point).normalize(overlap * 0.015);
      this.vector = this.vector.add(direc);
      b.vector = b.vector.subtract(direc);
      this.calcBounds(b);
      b.calcBounds(this);
      this.updateBounds();
      b.updateBounds();
    }
  },

  getBoundOffset(b) {
    const diff = this.point.subtract(b);
    const angle = (diff.angle + 180) % 360;
    return this.boundOffset[
      Math.floor((angle / 360) * this.boundOffset.length)
    ];
  },

  calcBounds(b) {
    for (let i = 0; i < this.numSegment; i++) {
      const tp = this.getSidePoint(i);
      const bLen = b.getBoundOffset(tp);
      const td = tp.getDistance(b.point);
      if (td < bLen) {
        this.boundOffsetBuff[i] -= (bLen - td) / 2;
      }
    }
  },

  getSidePoint(index) {
    return this.point.add(
      this.sidePoints[index].multiply(this.boundOffset[index]),
    );
  },

  updateBounds() {
    for (let i = 0; i < this.numSegment; i++)
      this.boundOffset[i] = this.boundOffsetBuff[i];
  },
};

export default function CandyCrashLoader() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scope = new paper.PaperScope();
    scope.setup(canvas);

    const balls = [];
    const numBalls = 18;
    for (let i = 0; i < numBalls; i++) {
      const position = scope.Point.random().multiply(scope.view.size);
      const vector = new scope.Point({
        angle: 360 * Math.random(),
        length: Math.random() * 10,
      });
      const radius = Math.random() * 60 + 60;
      balls.push(new Ball(scope, radius, position, vector));
    }

    scope.view.onFrame = () => {
      for (let i = 0; i < balls.length - 1; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          balls[i].react(balls[j]);
        }
      }
      for (let i = 0; i < balls.length; i++) {
        balls[i].iterate(scope.view.size);
      }
    };

    return () => {
      scope.view.onFrame = null;
      scope.project.clear();
      scope.remove();
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
