import child_process from 'node:child_process';

export default function execAsync(
  command: string,
): Promise<{ stdout: string; stderr: string }> {
  console.log(`executing command: ${command}`);
  return new Promise((resolv, reject) => {
    child_process.exec(command, (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      }
      resolv({
        stdout,
        stderr,
      });
    });
  });
}
