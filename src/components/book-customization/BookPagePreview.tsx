import { BookTemplate } from '@/lib/bookTemplates';
import { renderStory } from '@/lib/renderStory';
import { buildTemplateData } from '@/lib/storyUtils';

interface BookPagePreviewProps {
  template: BookTemplate;
  bookData: any;
}

export default function BookPagePreview({ template, bookData }: BookPagePreviewProps) {
  const variables = buildTemplateData(bookData);
  const pages = renderStory(template, variables);

  return (
    <div className="space-y-4">
      {pages.map((text, idx) => (
        <div key={idx} className="p-4 border rounded-md">
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}
