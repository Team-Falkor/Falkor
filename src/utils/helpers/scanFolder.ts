import { fs } from "@tauri-apps/api";

type ScanFolderResult =
  | {
      error: false;
      files: string[];
    }
  | {
      error?: true;
      message: string;
    };

enum FileExtension {
  EXE = ".exe",
}

interface options {
  customFileExtensions?: FileExtension[];
}

/**
 * Scans a folder for files with specific extensions.
 *
 * @param {string} path - The path of the folder to scan.
 * @param {options} [options] - Additional options for scanning.
 * @param {FileExtension[]} [options.customFileExtensions] - Custom file extensions to look for.
 * @returns {Promise<ScanFolderResult>} - A promise that resolves with the scanned files or an error message.
 */
export const scanFolder = async (
  path: string,
  options?: options
): Promise<ScanFolderResult> => {
  // Log the path of the folder being scanned
  console.log(path);

  // Check if the folder exists
  const doesExist = await fs.exists(path);

  // If the folder does not exist, return an error message
  if (!doesExist)
    return {
      error: true,
      message: "Folder does not exist",
    };

  // Read the files in the folder
  const files = await fs.readDir(path);

  // Filter the files based on the specified extensions
  const filteredFiles = files
    .map((file) => file.path)
    .filter((file) => {
      // If no custom extensions are specified, look for .exe files
      if (!options?.customFileExtensions)
        return file.endsWith(FileExtension.EXE);

      // Otherwise, check if the file has any of the specified extensions
      return options?.customFileExtensions?.some((ext) => file.endsWith(ext));
    });

  // Return the scanned files or an empty array if no files were found
  return { error: false, files: filteredFiles ?? [] };
};
