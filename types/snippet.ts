export interface Snippet {
  id: number;
  slug: string;
  title: string;
  description: string;
  language: string;
  tags: string[];
  code: string;
  featured?: boolean;
}
