/** @param {File | { name: string }} file */
export const getFileExtension = file => {
  if (!file?.name) return null;

  const fileExtensionRegExp = /\.(\w+)$/;
  const [extension] = file.name.match(fileExtensionRegExp) || [];

  if (!extension) return null;

  return extension.toLowerCase();
};
