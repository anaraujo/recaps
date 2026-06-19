import { useCallback, useRef } from 'react';

export default function useDraggableDialog() {
  const dialogRef = useRef(null);

  const centerDialog = useCallback(() => {
    requestAnimationFrame(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      const rect = dialog.getBoundingClientRect();
      dialog.style.margin = '0';
      dialog.style.left = `${(window.innerWidth - rect.width) / 2}px`;
      dialog.style.top = `${(window.innerHeight - rect.height) / 2}px`;
    });
  }, []);

  const onDragHandlePointerDown = useCallback((e) => {
    if (e.button !== 0) return;

    e.preventDefault();
    e.stopPropagation();

    const dialog = dialogRef.current;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    dialog.style.margin = '0';
    dialog.style.left = `${rect.left}px`;
    dialog.style.top = `${rect.top}px`;

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const handle = e.currentTarget;

    handle.setPointerCapture(e.pointerId);

    const onPointerMove = (moveEvent) => {
      dialog.style.left = `${moveEvent.clientX - offsetX}px`;
      dialog.style.top = `${moveEvent.clientY - offsetY}px`;
    };

    const endDrag = () => {
      handle.removeEventListener('pointermove', onPointerMove);
      handle.removeEventListener('pointerup', endDrag);
      handle.removeEventListener('pointercancel', endDrag);
    };

    handle.addEventListener('pointermove', onPointerMove);
    handle.addEventListener('pointerup', endDrag);
    handle.addEventListener('pointercancel', endDrag);
  }, []);

  return { dialogRef, centerDialog, onDragHandlePointerDown };
}
