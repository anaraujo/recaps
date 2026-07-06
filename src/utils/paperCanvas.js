export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getCappedPixelRatio(max = 1.5) {
  const dpr = window.devicePixelRatio || 1;
  if (window.innerWidth < 768) return Math.min(dpr, max);
  return dpr;
}

export function setupPaperScope(scope, canvas) {
  scope.setup(canvas);
  const ratio = getCappedPixelRatio();
  const dpr = window.devicePixelRatio || 1;
  if (ratio >= dpr) return;

  const size = scope.view.viewSize;
  canvas.width = Math.floor(size.width * ratio);
  canvas.height = Math.floor(size.height * ratio);
  scope.view.viewSize = size;
}

export function rafThrottle(fn) {
  let rafId = null;
  let latestArgs = null;
  return (...args) => {
    latestArgs = args;
    if (rafId !== null) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      fn(...latestArgs);
    });
  };
}

export function bindVisibilityPause(getFrame, setFrame) {
  const onVisibilityChange = () => {
    if (document.hidden) {
      setFrame(null);
    } else {
      setFrame(getFrame());
    }
  };
  document.addEventListener('visibilitychange', onVisibilityChange);
  return () =>
    document.removeEventListener('visibilitychange', onVisibilityChange);
}
