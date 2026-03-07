import { useRef, useCallback } from 'react';

export default function useShineEffect(initialAngle = 135) {
  const ref = useRef(null);
  const currentAngle = useRef(initialAngle);

  const onPointerMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    let target = (Math.atan2(y, x) * 180) / Math.PI;
    target = (target + 90 + 360) % 360;

    // shortest-path angle interpolation (wraps correctly around 0/360)
    let delta = target - currentAngle.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    currentAngle.current += delta * 0.15;
    currentAngle.current = ((currentAngle.current % 360) + 360) % 360;

    el.style.setProperty('--pointer-angle', currentAngle.current.toFixed(2));
  }, []);

  return { ref, onPointerMove };
}
