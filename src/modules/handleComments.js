const baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const appID = 'cEtwlqneMRRYCtlfnIeQ';

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

  return result;
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
  const name = form.querySelector('input');
  const comment = form.querySelector('textarea');

  await postComment(name.value, comment.value, idMeal);
  await displayComments(idMeal);
  form.reset();
};

export { displayComments, addComment };
