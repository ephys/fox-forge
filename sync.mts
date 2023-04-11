import type { Abortable } from 'node:events';
import type { ObjectEncodingOptions, OpenMode, PathLike } from 'node:fs';
import fs from 'node:fs/promises';
import type { FileHandle } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { arrayFromAsync, parallelForEach } from '@ephys/fox-forge';
import { isNodeError, listFilesRecursive } from '@ephys/fox-forge/node';

/**
 * does not modify the contents of the file but exits with code 1 if outdated, 0 if not
 */
const checkOutdated = process.argv.includes('--check-outdated');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const srcDir = path.join(__dirname, 'src');

const folders = await listFolders(srcDir);

const outdatedPaths: string[] = [];

await parallelForEach(folders, async folder => {
  const folderAbsolutePath = path.join(srcDir, folder);

  const files = await arrayFromAsync(listFilesRecursive(folderAbsolutePath));

  const imports = files
    .map(file => {
      return path.relative(folderAbsolutePath, file).replace(/\.ts$/, '.js');
    })
    .filter(pathName => {
      return (
        !/(^|\\)index\.js$/.test(pathName)
        && !pathName.endsWith('.spec.js')
        && !pathName.includes('__tests__/')
        && !pathName.includes('.internal/')
      );
    })
    .map(pathName => {
      return `export * from './${pathName}';\n`;
    })
    .sort()
    .join('');

  const indexPath = path.join(folderAbsolutePath, 'index.ts');

  const fileContents = `/** Generated File, do not modify directly. Run "yarn sync" instead */\n\n${imports}`;

  const file: string | null = await readFileIfExists(indexPath, 'utf-8');
  if (file === null || file !== fileContents) {
    outdatedPaths.push(indexPath);
  }

  if (!checkOutdated) {
    await fs.writeFile(indexPath, fileContents, 'utf-8');
  }
});

if (outdatedPaths.length === 0) {
  console.info('All index files up-to-date');
} else {
  const fileListStr = outdatedPaths.map(pathName => `- ${pathName}\n`).join('');
  if (checkOutdated) {
    console.info(`Outdated files:\n${fileListStr}`);

    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  } else {
    console.info(`Updated files:\n${fileListStr}`);
  }
}

async function listFolders(directory: PathLike): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  return entries.filter(entry => entry.isDirectory()).map(entry => entry.name);
}

interface Flaggable {
  flag?: OpenMode | undefined;
}

function readFileIfExists(
  filePath: PathLike | FileHandle,
  options?:
    | ({ encoding?: null | undefined } & Flaggable & Abortable)
    | null
): Promise<Buffer | null>;
function readFileIfExists(
  filePath: PathLike | FileHandle,
  options:
    | ({ encoding: BufferEncoding } & Flaggable & Abortable)
    | BufferEncoding
): Promise<string | null>;
function readFileIfExists(
  filePath: PathLike | FileHandle,
  options?:
    | (ObjectEncodingOptions & Abortable & Flaggable)
    | BufferEncoding
    | null
): Promise<string | Buffer | null>;
async function readFileIfExists(
  filePath: PathLike | FileHandle,
  options?: (ObjectEncodingOptions & Abortable & Flaggable) | BufferEncoding | null,
) {
  try {
    return await fs.readFile(filePath, options);
  } catch (error) {
    if (isNodeError(error) && error.code === 'ENOENT') {
      // file not found
      return null;
    }

    throw error;
  }
}
