export function buildTemplateData(bookData: any) {
  const parents = (bookData.familyMembers || []).filter((m: any) => {
    const r = (m.role || '').toLowerCase();
    return (
      r.includes('mom') ||
      r.includes('dad') ||
      r.includes('parent') ||
      r.includes('mama') ||
      r.includes('papa')
    );
  });
  const parentNames = parents.map((p: any) => p.name || p.role).join(' and ');
  const multipleParents = parents.length > 1;
  const parentPronoun = multipleParents ? 'we' : 'I';
  const parentPronounCapital = parentPronoun.charAt(0).toUpperCase() + parentPronoun.slice(1);
  const parentPossessive = multipleParents ? 'our' : 'my';

  const familyMap: Record<string, string> = {
    'two-parents': 'two parents',
    'single-mom': 'a single mom',
    'single-dad': 'a single dad',
    'two-moms': 'two moms',
    'two-dads': 'two dads',
    grandparents: 'grandparent guardians',
    adoptive: 'an adoptive family',
  };
  const familyStructureDescription =
    familyMap[bookData.familyStructure] || bookData.familyStructure;

  const whereBabyGrew = bookData.surrogateName
    ? `inside ${bookData.surrogateName}'s tummy`
    : multipleParents
    ? "inside Mom's tummy"
    : 'inside my tummy';

  const childTerm =
    bookData.childGender === 'girl'
      ? 'girl'
      : bookData.childGender === 'boy'
      ? 'boy'
      : 'child';

  return {
    parentNames,
    childName: bookData.childName,
    parentPronoun,
    parentPronounCapital,
    parentPossessive,
    familyStructureDescription,
    whereBabyGrew,
    childTerm,
  };
}
