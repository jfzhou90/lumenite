import uuid from 'uuid/v4';

export const generateUuid = () => {
  const el = document.createElement('textarea');
  el.value = uuid();
  el.setAttribute('readonly', '');
  el.style = { position: 'absolute', left: '-9999px' };
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
