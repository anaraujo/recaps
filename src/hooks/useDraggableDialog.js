import { useCallback, useRef } from 'react';

export default function useDraggableDialog() {
  const dialogRef = useRef(null);

  const resetDialogPosition = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.style.left = '';
    dialog.style.top = '';
    dialog.style.transform = '';
    dialog.style.margin = '';
  }, []);

  const onDragHandlePointerDown = useCallback((e) => {
    if (e.button !== 0) return;

    e.preventDefault();
    e.stopPropagation();

    const dialog = dialogRef.current;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    dialog.style.margin = '0';
    dialog.style.transform = 'none';
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

  return { dialogRef, resetDialogPosition, onDragHandlePointerDown };
}
