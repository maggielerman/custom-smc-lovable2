export function renderStory(template: { pageDescriptors?: { text: string }[] }, bookData: Record<string, any>): string[] {
  if (!template.pageDescriptors) return [];
  return template.pageDescriptors.map(page =>
    page.text.replace(/\{(\w+)\}/g, (_, key) => {
      return key in bookData ? String(bookData[key]) : '';
    })
  );
}
