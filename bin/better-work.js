#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const designSkills = [
  ['anthropics/skills', 'frontend-design'],
  ['https://uizze.sh', 'ui-taste'],
  ['nextlevelbuilder/ui-ux-pro-max-skill', 'ui-ux-pro-max'],
];

const starterFiles = [
  'AGENTS.md',
  'ARCHITECTURE.md',
  'Plan.md',
  path.join('specs', '_template.md'),
  path.join('changes', '_templates', 'proposal.md'),
  path.join('changes', '_templates', 'tasks.md'),
];

function copyIfMissing(source, destination, label, output) {
  fs.mkdirSync(path.dirname(destination), { recursive: true });

  try {
    fs.copyFileSync(source, destination, fs.constants.COPYFILE_EXCL);
    output.log(`Created ${label}`);
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
    output.log(`Skipped ${label} (already exists)`);
  }
}

function install(cwd, output = console) {
  for (const file of starterFiles) {
    copyIfMissing(
      path.join(__dirname, '..', 'templates', file),
      path.join(cwd, file),
      file,
      output,
    );
  }
}

function createChange(cwd, name, output = console) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name || '')) {
    throw new Error('Change name must use lowercase letters, numbers, and hyphens (example: add-login).');
  }

  install(cwd, output);

  for (const [template, file] of [
    [path.join('changes', '_templates', 'proposal.md'), 'proposal.md'],
    [path.join('specs', '_template.md'), 'spec.md'],
    [path.join('changes', '_templates', 'tasks.md'), 'tasks.md'],
  ]) {
    const destination = path.join('changes', name, file);
    copyIfMissing(path.join(cwd, template), path.join(cwd, destination), destination, output);
  }
}

function addDesignSkill(source, skill, cwd) {
  execFileSync('npx', ['--yes', 'skills', 'add', source, '--skill', skill, '--agent', '*', '--yes'], {
    cwd,
    stdio: 'inherit',
  });
}

function installDesignSkills(cwd, output, addSkill) {
  for (const [source, skill] of designSkills) {
    addSkill(source, skill, cwd);
    output.log(`Installed ${skill} from ${source}`);
  }
}

function run(args, cwd = process.cwd(), output = console, addSkill = addDesignSkill) {
  if (args.length === 0 || (args.length === 1 && args[0] === 'init')) {
    install(cwd, output);
  } else if (args.length === 2 && args[0] === 'init' && args[1] === '--with-design-skills') {
    install(cwd, output);
    installDesignSkills(cwd, output, addSkill);
  } else if (args.length === 1 && args[0] === 'design') {
    installDesignSkills(cwd, output, addSkill);
  } else if (args.length === 2 && args[0] === 'new') {
    createChange(cwd, args[1], output);
  } else if (args.length === 1 && (args[0] === '--help' || args[0] === '-h')) {
    output.log('Usage: better-work [init [--with-design-skills] | design | new <change-name>]');
  } else {
    throw new Error('Usage: better-work [init [--with-design-skills] | design | new <change-name>]');
  }
}

if (require.main === module) {
  try {
    run(process.argv.slice(2));
  } catch (error) {
    console.error(`better-work: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { install, createChange, run };
