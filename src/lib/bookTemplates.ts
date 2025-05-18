export type Page = {
  text: string;
  illustration?: string;
};

export type BookTemplate = {
  id: string;
  name: string;
  description: string;
  thumbnail_url: string | null;
  pages: number;
  age_range: string;
  family_structure: string;
  donor_process?: string;
  art_process?: string;
  pageDescriptors?: Page[];
};

export const OUR_SPECIAL_FAMILY_TEMPLATE: BookTemplate = {
  id: 'our-special-family',
  name: 'Our Special Family',
  description: 'A customizable story celebrating diverse family creation.',
  thumbnail_url: null,
  pages: 16,
  age_range: '3-7',
  family_structure: 'various',
  donor_process: 'various',
  art_process: 'various',
  pageDescriptors: [
    {
      text: '"{parentNames}, can you tell me again about how our family started?" asked {childName} one starry night.',
      illustration: 'Parent(s) and child sitting together looking at a photo album',
    },
    {
      text: 'For a long time, {parentPronoun} dreamed about sharing {parentPossessive} love and home with a child.',
      illustration: 'Parent(s) daydreaming, thought bubble showing a house with a swing set',
    },
    {
      text: '{parentPronounCapital} learned that families come in all sorts of wonderful shapes and sizes.',
      illustration: 'Various family constellations',
    },
    {
      text: 'Some, like ours, have {familyStructureDescription}.',
      illustration: 'Custom family illustration',
    },
    {
      text: 'With the help of kind people and doctors, we started the journey to bring you into the world.',
      illustration: 'Doctors or helpers',
    },
    {
      text: 'You grew snug and safe {whereBabyGrew}. We would sing to you and tell you stories.',
      illustration: 'Ultrasound scene',
    },
    {
      text: 'And then one magical day, you were born! Our hearts felt so full of love.',
      illustration: 'Birth scene with happy family',
    },
    {
      text: 'Since that day, we have been on so many adventures together. Each day with you is our favorite day.',
      illustration: 'Parent(s) and toddler reading and playing',
    },
    {
      text: 'There are lots of families like ours who found a special way to make their children.',
      illustration: 'Other families with similar structure',
    },
    {
      text: 'Sweet dreams, my precious {childTerm}. We love our special family more than all the stars in the sky.',
      illustration: 'Child falling asleep with parents nearby',
    },
  ],
};

export const DUMMY_STORIES: BookTemplate[] = [
  OUR_SPECIAL_FAMILY_TEMPLATE,
  {
    id: 'b7e1c2a0-1234-4cde-8f2a-abcdef123456',
    name: 'Two Moms, Sperm Donor',
    description: 'A story for families with two moms, conceived via sperm donation.',
    donor_process: 'sperm',
    art_process: 'IVF',
    family_structure: 'two moms',
    thumbnail_url: null,
    pages: 24,
    age_range: '3-7',
  },
  {
    id: 'c8f2d3b1-2345-4def-9a3b-bcdef2345678',
    name: 'Single Dad, Egg Donor, Surrogacy',
    description: 'A story for single dads who used an egg donor and a surrogate.',
    donor_process: 'egg',
    art_process: 'surrogacy',
    family_structure: 'single dad',
    thumbnail_url: null,
    pages: 24,
    age_range: '3-7',
  },
  {
    id: 'd9e3f4c2-3456-4efa-ab4c-cdef34567890',
    name: 'Mom and Dad, IVF',
    description: 'A story for mom and dad families who used IVF.',
    donor_process: 'none',
    art_process: 'IVF',
    family_structure: 'mom and dad',
    thumbnail_url: null,
    pages: 24,
    age_range: '3-7',
  },
]; 