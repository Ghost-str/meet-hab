import { Command, InvalidArgumentError } from "commander";
import fs from "node:fs/promises";
import isEmpty from 'lodash/isEmpty.js';
import execAsync from "../../utils/asyncExec.js";



const command = new Command();

command
    .name('ssh')
    .description('setup ssh')
    .argument('<hostName>', 'ssh host name')
    .argument('<user>', 'ssh user')
    .argument('<port>', 'ssh port')
    .argument('<envVar>', 'environment variable from which to take the private key')
    .action(async (hostName, user, port, envVar)=>{
        const privateKey = process.env[envVar] as string;
        if (isEmpty(privateKey)) {
            throw new InvalidArgumentError('envVar is empty');
        }

        await fs.mkdir('~/.ssh', { mode: 0o700});
        
        await fs.appendFile('~/.ssh/config',`
Host server
    HostName ${hostName}
    User ${user}
    Port ${port}
    PubKeyAuthentication yes
    StrictHostKeyChecking no
    IdentityFile ~/.ssh/private_key    
`, { mode: 0o600 });

        await fs.appendFile('~/.ssh/private_key', privateKey, { mode: 0o600});

       const result = await execAsync(`ssh server 'echo "test connection"'`);
       console.log('stdout: '+ result.stdout);
       console.log('stderr: '+ result.stderr);


    });


export default command;