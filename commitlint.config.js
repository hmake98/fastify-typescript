module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation
        'style', // Formatting, missing semi colons, etc; no code change
        'refactor', // Refactoring production code
        'test', // Adding tests, refactoring tests; no production code change
        'chore', // Updating build tasks, package manager configs, etc; no production code change
        'perf', // A code change that improves performance
        'revert', // Reverts a previous commit
        'ci', // Changes to our CI configuration files and scripts
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'api',
        'frontend',
        'backend',
        'docs',
        'tests',
        'config',
        'chore',
        'build',
        'deps',
      ],
    ],
  },
};
