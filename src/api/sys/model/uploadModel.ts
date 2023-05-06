export interface UploadApiResult {
  message: string;
  code: number;

  mimeType: string;

  fileName: string;
  url: string;
}
