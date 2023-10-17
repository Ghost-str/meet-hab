import { Command } from 'commander';
import execAsync from '../../utils/asyncExec.js';
import isEmpty from 'lodash/isEmpty.js';

const command = new Command();

command
  .name('copy-images')
  .argument('<projectName>', 'docker project name')
  .action(async (projectName) => {
    const result = await execAsync(
      `docker images -f "label=com.docker.compose.project=${projectName}" -f "dangling=false" --format json`,
    );
    console.log('result from stdout:', result.stdout);

    if (isEmpty(result.stdout)) {
      throw new Error('images not build or wrong project name');
    }

    const actions = result.stdout
      .trim()
      .split(/\r?\n/)
      .map((str) => {
        console.log('str from stdout:', str);
        const result = JSON.parse(str);

        return {
          id: result['ID'] as string,
          repository: result['Repository'] as string,
          tag: result['Tag'] as string,
        };
      })
      .map(async (imageProps) => {
        const consolePrefix = `containerId ${imageProps.id}:`;

        console.log(consolePrefix + 'processing');

        await execAsync(
          `docker save "${imageProps.id}" | bzip2 | ssh server 'bunzip2 | docker load'`,
        );

        console.log(
          consolePrefix +
            `tagging image as ${imageProps.repository}:${imageProps.tag}`,
        );

        await execAsync(
          `ssh server "docker tag ${imageProps.id} ${imageProps.repository}:${imageProps.tag}"`,
        );
      });

    await Promise.all(actions);

    console.log('up new containers');

    const upResult = await execAsync(
      `DOCKER_HOST="ssh://server" docker compose -f ../../docker-compose.prod.yaml up -d --remove-orphans`,
    );

    console.log('stderr: ', upResult.stderr);
    console.log('stdout: ', upResult.stdout);

    console.log(`clean old containers`);

    await execAsync(`DOCKER_HOST="ssh://server" docker system prune -f -a`);
  });

export default command;
