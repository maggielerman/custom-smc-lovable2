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
};

export const DUMMY_STORIES: BookTemplate[] = [
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