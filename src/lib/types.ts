// Book customization state and character config types
export interface CharacterConfig {
  name: string;
  pronouns: string;
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  clothingStyle?: string;
  accessories?: string[];
  title?: string; // for parents
}

export interface BookCustomizationState {
  narrativeType: string;
  narrativeId: string;
  familyStructure: string;
  formationMethod: string;
  formationSubType?: string;
  child: CharacterConfig;
  parents: CharacterConfig[];
  journeyDetails: Record<string, any>;
  dedication?: string;
} 