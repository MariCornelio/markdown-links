import { existsSync, lstatSync, readdirSync } from 'node:fs';
import { extname, isAbsolute, join, resolve } from 'node:path';
import MarkdownIt from 'markdown-it';

import { readFile } from 'node:fs/promises';
import { loopTokens } from './markdown-it.js';

// valida si el path se manda vacío o simplemente no existe
export const pathValidate = (path) => existsSync(path) ? true : false;

// Verifica si el path es relativo y sino lo convierte a absoluto
export const pathAbsolute = (path) => isAbsolute(path) ? path : resolve(path);

// verifica si el path es un directorio y luego guardarlo en un arreglo
export const filterMarkdown = (path, functionPathAbsolute) => {
  let arraymarkdown = [];
  const pathAbsolute = functionPathAbsolute(path);
  const fileExt = extname(pathAbsolute);
  // probar si es un directorio
  if (lstatSync(pathAbsolute).isDirectory()) {
    readdirSync(pathAbsolute).forEach(e => {

      // si no se pone los tres puntitos entonces botaría arrays anidados
      arraymarkdown.push(...filterMarkdown(join(pathAbsolute, e), functionPathAbsolute));
    });
  }
  // si no es un directorio y  la vez si  es archivo md
  else if (fileExt === '.md' || fileExt === '.mdown' || fileExt === '.markdown' || fileExt === '.markdn') {
    arraymarkdown.push(pathAbsolute);
  }
  return arraymarkdown;
}

export const getLinks = (path) => {
  const md = new MarkdownIt();
  return readFile(path, 'utf-8')
    .then(file => {
      let arrayTokens = md.parse(file, {});
      return loopTokens(arrayTokens, path);
    })
    .catch(() => 'Cannot read file')
}

export const getAllLinks = (path) => {
  const arrayMarkdown = filterMarkdown(path, pathAbsolute).map(file => getLinks(file));
  return Promise.all(arrayMarkdown);
}

export const infoFetchLinks = (arrayLinks) => {
  const linksInfo = arrayLinks.map((obj) =>
    fetch(obj.href)
      .then(res => {
        if (res.ok) return { ...obj, status: res.status, ok: 'ok' }
        return { ...obj, status: res.status, ok: 'fail' }
      })
      .catch((err) => {
        return { ...obj, status: `Unexpected error`, ok: 'fail' }
      })
  )
  return Promise.all(linksInfo);
}
