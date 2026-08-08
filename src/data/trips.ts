export type TripStatus = 'published' | 'coming-soon';

export interface Trip {
  slug: string;
  name: string;
  location: string;
  year: number;
  summary: string;
  status: TripStatus;
  postSlug?: string;
  coverImage?: string;
  accent: string;
}

/** Catalog of backpacking trips — posts unlock as they ship. */
export const trips: Trip[] = [
  {
    slug: 'iceland-2025',
    name: 'Iceland',
    location: 'Highlands & south coast',
    year: 2025,
    summary: 'Laugavegur (~50 miles), then Ring Road: craters, puffins, glaciers, Blue Lagoon.',
    status: 'published',
    postSlug: 'iceland-2025',
    coverImage: '/images/iceland-2025/iceland-2025-07-27-07.webp',
    accent: 'linear-gradient(145deg, #1e3d32 0%, #3d6b8a 55%, #9fd0c8 100%)',
  },
  {
    slug: 'glacier-2024',
    name: 'Glacier National Park',
    location: 'Montana',
    year: 2024,
    summary: 'Ptarmigan to Poia via Red Gap — cold swims, windy nights, Highline without packs.',
    status: 'published',
    postSlug: 'glacier-2024',
    coverImage: '/images/glacier-2024/glacier-2024-07-29-02.webp',
    accent: 'linear-gradient(145deg, #243447 0%, #4a6b5a 50%, #a8c4b8 100%)',
  },
  {
    slug: 'glacier-2018',
    name: 'Glacier National Park',
    location: 'Montana',
    year: 2018,
    summary: 'Gunsight east to west — Ellen Wilson beach, Sperry lemonade, raft finish.',
    status: 'published',
    postSlug: 'glacier-2018',
    coverImage: '/images/glacier-2018/glacier-2018-08-07-05.webp',
    accent: 'linear-gradient(145deg, #2a3a2e 0%, #5a7a6a 55%, #c5d4c8 100%)',
  },
  {
    slug: 'glacier-2013',
    name: 'Glacier National Park',
    location: 'Montana',
    year: 2013,
    summary: 'Lincoln → Snyder → Gunsight → Reynolds → Red Eagle with Oscar, then out west.',
    status: 'published',
    postSlug: 'glacier-2013',
    coverImage: '/images/glacier-2013/glacier-2013-121.webp',
    accent: 'linear-gradient(145deg, #1f2e28 0%, #3d5a4c 50%, #8fafa0 100%)',
  },
  {
    slug: 'utah-arizona-2014',
    name: 'Bryce · Grand Canyon · Zion',
    location: 'Utah & Arizona',
    year: 2014,
    summary: 'Narrows top-down, canyoneering, Bryce Jr. Rangers, Grand Canyon fog to clear.',
    status: 'published',
    postSlug: 'utah-arizona-2014',
    coverImage: '/images/southwest-2014/southwest-2014-08-10-04.webp',
    accent: 'linear-gradient(145deg, #5c2e1a 0%, #a85a32 45%, #e8b896 100%)',
  },
  {
    slug: 'tetons-yellowstone-2016',
    name: 'Tetons & Yellowstone',
    location: 'Wyoming',
    year: 2016,
    summary: 'Heart Lake & Sheridan, then Teton Crest — Hurricane Pass into Cascade.',
    status: 'published',
    postSlug: 'tetons-yellowstone-2016',
    coverImage: '/images/tetons-2016/tetons-2016-08-12-02.webp',
    accent: 'linear-gradient(145deg, #1a2f3a 0%, #3d6a7a 50%, #b8d4c8 100%)',
  },
  {
    slug: 'olympic-2017',
    name: 'Olympic National Park',
    location: 'Washington',
    year: 2017,
    summary: 'Shi Shi beach, rainforest lake swim, Sol Duc soak, ferry into Seattle.',
    status: 'published',
    postSlug: 'olympic-2017',
    coverImage: '/images/olympic-2017/olympic-2017-08-11-03.webp',
    accent: 'linear-gradient(145deg, #1a3328 0%, #2d5a48 45%, #7a9e8a 100%)',
  },
];
