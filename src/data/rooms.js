import { slides } from './slides';

// Define a simple grid of rooms. We'll map each slide to a room coordinate.
// Grid coordinates start at (0,0) in the top-left. We'll lay rooms in a snake pattern
// over a 4x4 grid to fit all 13 slides.

export const roomGridWidth = 4;
export const roomGridHeight = 4;

// Generate coordinates in a snake pattern (left-to-right on even rows, right-to-left on odd rows)
const coords = [];
for (let y = 0; y < roomGridHeight; y++) {
  const row = Array.from({ length: roomGridWidth }, (_, x) => ({ x, y }));
  if (y % 2 === 1) row.reverse();
  coords.push(...row);
}

// Map slides to rooms with coordinates
export const rooms = slides.slice(0, 13).map((slide, index) => {
  const { x, y } = coords[index];
  return {
    id: index + 1, // room id
    slideId: slide.id,
    title: slide.title,
    subtitle: slide.subtitle,
    narration: slide.narration || slide.content || '',
    coord: { x, y },
  };
});

export function getRoomById(id) {
  return rooms.find((r) => r.id === id);
}

export function getRoomByCoord(x, y) {
  return rooms.find((r) => r.coord.x === x && r.coord.y === y);
}

export function getNeighbors(room) {
  const { x, y } = room.coord;
  return {
    north: getRoomByCoord(x, y - 1) || null,
    south: getRoomByCoord(x, y + 1) || null,
    west: getRoomByCoord(x - 1, y) || null,
    east: getRoomByCoord(x + 1, y) || null,
  };
}


