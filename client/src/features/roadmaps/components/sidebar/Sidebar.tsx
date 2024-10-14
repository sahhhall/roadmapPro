
const Sidebar = ({ onDragStart }:any) => {
  return (
    <aside className="border-r border-gray-200 p-4 bg-gray-50 w-64">
      <div className="text-sm text-gray-600 mb-4">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="bg-blue-100 border border-blue-500 text-blue-700 p-2 mb-2 rounded cursor-move"
        onDragStart={(event) => onDragStart(event, 'input')}
        draggable
      >
        Topic
      </div>
      <div
        className="bg-gray-100 border border-gray-500 text-gray-700 p-2 mb-2 rounded cursor-move"
        onDragStart={(event) => onDragStart(event, 'default')}
        draggable
      >
        SubTopic
      </div>
      <div
        className="bg-pink-100 border border-pink-500 text-pink-700 p-2 rounded cursor-move"
        onDragStart={(event) => onDragStart(event, 'output')}
        draggable
      >
        Output Node
      </div>
    </aside>
  );
};

export default Sidebar;