
import { Fish } from '../types.js';

export const MOCK_FISH_DATA: Fish[] = [
  {
    id: '1',
    name: 'カクレクマノミ',
    nameEn: 'Clownfish',
    scientificName: 'Amphiprioninae',
    description: 'クラウンフィッシュまたはイソギンチャクフィッシュは、スズメダイ科クマノミ亜科の魚です。30種が知られており、1種がPremnas属、残りがAmphiprion属に属します。',
    descriptionEn: 'Clownfish or anemonefish are fishes from the subfamily Amphiprioninae in the family Pomacentridae. Thirty species are recognized: one in the genus Premnas, while the remaining are in the genus Amphiprion.',
    habitat: 'インド洋および太平洋の暖かい海域、グレートバリアリーフや紅海を含む。',
    media: [
      { id: 'm1-1', type: 'image', url: 'https://picsum.photos/seed/clownfish/800/600' },
      { id: 'm1-2', type: 'image', url: 'https://picsum.photos/seed/clownfish2/800/600' },
    ],
    comments: [
      { id: 'c1-1', authorName: 'AquaFan', text: 'ファインディング・ニモで有名ですよね！' },
      { id: 'c1-2', authorName: 'Diver_Ken', text: 'イソギンチャクとの共生が面白い。' },
    ]
  },
  {
    id: '2',
    name: 'ツノダシ',
    nameEn: 'Moorish Idol',
    scientificName: 'Zanclus cornutus',
    description: 'ツノダシは、スズメダイ目ツノダシ科の唯一の現生種である海水魚です。熱帯から亜熱帯のサンゴ礁やラグーンに広く生息し、インド太平洋に広く分布することで知られています。',
    descriptionEn: 'The Moorish idol is a marine fish species, the sole extant representative of the family Zanclidae in order an Acanthuriformes. A common inhabitant of tropical to subtropical reefs and lagoons, the Moorish idol is notable for its wide distribution throughout the Indo-Pacific.',
    habitat: 'インド太平洋のサンゴ礁。',
    media: [
      { id: 'm2-1', type: 'image', url: 'https://picsum.photos/seed/moorishidol/800/600' },
    ],
    comments: []
  },
  {
    id: '3',
    name: 'ナンヨウハギ',
    nameEn: 'Blue Tang',
    scientificName: 'Paracanthurus hepatus',
    description: 'ナンヨウハギは、インド太平洋に生息するニザダイ科の魚です。観賞魚として人気があり、Paracanthurus属の唯一のメンバーです。ロイヤルブルータン、リーガルタン、パレットサージョンフィッシュなど、多くの一般名で知られています。',
    descriptionEn: 'Paracanthurus hepatus is a species of Indo-Pacific surgeonfish. A popular fish in marine aquaria, it is the only member of the genus Paracanthurus. It is known by many common names, including royal blue tang, regal tang, palette surgeonfish, and blue surgeonfish.',
    habitat: 'インド太平洋。東アフリカからミクロネシア、北は日本、南はグレートバリアリーフまで見られます。',
    media: [
      { id: 'm3-1', type: 'image', url: 'https://picsum.photos/seed/bluetang/800/600' },
      { id: 'm3-2', type: 'image', url: 'https://picsum.photos/seed/bluetang2/800/600' },
    ],
    comments: []
  },
];