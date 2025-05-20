export type SavedFamilyMember = {
  id: string;
  role: string;
  name: string;
  pronouns?: string;
};

export type SavedFamilyData = {
  familyMembers: SavedFamilyMember[];
  conceptionMethod: string;
  donorType: string;
  surrogateName: string;
  familyStory: string;
};

export function getSavedFamilyData(): SavedFamilyData | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    return JSON.parse(localStorage.getItem('saved-family-data') || 'null');
  } catch {
    return null;
  }
}

export function saveFamilyData(data: SavedFamilyData) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('saved-family-data', JSON.stringify(data));
}
