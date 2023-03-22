export const totalLinks = (arrayLinks) => arrayLinks.length;

export const uniqueLinks = (arrayLinks) => {
  const links = arrayLinks.map(obj => obj.href);
  const set = new Set(links);
  return set.size;
};
export const brokenLinks = (arrayLinks) => {
  const ArrayObjFail = arrayLinks.filter(obj => obj.ok === 'fail');
  return ArrayObjFail.length;
};