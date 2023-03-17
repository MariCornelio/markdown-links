// const fs = require('fs');
import { filterMarkdown, getAllLinks, infoFetchLinks, pathAbsolute, pathValidate } from './api.js';


export const mdLinks = (path, options = { validate: false }) => {
  return new Promise((resolve, reject) => {
    if (pathValidate(path)) {
      // rechaza si no hay archivos Markdown
      if (filterMarkdown(path, pathAbsolute).length === 0) return reject('It is not a markdown file or there are no markdown files in this path');

      // obteniendo los link devueltos como promesas
      getAllLinks(path)
        .then(resp => {
          const response = resp.flat();
          // rechaza si no hay links en el directorio
          if (response.length === 0) return reject('There are no links in the Markdown file(s)');
          if (options.validate === true) {
            // devuelve lo devuelto por fetch
            infoFetchLinks(response).then(res => resolve(res))
          } else {
            return resolve(resp.flat())
          }
        })
        .catch((err => {
          // rechaza si ocurre un error de lectura de archivos
          return reject(err)
        }))

    } else {
      // rechaza si el path no existe
      return reject('Invalid path: It is empty or does not exist');
    }
  })
}
// module.exports = { mdLinks };
// module.exports = () => {
//   mdLinks
// };
