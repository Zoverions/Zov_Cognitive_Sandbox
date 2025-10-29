
export interface Section {
  id: string;
  title: string;
  level: number; // 1 for section, 2 for subsection
  content: string; // The raw content of the section
}
