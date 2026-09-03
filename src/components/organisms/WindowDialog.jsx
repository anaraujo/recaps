import { useEffect, useRef, useState } from 'react';
import { motion, useDragControls, useMotionValue } from 'motion/react';
import WindowItem from 'components/molecules/WindowItem';

export default function WindowDialog({
  dialogId,
  title,
  name,
  src,
  isOpen,
  onClose,
}) {
  const dialogRef = useRef(null);
  const windowRef = useRef(null);
  const dragControls = useDragControls();
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const [dragConstraints, setDragConstraints] = useState(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    const windowEl = windowRef.current;
    if (!dialog || !windowEl) return;

    const drect = dialog.getBoundingClientRect();
    const wrect = windowEl.getBoundingClientRect();
    const footer = document.querySelector('footer');
    const footerTop = footer
      ? footer.getBoundingClientRect().top
      : drect.bottom;

    setDragConstraints({
      left: drect.left - wrect.left,
      right: drect.right - wrect.right,
      top: drect.top - wrect.top,
      bottom: footerTop - wrect.bottom,
    });
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-0 flex h-screen max-h-none w-screen max-w-none items-center justify-center bg-transparent p-0"
      id={dialogId}
      closedby="any"
      onClose={onClose}
    >
      <motion.div
        ref={windowRef}
        drag
        dragListener={false}
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={dragConstraints}
        style={{ x: dragX, y: dragY }}
      >
        <WindowItem
          dialogId={dialogId}
          title={title}
          name={name}
          src={src}
          isOpen={isOpen}
          onClose={onClose}
          onDragHandlePointerDown={(e) => dragControls.start(e)}
        />
      </motion.div>
    </dialog>
  );
}
