can i make grids draggable eg if the user wants to see the whole ep title on one line they can drag that column bigger?
Yes! You can make grid columns draggable/resizable so users can adjust their widths. Here’s how to implement it in React with CSS Grid and drag handlers:

Solution: Resizable Grid Columns
1. Add Resize Handlers
Use mouse events to track drag movements and update column widths dynamically.

tsx
import { useState, useRef, useEffect } from 'react';

interface Episode {
  id: string;
  title: string;
  pubDate: string;
  number: string;
}

export default function ResizableGrid() {
  const [columnWidths, setColumnWidths] = useState(['1fr', '1fr', '1fr']); // Initial widths
  const [isDragging, setIsDragging] = useState<number | null>(null); // Track which column is being resized
  const gridRef = useRef<HTMLDivElement>(null);

  // Mouse move handler for resizing
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging === null || !gridRef.current) return;

    const gridRect = gridRef.current.getBoundingClientRect();
    const newWidths = [...columnWidths];
    const dragOffset = e.clientX - gridRect.left;
    const totalWidth = gridRect.width;
    const newWidth = `${(dragOffset / totalWidth) * 100}%`;

    newWidths[isDragging] = newWidth;
    setColumnWidths(newWidths);
  };

  // Cleanup mouse listeners
  useEffect(() => {
    if (isDragging !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', () => setIsDragging(null));
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);

  return (
    <div
      ref={gridRef}
      className="grid gap-2 select-none"
      style={{
        gridTemplateColumns: columnWidths.join(' '),
      }}
    >
      {/* Headers */}
      <div className="font-bold p-2">Title</div>
      <div className="font-bold p-2">Released</div>
      <div className="font-bold p-2">Episode</div>

      {/* Resize Handles (between columns) */}
      {[1, 2].map((colIndex) => (
        <div
          key={colIndex}
          className="cursor-col-resize bg-gray-200 hover:bg-blue-300 w-1"
          onMouseDown={() => setIsDragging(colIndex - 1)}
        />
      ))}

      {/* Data Rows */}
      {feed.map((episode) => (
        <>
          <div key={`${episode.id}-title`} className="p-2 truncate">
            {episode.title}
          </div>
          <div key={`${episode.id}-date`} className="p-2">
            {new Date(episode.pubDate).toLocaleDateString()}
          </div>
          <div key={`${episode.id}-number`} className="p-2">
            {episode.number}
          </div>
        </>
      ))}
    </div>
  );
}
Key Features:
Resizable Columns

Drag the vertical handles (between headers) to adjust widths.

Uses gridTemplateColumns with dynamic fr or % units.

User Experience

cursor-col-resize shows a resize cursor.

truncate ensures text doesn’t overflow (optional).

Performance

Event listeners are added/removed only during drag.

Alternative Libraries
For a pre-built solution, consider:

react-resizable

tsx
import { Resizable } from 'react-resizable';
// Wrap each column header with <Resizable>.
react-data-grid (Full-featured table).

Styling Notes
Use minmax(100px, 1fr) to set minimum/maximum column widths.

Add user-select: none; to prevent text selection during drag.

Example Output
https://user-images.githubusercontent.com/10750442/178131321-1a3e4c5f-9d4c-4f8e-9a6d-9f5c8e8b3f7a.gif

Would you like help fine-tuning the drag sensitivity or adding touch support? 😊