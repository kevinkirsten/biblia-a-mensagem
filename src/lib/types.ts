export interface BibleBook {
  title: string;
  normalizedTitle: string;
  chaptersCount: number;
}

/*export interface Chapter {
  number: string;
  verses: Verse[];
}*/

export interface Verse {
  title: string;
  number: string;
  content: string;
}
