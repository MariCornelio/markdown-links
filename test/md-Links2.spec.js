import { getAllLinks } from '../src/api.js';
import { mdLinks } from '../src/mdLinks.js';


jest.mock('../src/api.js', () => {
  const originalModule = jest.requireActual('../src/api.js');
  return {
    ...originalModule,
    getAllLinks: jest.fn()
  };
});


describe("mdLinks2", () => {
  it("Debería rechazar si ocurre un error al obtener los links", () => {
    getAllLinks.mockReturnValue(Promise.reject("Cannot read file"));
    return expect(mdLinks('example')).rejects.toBe('Cannot read file')
  });
});