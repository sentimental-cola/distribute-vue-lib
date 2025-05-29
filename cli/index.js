#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const initCommand = require('./commands/init');
const addCommand = require('./commands/add');
const listCommand = require('./commands/list');

program
  .name('distribute-cli')
  .description('CLI for Distribute Vue Library')
  .version('0.0.1');

program
  .command('init')
  .description('Initialize project configuration (components.json)')
  .action(initCommand);

program
  .command('add <componentName>')
  .description('Add a component or utility to your project')
  .action(addCommand);

program
  .command('list')
  .description('List all available components and utilities')
  .action(listCommand);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
