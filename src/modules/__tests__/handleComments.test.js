import { getComment, commentsCounter } from '../handleComments.js';

const id = '52961';

describe('Items (meals) Counter', () => {
  test('Display the Number of Comments', async () => {
    const comment = await getComment(id);
    const commentsCount = await commentsCounter(id);
    expect(commentsCount).toBe(comment.length);
  });
});
