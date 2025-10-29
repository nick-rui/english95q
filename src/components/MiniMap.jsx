import React from 'react';
import { rooms } from '../data/rooms';

const MiniMap = ({ currentRoomId, visited }) => {
  // Create a 4x4 grid and place rooms according to their original coordinates
  const createGrid = () => {
    const grid = Array(4).fill(null).map(() => Array(4).fill(null));
    
    rooms.forEach(room => {
      const { x, y } = room.coord;
      grid[y][x] = {
        ...room,
        isVisited: visited.has(room.id),
        isCurrent: room.id === currentRoomId
      };
    });
    
    return grid;
  };

  const grid = createGrid();

  const getRoomColor = (room) => {
    if (!room) return 'bg-transparent';
    if (room.isCurrent) return 'bg-yellow-400 border-2 border-yellow-600';
    if (room.isVisited) return 'bg-yellow-200';
    return 'bg-gray-300';
  };

  const getRoomSize = (room) => {
    if (!room) return 'w-3 h-3';
    if (room.isCurrent) return 'w-4 h-4';
    return 'w-3 h-3';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white/90 rounded-lg p-3 shadow-lg border border-yellow-300">
      <div className="text-xs font-semibold text-gray-700 mb-2 text-center">Map</div>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(4, 1fr)` }}>
        {grid.map((row, y) =>
          row.map((room, x) => (
            <div
              key={`${x}-${y}`}
              className={`${getRoomSize(room)} ${getRoomColor(room)} rounded-sm border border-gray-400`}
              title={room ? `${room.title} checkpoint (${room.isVisited ? 'visited' : 'unvisited'})` : ''}
            />
          ))
        )}
      </div>
      <div className="text-xs text-gray-600 mt-2 text-center">
        {visited.size}/{rooms.length} checkpoints
      </div>
    </div>
  );
};

export default MiniMap;
