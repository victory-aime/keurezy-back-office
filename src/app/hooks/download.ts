import { FaRegFilePdf } from 'react-icons/fa';
import { Icons } from '_components/custom';

export const downloadFile = async (file: string) => {
  const response = await fetch(file);
  const blob = await response.blob();

  const fileName = file.split('/').pop() || 'document.pdf';
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
};

export const getFileIcon = (url: string) => {
  const ext = url.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext ?? '')) return Icons.LuFileImage;
  if (['pdf', 'docx'].includes(ext ?? '')) return FaRegFilePdf;
  return Icons.LuFile;
};

export const getFileType = (url: string) => {
  const ext = url.split('.').pop()?.toLowerCase() ?? '';
  const typeMap: Record<string, string> = {
    jpg: 'Image JPEG',
    jpeg: 'Image JPEG',
    png: 'Image PNG',
    gif: 'Image GIF',
    webp: 'Image WebP',
    svg: 'Image SVG',
    pdf: 'Document PDF',
  };
  return typeMap[ext] ?? 'Document';
};

export const getFileNameFromUrl = (url: string) => {
  try {
    return url.split('/').pop()?.split('?')[0] ?? 'document';
  } catch {
    return 'document';
  }
};
