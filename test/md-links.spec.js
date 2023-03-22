import { mdLinks } from '../src/mdLinks.js';
import { getAllLinks } from '../src/api.js';


describe('mdLinks', () => {
  const validateFalse = [
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
    {
      href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
      text: 'Este es un ejemplo de como truncar palabras en 50 caracteres',
      line: 1,
      file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\styles\\images\\file2.mdown'
    }
  ];
  const validateTrue = [

    {
      href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
      text: 'Este es un ejemplo de como truncar palabras en 50 caracteres',
      line: 1,
      file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\styles\\images\\file2.mdown',
      status: 200,
      ok: 'ok',
    }

  ];

  beforeEach(() => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        status: 200,
      });
    });
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('mdLinks debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Debe rechazar cuando el path es vacío', () => {
    return expect(mdLinks()).rejects.toBe('Invalid path: It is empty or does not exist');
  });

  it('Debe rechazar cuando el path no existe', () => {
    return expect(mdLinks('estePathNoexiste.md')).rejects.toBe('Invalid path: It is empty or does not exist');
  });

  it('Deberia rechazar si el path no es un archivo markdown', () => {
    return expect(mdLinks('example/others/promesa.js')).rejects.toBe('It is not a markdown file or there are no markdown files in this path');
  });

  it('Deberia rechazar si el path no contiene archivos markdown', () => {
    return expect(mdLinks('example/js')).rejects.toBe('It is not a markdown file or there are no markdown files in this path');
  });

  it('Deberia rechazar si el path no contiene contiene links', () => {
    return expect(mdLinks('example/others')).rejects.toBe('There are no links in the Markdown file(s)');
  });

  it('Debería devolver un arreglo si encuentra links y sin segundo parámetro', () => {
    return expect(mdLinks('example')).resolves.toStrictEqual(validateFalse);
  });

  it('Debería devolver un arreglo si encuentra links con validate:false', () => {
    return expect(mdLinks('example', { validate: false })).resolves.toStrictEqual(validateFalse);
  });

  it('Debería devolver un arreglo si encuentra links con validate:true', () => {
    return expect(mdLinks('example/styles/images', { validate: true })).resolves.toStrictEqual(validateTrue);
  });




});
