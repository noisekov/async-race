const changeTheme = () => {
  const container = document.querySelector('.container');
  const div = document.createElement('div');
  div.className = 'theme';
  container.append(div);
  const label = document.createElement('label');
  label.className = 'theme__label';
  label.innerText = 'White theme  ';
  div.append(label);
  const input = document.createElement('input');
  input.className = 'theme__input';
  input.type = 'checkbox';
  label.append(input);
};
changeTheme();
