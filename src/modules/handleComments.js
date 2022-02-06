import fetch from 'cross-fetch';

const baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const appID = 'xXV7QwFcLUFKVHZPVZim';

const postComment = async (username, comment, idMeal) => {
  const resolve = await fetch(`${baseURL}/${appID}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: idMeal,
      username,
      comment,
    }),
    headers: { 'Content-type': 'application/JSON' },
  });

  const result = await resolve.text();
  return result;
};

const getComment = async (idMeal) => {
  const resolve = await fetch(`${baseURL}/${appID}/comments?item_id=${idMeal}`);
  const result = await resolve.json();

  if (!result.length) {
    return [];
  }

  return result;
};

const commentsCounter = async (idMeal) => {
  const commentsNum = await getComment(idMeal);
  if (!commentsNum.length) {
    return 0;
  }
  return commentsNum.length;
};

const commentTemplate = (date, name, comment) => `
  <li>
    <span>${date}</span>
    <span>${name}: </span>
    <span>${comment}</span>
  </li>
`;

const displayComments = async (idMeal) => {
  const ul = document.querySelector('ul');
  const commentArr = await getComment(idMeal);
  ul.innerHTML = '';
  let html = '';

  commentArr.forEach((element) => {
    const commentItem = commentTemplate(
      element.creation_date,
      element.username,
      element.comment,
    );
    html += commentItem;
  });
  ul.insertAdjacentHTML('beforeend', html);
};

const addComment = async (event, form, idMeal) => {
  event.preventDefault();
  const number = document.querySelector('.counter');
  const name = form.querySelector('input');
  const comment = form.querySelector('textarea');

  await postComment(name.value, comment.value, idMeal);
  await displayComments(idMeal);
  number.textContent = await commentsCounter(idMeal);
  form.reset();
};

export {
  displayComments, addComment, commentsCounter, getComment,
};
