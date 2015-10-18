function bufferStdin(callback) {
  const chunks = [];
  process.stdin.on('data', (chunk) => {
    chunks.push(chunk);
  });
  process.stdin.on('end', () => {
    const input = Buffer.concat(chunks).toString();
    callback(null, input);
  });
  process.stdin.on('error', callback);
}

module.exports = bufferStdin;
