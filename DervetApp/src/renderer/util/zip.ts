import archiver from 'archiver';
import fs from 'fs';

export const zipDirectory = (source: string, out: string) => {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const outputStream = fs.createWriteStream(out);

  return new Promise<void>((resolve, reject) => {
    archive
      .directory(source, false)
      .on('error', (err: string) => {
        // TODO remove this console log and actually handle error
        console.log(err);
        reject(err)
      })
      .pipe(outputStream);

    outputStream.on('close', () => resolve());
    archive.finalize();
  });
}
