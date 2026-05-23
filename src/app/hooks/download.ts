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
