const baseURL =
  "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/";
const appID = "O1gUGEw2wHMxihV7khuJ";

const postLike = async (id) => {
  const resolve = await fetch(`${baseURL}${appID}/likes/`, {
    method: "POST",
    body: JSON.stringify({ item_id: id }),
    headers: { "Content-type": "application/JSON" },
  });

  return resolve;
};

const getLike = async () => {
  const resolve = await fetch(`${baseURL}${appID}/likes/`);
  const result = await resolve.json();

  return result;
};

export { getLike, postLike };
