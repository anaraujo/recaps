import { useEffect } from 'react';
import useDraggableDialog from 'hooks/useDraggableDialog';
import NewsItem from './NewsItem';

export default function NewsDialog({
  dialogId,
  title,
  name,
  src,
  isOpen,
  onClose,
}) {
  const { dialogRef, resetDialogPosition, onDragHandlePointerDown } =
    useDraggableDialog();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      if (dialog?.open) dialog.close();
    };
  }, [dialogRef]);

  return (
    <dialog
      ref={dialogRef}
      className="border-brand-gray fixed top-1/2 left-1/2 m-0 -translate-x-1/2 -translate-y-1/2 rounded-tl-lg rounded-br-lg border border-solid backdrop:bg-gray-900/50"
      id={dialogId}
      closedby="any"
      onClose={onClose}
      onToggle={(e) => {
        if (e.newState === 'closed') resetDialogPosition();
      }}
    >
      <NewsItem
        dialogId={dialogId}
        title={title}
        name={name}
        src={src}
        isOpen={isOpen}
        onClose={onClose}
        onDragHandlePointerDown={onDragHandlePointerDown}
      />
    </dialog>
  );
}
