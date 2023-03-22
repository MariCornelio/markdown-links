import inquirer from 'inquirer';
import colors from 'colors';

export const inputEntered = () => {
  const path = [
    {
      type: 'input',
      name: 'newPath',
      message: 'Enter your path to get started: ',
    }
  ];
  console.log(`${colors.bgMagenta('Linkval')} : ${colors.cyan('Capture links, run validations and more')} ${colors.magenta('(start)')}`);
  console.log(colors.magenta('========================================================='));
  return inquirer.prompt(path);
};

export const optionList = () => {
  const options = [
    {
      type: 'list',
      name: 'option',
      message: 'Select an option',
      choices: [
        {
          value: '1',
          name: colors.green('Default')
        },
        {
          value: '2',
          name: '--validate'
        },
        {
          value: '3',
          name: '--stats'
        },
        {
          value: '4',
          name: '--stats --validate'
        },
        {
          value: '5',
          name: colors.green('Help')
        },
        {
          value: '6',
          name: colors.red('Exit')
        },
      ]
    }
  ];

  return inquirer.prompt(options);
};

export const pause = () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Press ${'ENTER'.green} to continue... `
    }
  ];
  console.log('\n');
  return inquirer.prompt(question);
};