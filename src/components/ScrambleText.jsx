import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrambleTextPlugin);

export default function ScrambleText({
  text,
  chars = 'upperAndLowerCase',
  duration = 4.2,
}) {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        scrambleText: {
          text,
          chars,
          revealDelay: 0.2,
          tweenLength: true,
        },
        ease: 'power2.inOut',
        duration,
      },
    );

    return () => {
      tween.kill();
    };
  }, [text, chars, duration]);

  return (
    <h1
      ref={textRef}
      className="my-8 text-center text-5xl font-bold tracking-widest uppercase"
    >
      {text}
    </h1>
  );
}
