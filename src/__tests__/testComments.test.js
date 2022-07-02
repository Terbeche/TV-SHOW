/**
 * @jest-environment jsdom
*/

describe('Test Comments adding Functionality', () => {
  const commentForm = document.createElement('form');
  commentForm.classList.add('comment-form');
  const commentTitle = document.createElement('h2');
  commentTitle.classList.add('comment-item');
  commentTitle.innerHTML = 'Add a comment';
  const addNameInput = document.createElement('input');
  addNameInput.classList.add('comment-item');
  addNameInput.placeholder = 'Your name';
  const addCommentInput = document.createElement('textarea');
  addCommentInput.classList.add('comment-item');
  addCommentInput.placeholder = 'Your insights';
  const addCommentButton = document.createElement('button');
  addCommentButton.classList.add('comment-item');
  addCommentButton.innerHTML = 'Comment';

  const moviePopup = document.createElement('div');
  moviePopup.innerHTML = '';

  const comedyMovie = document.createElement('div');
  comedyMovie.classList.add('movie-div');

  const comedyImage = document.createElement('img');
  comedyImage.src = 'image';
  const movieTitle = document.createElement('label');
  movieTitle.innerHTML = 'name';
  const movieStatus = document.createElement('label');
  movieStatus.innerHTML = 'status';
  const moviePremiered = document.createElement('label');
  moviePremiered.innerHTML = 'premiered';

  const commentDisplay = document.createElement('h2');
  commentDisplay.innerHTML = 'Comments';
  const commentList = document.createElement('ul');

  comedyMovie.append(comedyImage);
  comedyMovie.append(movieTitle);
  comedyMovie.append(movieStatus);
  comedyMovie.append(moviePremiered);

  comedyMovie.append(commentDisplay);
  comedyMovie.append(commentList);

  commentForm.append(commentTitle);
  commentForm.append(addNameInput);
  commentForm.append(addCommentInput);
  commentForm.append(addCommentButton);
  comedyMovie.append(commentForm);
  moviePopup.append(comedyMovie);

  document.body.append(moviePopup);

  const commentCounter = () => {
    const commentCount = commentList.children.length;
    return commentCount;
  };

  const addComment = () => {
    const singleComment = document.createElement('li');
    const commentUser = 'my name';
    const commentContent = 'comment content';
    const commentDate = '23/06/2022';
    singleComment.innerHTML = `${commentDate} ${commentUser} : ${commentContent}`;

    commentList.append(singleComment);
  };

  test('number of comment should be equal to 0 in the start', () => {
    expect(commentCounter(10428)).toBe(0);
  });

  test('number of comment should be equal to 1 after adding one comment', () => {
    addComment();
    expect(commentCounter(10428)).toBe(1);
  });
});