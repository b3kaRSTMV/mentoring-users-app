export type MaterialType = 'video' | 'pdf' | 'audio';

export interface Material {
  id: number;
  title: string;
  url: string;
  folderId: number;
  type?: MaterialType;
  createdAt?: number | string | null;
}
