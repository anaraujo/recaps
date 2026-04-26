import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default function RollingText({ text, lines = 4, fontSize = '3rem' }) {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);
  const tlRef = useRef(null);

  useEffect(() => {
    gsap.set(containerRef.current, { visibility: 'visible' });

    lineRefs.current.length = lines;

    const splitLines = lineRefs.current.map(
      (line) => new SplitText(line, { type: 'chars', charsClass: 'char' }),
    );

    // Depth scales with the actual rendered font size so the rotation axis
    // sits behind the letters regardless of how big or small the text is.
    // Ratio matches the original pen: depth ≈ -0.694 × font-size.
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

    return () => {
      tl.kill();
      tlRef.current = null;
      splitLines.forEach((split) => split.revert());
    };
  }, [text, lines, fontSize]);

  const handleMouseEnter = (e) => {
    const tl = tlRef.current;
    if (!tl) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const distances = {
      top: y,
      bottom: rect.height - y,
      left: x,
      right: rect.width - x,
    };
    const closest = Object.entries(distances).reduce((min, curr) =>
      curr[1] < min[1] ? curr : min,
    )[0];

    let fromBelow;
    if (closest === 'top') fromBelow = false;
    else if (closest === 'bottom') fromBelow = true;
    else fromBelow = y > rect.height / 2;

    if (fromBelow) tl.restart();
    else tl.reverse(tl.duration());
  };

  return (
    <div
      ref={containerRef}
      className="invisible flex w-full items-center justify-center"
      style={{ '--rolling-text-font-size': fontSize }}
    >
      <div
        onMouseEnter={handleMouseEnter}
        className="mb-8 grid font-bold uppercase"
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
