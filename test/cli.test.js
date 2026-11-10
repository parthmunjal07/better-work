const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const { run } = require('../bin/better-work');
const generatedFiles = [
  'AGENTS.md',
  'Plan.md',
  'specs/_template.md',
  'changes/_templates/proposal.md',
  'changes/_templates/tasks.md',
];

function withProject(run) {
  const project = fs.mkdtempSync(path.join(os.tmpdir(), 'better-work-test-'));
  try {
    run(project);
  } finally {
    fs.rmSync(project, { recursive: true, force: true });
  }
}

function execute(project, args = []) {
  const messages = [];
  run(args, project, { log: (message) => messages.push(message) });
  return messages;
}

test('creates the project workflow files', () => withProject((project) => {
  const messages = execute(project);

  for (const file of generatedFiles) {
    assert.ok(fs.existsSync(path.join(project, file)), `${file} was not created`);
    assert.ok(messages.includes(`Created ${file}`));
  }

  const spec = fs.readFileSync(path.join(project, 'specs/_template.md'), 'utf8');
  for (const question of [
    'What are we building?',
    'How should it behave?',
    'What must never happen?',
    'How will we verify it?',
  ]) {
    assert.ok(spec.includes(question));
  }

  const plan = fs.readFileSync(path.join(project, 'Plan.md'), 'utf8');
  for (const section of ['The Problem', 'Tech Stack', 'User Story', 'Features']) {
    assert.ok(plan.includes(`## ${section}`));
  }

  const instructions = fs.readFileSync(path.join(project, 'AGENTS.md'), 'utf8');
  assert.ok(instructions.includes('## Atomic commits'));
  assert.ok(instructions.includes('## Spec-driven development'));
}));

test('rerunning skips every existing file without changing it', () => withProject((project) => {
  execute(project);
  const before = generatedFiles.map((file) => fs.readFileSync(path.join(project, file), 'utf8'));

  const messages = execute(project);

  assert.deepEqual(messages, generatedFiles.map((file) => `Skipped ${file} (already exists)`));
  assert.deepEqual(
    generatedFiles.map((file) => fs.readFileSync(path.join(project, file), 'utf8')),
    before,
  );
}));

test('preserves an existing file while creating missing files', () => withProject((project) => {
  const existing = path.join(project, 'AGENTS.md');
  fs.writeFileSync(existing, 'My existing instructions\n');

  const messages = execute(project);

  assert.equal(fs.readFileSync(existing, 'utf8'), 'My existing instructions\n');
  assert.ok(messages.includes('Skipped AGENTS.md (already exists)'));
  assert.ok(fs.existsSync(path.join(project, 'specs/_template.md')));
  assert.ok(fs.existsSync(path.join(project, 'Plan.md')));
}));

test('creates a change from editable project templates', () => withProject((project) => {
  execute(project);
  fs.writeFileSync(path.join(project, 'changes/_templates/proposal.md'), '# Custom proposal\n');

  const messages = execute(project, ['new', 'add-login']);
  const change = path.join(project, 'changes/add-login');

  for (const file of ['proposal.md', 'spec.md', 'tasks.md']) {
    assert.ok(fs.existsSync(path.join(change, file)));
    assert.ok(messages.includes(`Created changes/add-login/${file}`));
  }
  assert.equal(fs.readFileSync(path.join(change, 'proposal.md'), 'utf8'), '# Custom proposal\n');
  assert.match(fs.readFileSync(path.join(change, 'tasks.md'), 'utf8'), /- \[ \]/);

  fs.writeFileSync(path.join(change, 'tasks.md'), '# My tasks\n');
  const rerun = execute(project, ['new', 'add-login']);
  assert.ok(rerun.includes('Skipped changes/add-login/tasks.md (already exists)'));
  assert.equal(fs.readFileSync(path.join(change, 'tasks.md'), 'utf8'), '# My tasks\n');
}));

test('rejects unsafe change names before writing files', () => withProject((project) => {
  assert.throws(() => execute(project, ['new', '../outside']), /Change name must use/);
  assert.deepEqual(fs.readdirSync(project), []);
}));

test('optionally preloads the requested design skills into the project', () => withProject((project) => {
  const installed = [];
  const messages = [];
  run(['init', '--with-design-skills'], project, { log: (message) => messages.push(message) },
    (source, skill, cwd) => installed.push([source, skill, cwd]));

  assert.ok(fs.existsSync(path.join(project, 'AGENTS.md')));
  assert.deepEqual(installed, [
    ['anthropics/skills', 'frontend-design', project],
    ['https://uizze.sh', 'ui-taste', project],
    ['nextlevelbuilder/ui-ux-pro-max-skill', 'ui-ux-pro-max', project],
  ]);
  assert.ok(messages.includes('Installed ui-taste from https://uizze.sh'));
}));

test('design command installs skills without replacing project files', () => withProject((project) => {
  fs.writeFileSync(path.join(project, 'AGENTS.md'), 'Custom instructions\n');
  const installed = [];
  run(['design'], project, { log() {} }, (source, skill) => installed.push(skill));

  assert.deepEqual(installed, ['frontend-design', 'ui-taste', 'ui-ux-pro-max']);
  assert.equal(fs.readFileSync(path.join(project, 'AGENTS.md'), 'utf8'), 'Custom instructions\n');
}));
