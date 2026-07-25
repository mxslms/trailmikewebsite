export type TripStatus = 'published' | 'coming-soon';

export interface Trip {
  slug: string;
  name: string;
  location: string;
  year: number;
  summary: string;
  status: TripStatus;
  postSlug?: string;
  accent: string;
}

/** Catalog of backpacking trips — posts unlock as they ship. */
export const trips: Trip[] = [
  {
    slug: 'iceland-2025',
    name: 'Iceland',
    location: 'Highlands & south coast',
    year: 2025,
    summary: 'Volcanic ridges, glacial valleys, and weather that rewrites the plan every hour.',
    status: 'published',
    postSlug: 'iceland-2025',
    accent: 'linear-gradient(145deg, #1e3d32 0%, #3d6b8a 55%, #9fd0c8 100%)',
  },
  {
    slug: 'glacier-2024',
    name: 'Glacier National Park',
    location: 'Montana',
    year: 2024,
    summary: 'High passes, cold lakes, and the kind of silence that sticks with you.',
    status: 'coming-soon',
    accent: 'linear-gradient(145deg, #243447 0%, #4a6b5a 50%, #a8c4b8 100%)',
  },
  {
    slug: 'glacier-2018',
    name: 'Glacier National Park',
    location: 'Montana',
    year: 2018,
    summary: 'A return trip — different trails, same mountain gravity.',
    status: 'coming-soon',
    accent: 'linear-gradient(145deg, #2a3a2e 0%, #5a7a6a 55%, #c5d4c8 100%)',
  },
  {
    slug: 'glacier-2013',
    name: 'Glacier National Park',
    location: 'Montana',
    year: 2013,
    summary: 'Where the backpacking habit really took hold.',
    status: 'coming-soon',
    accent: 'linear-gradient(145deg, #1f2e28 0%, #3d5a4c 50%, #8fafa0 100%)',
  },
  {
    slug: 'utah-arizona-2014',
    name: 'Bryce · Grand Canyon · Zion',
    location: 'Utah & Arizona',
    year: 2014,
    summary: 'Hoodoos at dawn, rim light at dusk, and red rock that photographs itself.',
    status: 'coming-soon',
    accent: 'linear-gradient(145deg, #5c2e1a 0%, #a85a32 45%, #e8b896 100%)',
  },
  {
    slug: 'tetons-yellowstone-2016',
    name: 'Tetons & Yellowstone',
    location: 'Wyoming',
    year: 2016,
    summary: 'Granite spires, thermal weirdness, and long days under big sky.',
    status: 'coming-soon',
    accent: 'linear-gradient(145deg, #1a2f3a 0%, #3d6a7a 50%, #b8d4c8 100%)',
  },
  {
    slug: 'olympic-2017',
    name: 'Olympic National Park',
    location: 'Washington',
    year: 2017,
    summary: 'Rainforest hush, Pacific surf, and alpine meadows in the same week.',
    status: 'coming-soon',
    accent: 'linear-gradient(145deg, #1a3328 0%, #2d5a48 45%, #7a9e8a 100%)',
  },
];
