/** @param {File | { name: string }} file */
export const getFileExtension = file => {
  if (file?.name) {
    const fileExtensionRegExp = /\.(\w+)$/;
    const [extension = null] = (file.name.match(fileExtensionRegExp) || []);

    return extension?.toLowerCase();
  }

  return null;
};
