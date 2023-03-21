import { promises } from 'fs';
import { filterMarkdown, getAllLinks, getLinks, infoFetchLinks, pathAbsolute, pathValidate } from "../src/api.js";


// Para esta prueba se uso la carpeta example (por favor no borrar)
describe('pathValidate', () => {
  it('Debería retornar true si el path existe', () => {
    expect(pathValidate('example')).toBeTruthy();
  })
  it('Debería retornar true si el path existe', () => {
    expect(pathValidate('ruta/inexistente')).toBeFalsy();
  })
})
describe('pathAbsolute', () => {
  it('Debería devolver una ruta absoluta para cualquie path ingresado', () => {
    expect(pathAbsolute('example')).toBe('C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example')
  })

})

describe('pathAbsolute', () => {
  it('Debería devolver una array con los archivos Markdown', () => {
    const arrayMD = [
      'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md',
      'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\others\\file3.md',
      'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\styles\\images\\file2.mdown'
    ]
    expect(filterMarkdown('example', pathAbsolute)).toStrictEqual(arrayMD);
  })

})
describe('pathAbsolute', () => {
  it('Debería devolver una array con los archivos Markdown', () => {
    const arrayMD = [
      'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md',
      'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\others\\file3.md',
      'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\styles\\images\\file2.mdown'
    ]
    expect(filterMarkdown('example', pathAbsolute)).toStrictEqual(arrayMD);
  })

})

describe('getLinks', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Debería retornar un arreglo con objetos que contienen información de los links si la promesa es resuelta', () => {
    // jest.requireActual('node:fs/promises');
    const arrayinfoLinks = [
      {
        href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
        text: 'Asíncronía en js',
        line: 1,
        file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md'
      },
      {
        href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
        text: 'Arreglos',
        line: 6,
        file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/ggg',
        text: 'Array - MDN',
        line: 7,
        file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md'
      },
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        line: 11,
        file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md'
      },
    ]
    return expect(getLinks('C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md')).resolves.toEqual(arrayinfoLinks);
  })

  it('getLinks should handle error with catch', () => {
    // Mockear la función fs.promises.readFile para que falle y lance un error, no importa que error lance porque no estoy manejando el error en el .catch
    jest.spyOn(promises, 'readFile').mockRejectedValue('Error');

    return expect(getLinks('path')).resolves.toBe('Cannot read file')

  });
})

describe('getAllLinks', () => {
  it('Retorna un arreglo con la información de los links encontrados en todos los archivos Markdown', () => {
    const infoLinks = [
      [
        {
          href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
          text: 'Asíncronía en js',
          line: 1,
          file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md'
        },
        {
          href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
          text: 'Arreglos',
          line: 6,
          file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md'
        },
        {
          href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/ggg',
          text: 'Array - MDN',
          line: 7,
          file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md'
        },
        {
          href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
          text: 'md-links',
          line: 11,
          file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md'
        },
      ],
      [],
      [
        {
          href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
          text: 'Este es un ejemplo de como truncar palabras en 50 caracteres',
          line: 1,
          file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\styles\\images\\file2.mdown'
        }
      ]
    ]
    return expect(getAllLinks('example')).resolves.toStrictEqual(infoLinks);

  })
})

describe('infoFetchLinks', () => {
  const linksInfo = [
    {
      href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
      text: 'Asíncronía en js',
      line: 1,
      file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md'
    },
    {
      href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
      text: 'Arreglos',
      line: 6,
      file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md'
    },
  ]
  const fetchOK = [
    {
      href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
      text: 'Asíncronía en js',
      line: 1,
      file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md',
      status: 200,
      ok: 'ok',
    },
    {
      href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
      text: 'Arreglos',
      line: 6,
      file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md',
      status: 200,
      ok: 'ok',
    },
  ]
  const fetchFail = [
    {
      href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
      text: 'Asíncronía en js',
      line: 1,
      file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md',
      status: 404,
      ok: 'fail',
    },
    {
      href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
      text: 'Arreglos',
      line: 6,
      file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md',
      status: 404,
      ok: 'fail',
    },
  ]
  const fetchUnexpectedError = [
    {
      href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
      text: 'Asíncronía en js',
      line: 1,
      file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md',
      status: 'Unexpected error',
      ok: 'fail',
    },
    {
      href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
      text: 'Arreglos',
      line: 6,
      file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md',
      status: 'Unexpected error',
      ok: 'fail',
    },
  ]
  afterEach(() => {
    global.fetch.mockRestore();

  })
  it('Retorna un arreglo con el estado "ok" de los links devueltos por fetch', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
    })
    return expect(infoFetchLinks(linksInfo)).resolves.toStrictEqual(fetchOK);
  });


  it('Retorna un arreglo con el estado "Unexpected error" de los links devueltos por fetch', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
    })
    return expect(infoFetchLinks(linksInfo)).resolves.toStrictEqual(fetchFail);
  });


  it('Retorna un arreglo con el estado "fail" de los links devueltos por fetch', () => {
    jest.spyOn(global, 'fetch').mockRejectedValue('Error')
    return expect(infoFetchLinks(linksInfo)).resolves.toStrictEqual(fetchUnexpectedError);
  });

})




