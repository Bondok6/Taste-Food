const baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const appID = 'cEtwlqneMRRYCtlfnIeQ';

const postLike = async (id) => {
  const resolve = await fetch(`${baseURL}${appID}/likes/`, {
    method: 'POST',
    body: JSON.stringify({ item_id: id }),
    headers: { 'Content-type': 'application/JSON' },
  });

  const result = await resolve.text();

  return result;
};

const getLike = async () => {
  const resolve = await fetch(`${baseURL}${appID}/likes/`);
  const result = await resolve.json();

  return result;
};

export { getLike, postLike };
