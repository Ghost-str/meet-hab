import { Command } from "commander";
import sshCommand from "./commands/ssh/index.js";


const command = new Command();


command
    .addCommand(sshCommand)



await command.parseAsync();