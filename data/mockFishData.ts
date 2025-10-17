
import { Fish } from '../types';

export const MOCK_FISH_DATA: Fish[] = [
  {
    id: '1',
    name: 'Clownfish',
    scientificName: 'Amphiprioninae',
    description: 'Clownfish or anemonefish are fishes from the subfamily Amphiprioninae in the family Pomacentridae. Thirty species are recognized: one in the genus Premnas, while the remaining are in the genus Amphiprion.',
    habitat: 'Warm waters of the Indian and Pacific Oceans, including the Great Barrier Reef and the Red Sea.',
    media: [
      { id: 'm1-1', type: 'image', url: 'https://picsum.photos/seed/clownfish/800/600' },
      { id: 'm1-2', type: 'image', url: 'https://picsum.photos/seed/clownfish2/800/600' },
    ],
  },
  {
    id: '2',
    name: 'Moorish Idol',
    scientificName: 'Zanclus cornutus',
    description: 'The Moorish idol is a marine fish species, the sole extant representative of the family Zanclidae in order an Acanthuriformes. A common inhabitant of tropical to subtropical reefs and lagoons, the Moorish idol is notable for its wide distribution throughout the Indo-Pacific.',
    habitat: 'Coral reefs across the Indo-Pacific Ocean.',
    media: [
      { id: 'm2-1', type: 'image', url: 'https://picsum.photos/seed/moorishidol/800/600' },
    ],
  },
  {
    id: '3',
    name: 'Blue Tang',
    scientificName: 'Paracanthurus hepatus',
    description: 'Paracanthurus hepatus is a species of Indo-Pacific surgeonfish. A popular fish in marine aquaria, it is the only member of the genus Paracanthurus. It is known by many common names, including royal blue tang, regal tang, palette surgeonfish, and blue surgeonfish.',
    habitat: 'Indo-Pacific. It can be found from East Africa to Micronesia, north to Japan and south to the Great Barrier Reef.',
    media: [
      { id: 'm3-1', type: 'image', url: 'https://picsum.photos/seed/bluetang/800/600' },
      { id: 'm3-2', type: 'image', url: 'https://picsum.photos/seed/bluetang2/800/600' },
    ],
  },
];
