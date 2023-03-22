#!/usr/bin/env node
import colors from 'colors';
import { table } from 'table';

import { mdLinks } from './mdLinks.js';
import { brokenLinks, totalLinks, uniqueLinks } from './stats.js';

import { inputEntered, optionList, pause } from "./helpersCLI.js";

const loopPause = (route) => {
  return optionList()
    .then((resp) => {
      const opt = resp.option;
      // console.log({ opt });
      switch (opt) {
        case '1':
          return mdLinks(route)
            .then(arr => {
              const data = arr.map((obj) => [obj.href, colors.magenta(obj.line), obj.text, obj.file]);
              data.unshift([colors.cyan('HREF'), colors.cyan('LINE'), colors.cyan('TEXT'), colors.cyan('FILE')]);
              const config = {
                columns: {
                  0: { width: 25 },
                  1: { alignment: 'center' },
                  2: {
                    width: 20,
                    truncate: 50,
                  },
                  3: { width: 25 },

                },
                header: {
                  alignment: 'center',
                  content: colors.green('Default') + colors.magenta('\n Extract links from Markdown file(s)'),
                },
              };
              console.log(colors.gray(table(data, config)));
            })
            .catch((err) => {
              console.log('\n' + colors.red(err));
              console.log(colors.magenta('========================================================='));
              process.exit();
            });
        case '2':
          return mdLinks(route, { validate: true })
            .then(arr => {
              const data = arr.map((obj) => [obj.href, colors.magenta(obj.line), obj.text, obj.file, obj.status === 200 ? colors.green(obj.status) : colors.red(obj.status), obj.ok === 'ok' ? colors.bgGreen.bold(obj.ok) : colors.bgRed.bold(obj.ok)]);
              data.unshift([colors.cyan('HREF'), colors.cyan('LINE'), colors.cyan('TEXT'), colors.cyan('FILE'), colors.cyan('STATUS'), colors.cyan('OK')]);
              const config = {
                columns: {
                  0: { width: 25 },
                  1: { alignment: 'center' },
                  2: {
                    width: 20,
                    truncate: 50,
                  },
                  3: { width: 25 },
                  4: {
                    width: 6,
                    alignment: 'center'
                  },
                  5: { alignment: 'center' },
                },
                header: {
                  alignment: 'center',
                  content: colors.cyan('--validate') + colors.magenta('\n Extract links and validate with an HTTP response the Markdown file(s)'),
                },
              };
              console.log(colors.gray(table(data, config)));
            })
            .catch((err) => {
              console.log('\n' + colors.red(err));
              console.log(colors.magenta('========================================================='));
              process.exit();
            });
        case '3':
          return mdLinks(route, { validate: false })
            .then(arr => {
              const data = [
                ['Total', colors.green(totalLinks(arr))],
                ['Unique', colors.green(uniqueLinks(arr))],
              ];
              const config = {
                columnDefault: {
                  width: 15,
                  alignment: 'center',
                },
                header: {
                  alignment: 'center',
                  content: colors.cyan('--stats') + colors.magenta('\n Returns the total of links found in the Markdown file(s) and how many are unique'),
                }
              };

              console.log(colors.gray(table(data, config)));
            })
            .catch((err) => {
              console.log('\n' + colors.red(err));
              console.log(colors.magenta('========================================================='));
              process.exit();
            });
        case '4':
          return mdLinks(route, { validate: true })
            .then(arr => {
              const data = [
                ['Total', colors.green(totalLinks(arr))],
                ['Unique', colors.green(uniqueLinks(arr))],
                ['Broken', colors.green(brokenLinks(arr))],
              ];
              const config = {
                columnDefault: {
                  width: 15,
                  alignment: 'center',
                },
                header: {
                  alignment: 'center',
                  content: colors.cyan('--stats --validate') + colors.magenta('\n Returns the total of links found in the Markdown file(s), how many are unique   and how many are broken'),
                }
              };

              console.log(colors.gray(table(data, config)));
            })
            .catch((err) => {
              console.log('\n' + colors.red(err));
              console.log(colors.magenta('========================================================='));
              process.exit();
            });


        case '5':
          const data = [
            [colors.green('Default'), 'Extract links from Markdown file(s) if  path exists'],
            [colors.cyan('--validate'), 'Extract links and validate with an HTTP response the Markdown file(s)'],
            [colors.cyan('--stats'), 'Returns the total of links found in the Markdown file(s) and how many are unique'],
            [colors.cyan('--stats --validate'), 'Returns the total of links found in the Markdown file(s), how many are unique   and how many are broken'],
            [colors.green('Help'), 'Shows descriptive table of each of the  options'],
            [colors.red('Exit'), 'Exit module execution'],
          ];
          const config = {
            columns: {
              1: { width: 40 },
            },
            header: {
              alignment: 'center',
              content: colors.magenta('HELP\nDescription of the options'),
            },
          };
          console.log(colors.gray(table(data, config)));
          break;
        case '6':
          console.log(colors.magenta('========================================================='));
          process.exit();
      }

    })

    .then(() => {
      return pause();
    })
    .then(() => {
      console.log('\n');
      console.log(colors.magenta('The path entered is: ') + colors.cyan(route));
      return loopPause(route);
    });
};

const main = () => {
  inputEntered()
    .then(resp => {
      const route = resp.newPath;
      loopPause(route);
    });
};
main();

