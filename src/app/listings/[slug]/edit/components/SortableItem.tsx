import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// interface SortableItemProps {
//     props: string[]
// }

export const SortableItem = (props: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="flex touch-none"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <img
        className="w-24 h-26 touch-none sm:w-28 sm:h-30 md:w-54 md:h-54 lg:w-60 lg:h-62 border-4 border-dashed border-gray-300"
        src={props.id}
      ></img>
    </div>
  );
};

export default SortableItem;
