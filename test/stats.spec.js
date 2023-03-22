import { brokenLinks, totalLinks, uniqueLinks } from "../src/stats.js";

describe('totalLinks', () => {
  const arrayStats = [
    {
      href: 'https://carlosazaustre.es/manejando-la-asincronia-en-javascript',
      text: 'Asíncronía en js',
      line: 1,
      file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md',
      status: 200,
      ok: 'ok'
    },
    {
      href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
      text: 'Arreglos',
      line: 6,
      file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md',
      status: 200,
      ok: 'ok'
    },
    {
      href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/ggg',
      text: 'Array - MDN',
      line: 7,
      file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md',
      status: 404,
      ok: 'fail'
    },
    {
      href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
      text: 'md-links',
      line: 11,
      file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\file1.md',
      status: 200,
      ok: 'ok'
    },
    {
      href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
      text: 'Este es un ejemplo de como truncar palabras en 50 caracteres',
      line: 1,
      file: 'C:\\Users\\Laboratoria\\Desktop\\laboratoria\\markdown-links\\example\\styles\\images\\file2.mdown',
      status: 200,
      ok: 'ok'
    }
  ];

  it('Debería retornar el total de links', () => {
    expect(totalLinks(arrayStats)).toBe(5);
  });

  it('Debería retornar el total  de links únicos', () => {
    expect(uniqueLinks(arrayStats)).toBe(4);
  });

  it('Debería retornar el total  de links rotos', () => {
    expect(brokenLinks(arrayStats)).toBe(1);
  });

});