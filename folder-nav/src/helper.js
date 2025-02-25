export const getAllFiles = async (dirHandle) => {
  const dirs = {
    dir: dirHandle,
    files: [],
    id: 'root',
  };
  let countDir = 0;
  for await (const entry of dirHandle.values()) {
    if (entry.kind === 'directory') {
      const newFiles = await getAllFiles(entry);
      dirs.files.push({ ...newFiles, id: `dir_${countDir}` });
      countDir += 1;
    } else dirs.files.push(entry);
  }
  dirs.files = sortDirToFile(dirs.files);
  return dirs;
};

export const getImgURL = async (entry) => {
  const file = await entry.getFile(); // Get the File object
  return URL.createObjectURL(file);
};

export const checkImg = (file) =>
  file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg');

export const checkDir = (file) => !('kind' in file);

export const sortDirToFile = (files) => {
  const dirs = [],
    fils = [];
  for (const entry of files) {
    if (checkDir(entry)) {
      dirs.push(entry);
    } else {
      fils.push(entry);
    }
  }

  return [...dirs, ...fils];
};

export const getDisplayFiles = (files, path, index = 1) => {
  if (index >= path.length) {
    return files;
  }
  for (const file of files) {
    if (checkDir(file) && file.id === path[index].id) {
      return getDisplayFiles(file.files, path, index + 1);
    }
  }
  return [];
};

export const getDirName = (files, path, index = 1) => {
  if (index >= path.length) {
    return '';
  }
  // Iterate through the files to find the directory matching the current path
  for (const file of files) {
    if (checkDir(file)) {
      if (file.id === path[index].id) {
        return file.dir.name; // Return the directory name
      }
      const result = getDirName(file.files, path, index + 1);
      if (result) {
        return result; // If a name is found, return it
      }
    }
  }
  // If no matching directory was found, return an empty string
  return '';
};
