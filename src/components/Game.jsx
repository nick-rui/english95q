import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { rooms, getRoomById, getNeighbors } from '../data/rooms';
import EmeraldCity from '@images/emeraldcity.jpeg';
import FellowshipImg from '@images/characterstogether.png';
import DorothySprite from '@images/dorothypizel.png';
import MiniMap from './MiniMap';

// Grid size (tiles)
const GRID_WIDTH = 15;
const GRID_HEIGHT = 11;

// Door positions on room edges
const DOOR_X = Math.floor(GRID_WIDTH / 2);
const DOOR_Y = Math.floor(GRID_HEIGHT / 2);

const STORAGE_KEYS = {
  room: 'roadKnowsGameRoom',
  pos: 'roadKnowsGamePos',
  visited: 'roadKnowsGameVisited',
};

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function isBorder(x, y) {
  return x === 0 || y === 0 || x === GRID_WIDTH - 1 || y === GRID_HEIGHT - 1;
}

function isNorthDoor(x, y, neighbors) {
  return y === 0 && x === DOOR_X && !!neighbors.north;
}

function isSouthDoor(x, y, neighbors) {
  return y === GRID_HEIGHT - 1 && x === DOOR_X && !!neighbors.south;
}

function isWestDoor(x, y, neighbors) {
  return x === 0 && y === DOOR_Y && !!neighbors.west;
}

function isEastDoor(x, y, neighbors) {
  return x === GRID_WIDTH - 1 && y === DOOR_Y && !!neighbors.east;
}

function getTileType(x, y, neighbors) {
  // Doors override border walls
  if (isNorthDoor(x, y, neighbors)) return 'door-north';
  if (isSouthDoor(x, y, neighbors)) return 'door-south';
  if (isWestDoor(x, y, neighbors)) return 'door-west';
  if (isEastDoor(x, y, neighbors)) return 'door-east';
  if (isBorder(x, y)) return 'wall';
  return 'floor';
}

const initialRoomId = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.room);
  const parsed = saved ? parseInt(saved, 10) : NaN;
  return !Number.isNaN(parsed) && getRoomById(parsed) ? parsed : 1;
};

const initialPosition = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.pos);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (
        typeof parsed === 'object' &&
        typeof parsed.x === 'number' &&
        typeof parsed.y === 'number'
      ) {
        return {
          x: clamp(parsed.x, 1, GRID_WIDTH - 2),
          y: clamp(parsed.y, 1, GRID_HEIGHT - 2),
        };
      }
    } catch (_) {
      // ignore
    }
  }
  // Start near the west door facing east
  return { x: 2, y: DOOR_Y };
};

const initialVisited = () => {
  const saved = localStorage.getItem(STORAGE_KEYS.visited);
  if (saved) {
    try {
      const arr = JSON.parse(saved);
      if (Array.isArray(arr)) return new Set(arr);
    } catch (_) {
      // ignore
    }
  }
  return new Set([1]);
};

const moveVectors = {
  ArrowUp: { dx: 0, dy: -1 },
  ArrowDown: { dx: 0, dy: 1 },
  ArrowLeft: { dx: -1, dy: 0 },
  ArrowRight: { dx: 1, dy: 0 },
  w: { dx: 0, dy: -1 },
  s: { dx: 0, dy: 1 },
  a: { dx: -1, dy: 0 },
  d: { dx: 1, dy: 0 },
};

const tileSizePx = 28; // visual scale

// Room-specific background images keyed by slideId
const roomBackgroundsBySlideId = {
  8: FellowshipImg, // The Fellowship Forms
  9: EmeraldCity,   // Approaching the Emerald City
};

// Floor palette for a more colorful, fun look (light yellows and warm tones)
const floorPalette = ['#F8E38A', '#F6E79E', '#F5DE8A', '#F2D97D', '#F0D36B', '#F7EBAF'];

function pickFloorColor(x, y, roomId) {
  const idx = Math.abs((x * 31 + y * 17 + roomId * 13)) % floorPalette.length;
  return floorPalette[idx];
}

const Game = () => {
  const [roomId, setRoomId] = useState(initialRoomId);
  const [playerPos, setPlayerPos] = useState(initialPosition);
  const [visited, setVisited] = useState(initialVisited);
  // Story is always visible now

  const room = useMemo(() => getRoomById(roomId), [roomId]);
  const neighbors = useMemo(() => getNeighbors(room), [room]);

  // Persist state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.room, String(roomId));
  }, [roomId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.pos, JSON.stringify(playerPos));
  }, [playerPos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.visited, JSON.stringify(Array.from(visited)));
  }, [visited]);

  // Enter-room behavior
  useEffect(() => {
    setVisited((prev) => new Set(prev).add(roomId));
  }, [roomId]);

  const transitionRoom = useCallback(
    (direction) => {
      if (direction === 'north' && neighbors.north) {
        setRoomId(neighbors.north.id);
        setPlayerPos({ x: DOOR_X, y: GRID_HEIGHT - 2 });
        return true;
      }
      if (direction === 'south' && neighbors.south) {
        setRoomId(neighbors.south.id);
        setPlayerPos({ x: DOOR_X, y: 1 });
        return true;
      }
      if (direction === 'west' && neighbors.west) {
        setRoomId(neighbors.west.id);
        setPlayerPos({ x: GRID_WIDTH - 2, y: DOOR_Y });
        return true;
      }
      if (direction === 'east' && neighbors.east) {
        setRoomId(neighbors.east.id);
        setPlayerPos({ x: 1, y: DOOR_Y });
        return true;
      }
      return false;
    },
    [neighbors]
  );

  const tryMove = useCallback(
    (dx, dy) => {
      const target = { x: playerPos.x + dx, y: playerPos.y + dy };

      // If targeting a door tile, transition immediately
      if (isNorthDoor(target.x, target.y, neighbors)) {
        transitionRoom('north');
        return;
      }
      if (isSouthDoor(target.x, target.y, neighbors)) {
        transitionRoom('south');
        return;
      }
      if (isWestDoor(target.x, target.y, neighbors)) {
        transitionRoom('west');
        return;
      }
      if (isEastDoor(target.x, target.y, neighbors)) {
        transitionRoom('east');
        return;
      }

      // Prevent walking into walls
      if (isBorder(target.x, target.y)) return;

      // Move on floor
      setPlayerPos(target);
    },
    [playerPos, neighbors, transitionRoom]
  );

  // Keyboard controls
  useEffect(() => {
    const onKeyDown = (e) => {
      const vec = moveVectors[e.key];
      if (vec) {
        e.preventDefault();
        tryMove(vec.dx, vec.dy);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [tryMove]);

  const tileStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${GRID_WIDTH}, ${tileSizePx}px)`,
      gridTemplateRows: `repeat(${GRID_HEIGHT}, ${tileSizePx}px)`,
    }),
    []
  );

  const visitedCount = visited.size;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-5xl w-full px-4">
        <div className="flex items-center justify-between py-4">
          <div>
            <h1 className="text-xl md:text-2xl font-['Cinzel'] text-[#2C1810] font-bold">The Road Knows</h1>
            <p className="text-sm text-[#8B7355] font-['Libre_Baskerville'] mt-1">by Nick and Kesavan</p>
          </div>
          <div className="text-sm text-[#8B7355] font-['Libre_Baskerville']">Checkpoints visited: {visitedCount} / {rooms.length}</div>
        </div>

        {/* Game area */}
        <div
          className="mx-auto w-fit rounded-lg border-2 border-[#CC8800] p-2 shadow-lg bg-cover bg-center relative"
          style={{
            backgroundImage: roomBackgroundsBySlideId[room.slideId]
              ? `url(${roomBackgroundsBySlideId[room.slideId]})`
              : undefined,
            imageRendering: 'pixelated',
          }}
        >
          {/* subtle parchment overlay for readability */}
          <div className="absolute inset-0 rounded-lg" style={{ backgroundColor: 'rgba(234, 215, 163, 0.45)' }} />

          <div
            className="grid relative"
            style={tileStyle}
            aria-label="Pixel room"
          >
            {Array.from({ length: GRID_HEIGHT }).map((_, y) =>
              Array.from({ length: GRID_WIDTH }).map((__, x) => {
                const tile = getTileType(x, y, neighbors);
                const isPlayer = playerPos.x === x && playerPos.y === y;
                const isDoor = tile === 'door-north' || tile === 'door-south' || tile === 'door-west' || tile === 'door-east';
                const backgroundColor = isDoor
                  ? '#FFD700'
                  : tile === 'wall'
                  ? '#7A5A1F'
                  : pickFloorColor(x, y, room.id);
                return (
                  <div
                    key={`${x}-${y}`}
                    className={`relative border border-[#B3892B]/40`}
                    style={{ width: tileSizePx, height: tileSizePx, imageRendering: 'pixelated', backgroundColor }}
                    role="presentation"
                  >
                    {isPlayer && (
                      <div className="absolute inset-0 flex items-center justify-center select-none">
                        <img
                          src={DorothySprite}
                          alt="Dorothy"
                          style={{ width: tileSizePx - 4, height: tileSizePx - 4, imageRendering: 'pixelated' }}
                        />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Controls and hint */}
        <div className="text-center mt-3 text-xs text-[#8B7355] font-['Libre_Baskerville']">
          Use Arrow keys or WASD to move
        </div>

        {/* Story overlay - always visible */}
        <div className="mt-6 bg-white/95 rounded-lg border-l-6 border-[#FFD700] p-6 shadow-lg max-w-3xl mx-auto">
          <h2 className="font-['Cinzel'] text-xl md:text-2xl text-[#2C1810] mb-2 font-bold">{room.title}</h2>
          {room.subtitle && (
            <h3 className="font-['Cinzel'] text-base md:text-lg text-[#654321] mb-4 italic">{room.subtitle}</h3>
          )}
          <div className="font-['Libre_Baskerville'] text-base leading-relaxed text-[#2C1810] whitespace-pre-line">
            {room.narration}
          </div>
        </div>
      </div>
      
      {/* MiniMap */}
      <MiniMap currentRoomId={roomId} visited={visited} />
    </div>
  );
};

export default Game;


