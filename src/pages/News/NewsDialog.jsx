import useDraggableDialog from 'hooks/useDraggableDialog';
import NewsItem from './NewsItem';

export default function NewsDialog({
  dialogId,
  title,
  name,
  src,
  onClose,
}) {
  const { dialogRef, centerDialog, onDragHandlePointerDown } =
    useDraggableDialog();

  return (
    <dialog
      ref={dialogRef}
      className="border-brand-gray fixed m-0 rounded-tl-lg rounded-br-lg border border-solid backdrop:bg-gray-900/50"
      id={dialogId}
      closedby="any"
      onClose={onClose}
      onToggle={(e) => {
        if (e.newState === 'open') centerDialog();
      }}
    >
      <NewsItem
        dialogId={dialogId}
        title={title}
        name={name}
        src={src}
        onClose={onClose}
        onDragHandlePointerDown={onDragHandlePointerDown}
      />
    </dialog>
  );
}
