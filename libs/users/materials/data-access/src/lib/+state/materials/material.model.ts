export interface Material {
  id: number;
  title: string;
  url: string;           // у себя называешь url
  folderId: number;      // у себя называешь folderId
  createdAt?: string;    // опционально дата создания
}