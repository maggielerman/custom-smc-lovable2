// Core Narratives
export const CORE_NARRATIVES = [
  {
    id: 'garden-metaphor',
    label: 'The Family Garden',
    type: 'metaphorical',
    ageRange: '2-5',
    description: 'A gentle gardening metaphor for how families grow.'
  },
  {
    id: 'recipe-metaphor',
    label: 'The Family Recipe',
    type: 'metaphorical',
    ageRange: '2-5',
    description: 'A cooking metaphor for family creation.'
  },
  {
    id: 'donor-factual',
    label: 'How Our Family Began: The Donor Story',
    type: 'scientific',
    ageRange: '5-8+',
    description: 'A factual, age-appropriate story about donor conception.'
  },
  {
    id: 'surrogacy-adoption-factual',
    label: "Our Family's Special Journey: Surrogacy and Adoption",
    type: 'scientific',
    ageRange: '5-8+',
    description: 'A factual, age-appropriate story about surrogacy or adoption.'
  },
];

// Family Structures
export const FAMILY_STRUCTURES = [
  { id: 'single-parent', label: 'Single Parent', inclusivity: ['any'] },
  { id: 'mom-dad', label: 'Mom and Dad', inclusivity: ['cis', 'hetero'] },
  { id: 'two-moms', label: 'Two Moms', inclusivity: ['lgbtq'] },
  { id: 'two-dads', label: 'Two Dads', inclusivity: ['lgbtq'] },
  { id: 'nonbinary', label: 'Gender-neutral/Nonbinary Family', inclusivity: ['nonbinary', 'any'] },
];

// Family Formation Methods
export const FORMATION_METHODS = [
  {
    id: 'donor-conception',
    label: 'Donor Conception',
    subTypes: [
      { id: 'ivf', label: 'IVF' },
      { id: 'iui', label: 'IUI' },
      { id: 'reciprocal-ivf', label: 'Reciprocal IVF' },
      { id: 'sperm-donation', label: 'Sperm Donation' },
      { id: 'egg-donation', label: 'Egg Donation' },
      { id: 'embryo-donation', label: 'Embryo Donation' },
    ],
  },
  {
    id: 'surrogacy',
    label: 'Surrogacy',
    subTypes: [
      { id: 'gestational', label: 'Gestational Surrogacy' },
      { id: 'traditional', label: 'Traditional Surrogacy' },
    ],
  },
  {
    id: 'adoption',
    label: 'Adoption',
    subTypes: [
      { id: 'open', label: 'Open Adoption' },
      { id: 'closed', label: 'Closed Adoption' },
      { id: 'domestic', label: 'Domestic Adoption' },
      { id: 'international', label: 'International Adoption' },
    ],
  },
];

// Character Customization Options (sample values)
export const SKIN_TONES = ['light', 'medium', 'dark', 'olive', 'brown', 'black'];
export const HAIR_STYLES = ['short', 'long', 'curly', 'straight', 'bald', 'braids'];
export const HAIR_COLORS = ['blonde', 'brown', 'black', 'red', 'gray', 'dyed'];
export const PRONOUNS = ['she/her', 'he/him', 'they/them'];
export const CLOTHING_STYLES = ['casual', 'formal', 'sporty', 'cultural'];
export const ACCESSORIES = ['glasses', 'hat', 'bow', 'scarf', 'none'];

// Journey Details Config (sample)
export const JOURNEY_DETAILS = {
  donor: {
    anonymity: ['anonymous', 'known', 'identity-release'],
    donorCharacteristics: ['optional', 'factual', 'age-appropriate'],
  },
  surrogacy: {
    surrogateRelationship: ['agency', 'family-friend', 'known-surrogate'],
    donorSpecifics: ['yes', 'no'],
  },
  adoption: {
    adoptionType: ['open', 'closed', 'international', 'domestic'],
    birthFamilyDetails: ['optional'],
  },
}; 