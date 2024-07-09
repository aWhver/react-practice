import SparkMD5 from 'spark-md5';

const chunkUnit = 2 << 19;
export function getChunks(file: File, hash: string) {
  const chunks = [];
  const count = Math.ceil(file.size / chunkUnit);
  let index = 0;

  while(index < count) {
    chunks.push({
      file: File.prototype.slice.call(file, index * chunkUnit, (index + 1) * chunkUnit),
      chunkName: `${index * chunkUnit}_${index}`,
      name: file.name,
      index,
      hash,
    });
    index++;
  }

  return chunks;
}

export function getFileHash(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = function(data: any) {
      const result = data.target.result;
      const hash = SparkMD5.ArrayBuffer.hash(result);
      resolve(hash);
    };

    fileReader.onerror = function(error) {
      reject(error);
    }

    fileReader.readAsArrayBuffer(file);
  })
}