#!/usr/bin/env node
import { mdLinks } from './mdLinks.js';
import { isAbsolute, resolve } from 'node:path';
import { brokenLinks, totalLinks, uniqueLinks } from './stats.js';
mdLinks('example', { validate: true })
  .then((resolve) => {
    console.log(resolve);
    console.log(totalLinks(resolve));
    console.log(uniqueLinks(resolve));
    console.log(brokenLinks(resolve));

  })
  .catch((error) => {
    console.log(error)
  })


// Capture links, run validations and more
