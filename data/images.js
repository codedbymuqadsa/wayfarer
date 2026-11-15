import { IDS } from './imageIds';

// Build an Unsplash image url from catalogue index
export const U = (i, w = 1200) =>
  `https://images.unsplash.com/photo-${IDS[i]}?auto=format&fit=crop&w=${w}&q=75`;

// Interior / room photography used for room types and hotel galleries
export const ROOM_POOL = [36, 72, 102, 185, 194, 195, 210, 212, 222, 225, 227, 214, 224, 97, 219, 33, 101, 47];
// Pool / lounge / ambience photography used as secondary hotel imagery
export const AMBIENT_POOL = [201, 170, 177, 226, 191, 209, 7, 199, 204, 183, 189, 190];
