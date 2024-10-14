const Sidebar = ({ onDragStart }: any) => {
  return (
    <aside className="border-r border-gray-200 p-4 bg-gray-50 w-64">
      <div className="text-sm text-gray-600 mb-4">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className=" border border-gray-1 p-2 mb-2 rounded cursor-move"
        onDragStart={(event) => onDragStart(event, "topic")}
        draggable
      >
        Topic
      </div>

      <div
        className=" border border-gray-1  p-2 rounded cursor-move"
        onDragStart={(event) => onDragStart(event, "subtopic")}
        draggable
      >
        SubTopic
      </div>
    </aside>
  );
};

export default Sidebar;
