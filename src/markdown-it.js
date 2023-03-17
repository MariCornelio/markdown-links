export const loopTokens = (tokens, path) => {
  // console.log(path);
  const linksComplejos = [];
  for (let i = 0; i < tokens.length; i++) {
    // propagar información de la propiedad map en los hijos
    if (tokens[i].children && tokens[i].children.length > 0) {
      // Recorrer los hijos del token
      for (let j = 0; j < tokens[i].children.length; j++) {
        const child = tokens[i].children[j];

        // Si el hijo no tiene información de ubicación
        if (child.map === null) {
          // Propagar la información de ubicación del token padre
          child.map = tokens[i].map;
        }
      }
    }
    // implentando función recursiva
    if (tokens[i].children) {
      linksComplejos.push(...loopTokens(tokens[i].children, path));
    };
    // obtener tokens de tipo links y que no sean enlaces de tipo id
    if (tokens[i].type === 'link_open' && !tokens[i].attrs[0][1].startsWith('#')) {
      let nextToken = tokens[i + 1];
      if (nextToken.type === 'text' && tokens[i + 2].type === 'link_close') {
        linksComplejos.push({
          href: tokens[i].attrs[0][1],
          text: nextToken.content,
          line: tokens[i].map[0] + 1 === tokens[i].map[1] ? tokens[i].map[1] : `${tokens[i].map[0] + 1}-${tokens[i].map[1]}`,
          file: path,
        })
      }
    }

    if (tokens[i].type === 'image') {
      const srcAttr = tokens[i].attrs.find(a => a[0] === 'src');
      linksComplejos.push({
        href: srcAttr[1],
        text: tokens[i].content,
        line: tokens[i].map[0] + 1 === tokens[i].map[1] ? tokens[i].map[1] : `${tokens[i].map[0] + 1}-${tokens[i].map[1]}`,
        file: path,
      })
    }
  }
  return linksComplejos;
}