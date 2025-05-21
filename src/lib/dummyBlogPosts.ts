export interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export const DUMMY_BLOG_POSTS: BlogPost[] = [
  {
    id: 'welcome-to-the-blog',
    title: 'Welcome to Our Blog',
    content: `<p>Thank you for visiting our blog. Here we share updates and tips about donor conception stories and creating personalized books for your family.</p>`,
    created_at: '2024-01-01T12:00:00Z',
  },
  {
    id: 'why-share-your-story',
    title: "Why Share Your Family's Story?",
    content: `<p>Sharing your family's donor conception journey helps your child understand their origins and fosters openness. We make that easier with customizable books.</p>`,
    created_at: '2024-02-01T12:00:00Z',
  },
  {
    id: 'customization-tips',
    title: 'Customization Tips',
    content: `<p>Learn how to personalize characters and text in our books to match your family's unique look and story.</p>`,
    created_at: '2024-03-01T12:00:00Z',
  },
];
