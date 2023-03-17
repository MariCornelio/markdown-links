import { mdLinks } from '../src/mdLinks.js';


describe('mdLinks', () => {
  it('mdLinks debería ser una función', () => {
    expect(typeof mdLinks).toBe('function')
  })

  it('Debe rechazar cuando el path es vacío', () => {
    return expect(mdLinks()).rejects.toBe('Invalid path: It is empty or does not exist')
  })

  it('Debe rechazar cuando el path no existe', () => {
    return expect(mdLinks('estePathNoexiste.md')).rejects.toBe('Invalid path: It is empty or does not exist')
  })

  it('Deberia rechazar si el path no es un archivo markdown', () => {
    return expect(mdLinks('example/others/promesa.js')).rejects.toBe('It is not a markdown file or there are no markdown files in this path')
  })

  it('Deberia rechazar si el path no contiene archivos markdown', () => {
    return expect(mdLinks('example/js')).rejects.toBe('It is not a markdown file or there are no markdown files in this path')
  })

});
