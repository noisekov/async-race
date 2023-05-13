/* eslint-disable */
const createElement = (tag, className, text = '', column, row) => {
  const node = document.createElement(`${tag}`);
  node.className = `${className}`;
  node.innerText = `${text}`;
  if (column && row) {
    node.dataset.column = column;
    node.dataset.row = row;
  }
  return node;
};
export { createElement };