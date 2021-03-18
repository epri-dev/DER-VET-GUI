import archiver from 'archiver';
import fs from 'fs';

const zipDirectory = (source: string, out: string) => {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const outputStream = fs.createWriteStream(out);

  return new Promise<void>((resolve, reject) => {
    archive
      .directory(source, false)
      .on('error', (err: string) => {
        reject(err);
      })
      .pipe(outputStream);

    outputStream.on('close', () => resolve());
    archive.finalize();
  });
};

export default zipDirectory;
