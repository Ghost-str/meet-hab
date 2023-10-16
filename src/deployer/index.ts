import { Command } from 'commander';
import sshCommand from './commands/ssh/index.js';
import copyImage from './commands/copy_images/index.js';

const command = new Command();

command.addCommand(sshCommand).addCommand(copyImage);

await command.parseAsync();
