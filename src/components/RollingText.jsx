import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default function RollingText({ text, lines = 4, fontSize = '3rem' }) {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);
  const playRef = useRef(() => {});

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
    let currentAnim = null;

    const mountTl = gsap.timeline();
    splitLines.forEach((split, index) => {
      const isLast = index === splitLines.length - 1;
      mountTl.fromTo(
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
    currentAnim = mountTl;

    playRef.current = () => {
      currentAnim?.kill();
      const last = splitLines[splitLines.length - 1];
      currentAnim = gsap.fromTo(
        last.chars,
        { rotationX: 0 },
        {
          rotationX: 360,
          stagger: 0.08,
          duration: animTime,
          ease: 'none',
          transformOrigin,
        },
      );
    };

    return () => {
      currentAnim?.kill();
      playRef.current = () => {};
      splitLines.forEach((split) => split.revert());
    };
  }, [text, lines, fontSize]);

  const handleMouseEnter = () => {
    playRef.current();
  };

  return (
    <div
      ref={containerRef}
      className="invisible flex w-full items-center justify-center"
      style={{ '--rolling-text-font-size': fontSize }}
    >
      <div
        onMouseEnter={handleMouseEnter}
        className="relative my-8 h-[calc(var(--rolling-text-font-size)*1.333)] w-full text-center text-5xl font-bold tracking-widest uppercase"
      >
        {Array.from({ length: lines }).map((_, i) => (
          <h1
            key={i}
            ref={(el) => (lineRefs.current[i] = el)}
            className="absolute top-1/2 left-1/2 m-0 -translate-x-1/2 -translate-y-1/2 text-center text-(length:--rolling-text-font-size) leading-none tracking-[calc(var(--rolling-text-font-size)*-0.033)] whitespace-nowrap [&_div]:backface-hidden"
          >
            {text}
          </h1>
        ))}
      </div>
    </div>
  );
}
