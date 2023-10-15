import { Command, InvalidArgumentError } from "commander";
import fs from "node:fs/promises";
import syncFs  from "node:fs";
import os from "node:os";
import path from "node:path";
import isEmpty from 'lodash/isEmpty.js';
import execAsync from "../../utils/asyncExec.js";

type Options = Parameters<typeof syncFs.createWriteStream>[1];

function writeStdInToFile(filePath: string, options?: Options) {
   return new Promise((resolv, reject)=>{
      const writeStream = syncFs.createWriteStream(filePath, options);

      process.stdin.pipe(writeStream);

      writeStream.on('finish', () => {
        resolv(undefined);
      });
      writeStream.on('error', (err) => { 
        reject(err);
      });
   })
}


const command = new Command();

command
    .name('ssh')
    .description('setup ssh')
    .argument('<hostName>', 'ssh host name')
    .argument('<user>', 'ssh user')
    .argument('<port>', 'ssh port')
    .action(async (hostName, user, port)=>{

        const sshPath = path.join(os.homedir(), '.ssh');
        await fs.mkdir(sshPath, { mode: 0o700});
        
        const configPath = path.join(os.homedir(), '.ssh', 'config');
        await fs.appendFile(configPath,`
Host server
    HostName ${hostName}
    User ${user}
    Port ${port}
    PubKeyAuthentication yes
    StrictHostKeyChecking no
    IdentityFile ~/.ssh/private_key    
`, { mode: 0o600 });
       const privateKeyPath = path.join(os.homedir(), '.ssh', 'private_key');
       await writeStdInToFile(privateKeyPath, { mode: 0o600 });

       const result = await execAsync(`ssh server 'echo "test connection"'`);
       console.log('stdout: '+ result.stdout);
       console.log('stderr: '+ result.stderr);


    });


export default command;