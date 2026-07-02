export interface Snippet {
  id: number;
  slug: string;
  title: string;
  description: string;
  language: string;
  code: string;
  featured?: boolean;
}
