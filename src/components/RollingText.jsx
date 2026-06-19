import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default function RollingText({ text, lines = 4, fontSize = '3rem' }) {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);
  const tlRef = useRef(null);
  const lastHoverRef = useRef(0);

  useEffect(() => {
    gsap.set(containerRef.current, { visibility: 'visible' });

    lineRefs.current.length = lines;

    const splitLines = lineRefs.current.map(
      (line) => new SplitText(line, { type: 'chars', charsClass: 'char' }),
    );

    const fontSizePx = parseFloat(
      window.getComputedStyle(lineRefs.current[0]).fontSize,
    );
    const depth = -fontSizePx * 0.694;
    const transformOrigin = `50% 50% ${depth}`;

    gsap.set(lineRefs.current, {
      perspective: 700,
      transformStyle: 'preserve-3d',
    });

    const animTime = 0.9;
    const tl = gsap.timeline();

    splitLines.forEach((split, index) => {
      const isLast = index === splitLines.length - 1;
      tl.fromTo(
        split.chars,
        { rotationX: -90 },
        {
          rotationX: isLast ? 0 : 90,
          stagger: 0.08,
          duration: animTime,
          ease: isLast ? 'power2.out' : 'none',
          transformOrigin,
        },
        index * 0.45,
      );
    });

    tlRef.current = tl;
    lastHoverRef.current = Date.now();

    return () => {
      tl.kill();
      tlRef.current = null;
      splitLines.forEach((split) => split.revert());
    };
  }, [text, lines, fontSize]);

  const handleMouseEnter = () => {
    const tl = tlRef.current;
    if (!tl) return;

    const throttleMs = tl.duration() * 1000;
    const now = Date.now();
    if (now - lastHoverRef.current < throttleMs) return;

    lastHoverRef.current = now;
    tl.restart();
  };

  return (
    <div
      ref={containerRef}
      className="invisible flex w-full items-center justify-center"
      style={{ '--rolling-text-font-size': fontSize }}
    >
      <div
        onMouseEnter={handleMouseEnter}
        className="mb-8 grid font-semibold lowercase italic"
      >
        {Array.from({ length: lines }).map((_, i) => (
          <h1
            key={i}
            ref={(el) => (lineRefs.current[i] = el)}
            className="col-start-1 row-start-1 m-0 text-(length:--rolling-text-font-size) leading-none tracking-[calc(var(--rolling-text-font-size)*-0.033)] whitespace-nowrap [&_div]:backface-hidden"
          >
            {text}
          </h1>
        ))}
      </div>
    </div>
  );
}
