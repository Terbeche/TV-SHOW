const movie = 'comedy';
const appId = 'IWf3COm5aU7E5iifRsF3';
const url = `https://api.tvmaze.com/search/shows?q=${movie}`;
const displayMovies = document.getElementById('display-Movies');
const commentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/comments`;
const secondUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes`;

const commentForm = document.createElement('form');
commentForm.classList.add('comment-form');
const commentTitle = document.createElement('h2');
commentTitle.classList.add('comment-item');
commentTitle.innerHTML = 'Add a comment: ';
const addNameInput = document.createElement('input');
addNameInput.classList.add('comment-item');
addNameInput.placeholder = 'Your name';
const addCommentInput = document.createElement('textarea');
addCommentInput.classList.add('comment-item');
addCommentInput.placeholder = 'Your insights';
const addCommentButton = document.createElement('button');
addCommentButton.classList.add('comment-item');
addCommentButton.innerHTML = 'Comment';

export async function getMovies() {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    return [];
  }
}

export const getLikes = async () => {
  try {
    const res = await fetch(secondUrl);
    const likes = await res.json();
    return likes;
  } catch (error) {
    return [];
  }
};

export async function addLike(id) {
  try {
    const res = await fetch(secondUrl, {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return res.json();
  } catch (error) {
    return [];
  }
}

export const getComments = async (id) => {
  try {
    const res = await fetch(`${commentUrl}?item_id=${id}`);
    const comments = await res.json();
    return comments;
  } catch (error) {
    return [];
  }
};

export async function addComment(id) {
  try {
    const res = await fetch(commentUrl, {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
        username: addNameInput.value,
        comment: addCommentInput.value,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return res.json();
  } catch (error) {
    return [];
  }
}

export const renderMovieDetail = async (id) => {
  const movies = await getMovies();
  const comments = await getComments(id);
  const projectDetailsPopupContainer = document.createElement('div');
  projectDetailsPopupContainer.id = 'popup-container';

  const projectDetailsPopupOverlay = document.createElement('div');
  projectDetailsPopupOverlay.id = 'popup-overlay';
  projectDetailsPopupOverlay.style.display = 'block';
  projectDetailsPopupContainer.appendChild(projectDetailsPopupOverlay);

  const moviePopup = document.createElement('div');
  moviePopup.id = 'details-popup';
  moviePopup.style.display = 'flex';
  if (window.screen.width >= 768) {
    moviePopup.style.top = `${window.pageYOffset + 77}px`;
  } else {
    moviePopup.style.top = `${window.pageYOffset + 16}px`;
  }

  const popupHeaderCloseButton = document.createElement('button');
  popupHeaderCloseButton.id = 'popup-close-button';
  popupHeaderCloseButton.innerHTML = 'Close';
  moviePopup.appendChild(popupHeaderCloseButton);

  movies.forEach((movie) => {
    if (id === movie.show.id) {
      const comedyDetailMovie = document.createElement('div');
      comedyDetailMovie.classList.add('movie-div-detail');
      const comedyDetailImage = document.createElement('img');
      comedyDetailImage.classList.add('movie-image-detail');
      comedyDetailImage.src = movie.show.image.original;

      const comedyDetailcontainer = document.createElement('div');
      comedyDetailcontainer.id = 'detail-container';

      const movieDetailTitle = document.createElement('label');
      movieDetailTitle.innerHTML = ` Title: ${movie.show.name}`;
      const movieDetailStatus = document.createElement('label');
      movieDetailStatus.innerHTML = `Status: ${movie.show.status}`;
      const movieDetailPremiered = document.createElement('label');
      movieDetailPremiered.innerHTML = `Premiered: ${movie.show.premiered}`;

      const commentDisplay = document.createElement('h2');
      commentDisplay.innerHTML = 'Comments';
      const commentList = document.createElement('ul');
      commentList.id = `${movie.show.id}`;
      let commentCounter = 0;
      const commnetNumber = document.createElement('span');

      if (comments.length > 0) {
        comments.forEach((comment) => {
          commentCounter += 1;
          commnetNumber.innerHTML = `(${commentCounter})`;
          commentDisplay.append(commnetNumber);

          const singleComment = document.createElement('li');
          const commentUser = `${comment.username}`;
          const commentContent = `${comment.comment}`;
          const commentDate = `${comment.creation_date}`;
          singleComment.innerHTML = `${commentDate} ${commentUser} : ${commentContent}`;
          commentList.append(singleComment);
        });
      }

      comedyDetailMovie.append(comedyDetailImage);
      comedyDetailcontainer.append(movieDetailTitle);
      comedyDetailcontainer.append(movieDetailStatus);
      comedyDetailcontainer.append(movieDetailPremiered);
      comedyDetailMovie.append(comedyDetailcontainer);

      comedyDetailMovie.append(commentDisplay);
      comedyDetailMovie.append(commentList);

      commentForm.append(commentTitle);
      commentForm.append(addNameInput);
      commentForm.append(addCommentInput);
      commentForm.append(addCommentButton);
      comedyDetailMovie.append(commentForm);

      moviePopup.append(comedyDetailMovie);
      projectDetailsPopupContainer.appendChild(moviePopup);

      document.body.append(projectDetailsPopupContainer);
      popupHeaderCloseButton.onclick = (e) => {
        e.preventDefault();
        projectDetailsPopupContainer.remove();
      };
      addCommentButton.onclick = (e) => {
        e.preventDefault();
        addComment(id);

        const today = new Date();
        const date = `${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate()}`;

        commentCounter += 1;
        commnetNumber.innerHTML = `(${commentCounter})`;
        commentDisplay.append(commnetNumber);
        const singleComment = document.createElement('li');
        const commentUser = `${addNameInput.value}`;
        const commentContent = `${addCommentInput.value}`;
        singleComment.innerHTML = `${date} ${commentUser} : ${commentContent}`;
        commentList.append(singleComment);

        commentForm.reset();
      };
    }
  });
};

export const renderMovies = async () => {
  const movies = await getMovies();
  const likes = await getLikes();
  displayMovies.innerHTML = '';
  let counter = 0;
  const moviesSpan = document.getElementById('movies');
  movies.forEach((movie) => {
    counter += 1;
    moviesSpan.innerHTML = `(${counter})`;

    let numLikes = 0;
    likes.forEach((like) => {
      if (movie.show.id === like.item_id) {
        numLikes = `${like.likes}`;
      }
    });
    const comedyMovie = document.createElement('div');
    comedyMovie.classList.add('movie-div');
    const movieTitle = document.createElement('label');
    movieTitle.classList.add('movie-title');
    movieTitle.innerHTML = `${movie.show.name}`;
    const likeIcon = document.createElement('i');
    likeIcon.id = movie.show.id;
    likeIcon.classList.add('fas');
    likeIcon.classList.add('fa-solid');
    likeIcon.classList.add('fa-heart');
    const likeLabel = document.createElement('label');
    likeLabel.classList.add('like-label');
    likeLabel.innerHTML = `${numLikes} likes`;
    const comedyImage = document.createElement('img');
    comedyImage.classList.add('comedy-image');
    comedyImage.src = movie.show.image.medium;
    const commentButton = document.createElement('button');
    commentButton.classList.add('comment-button');
    commentButton.innerHTML = 'Comments';
    commentButton.id = movie.show.id;
    comedyMovie.append(movieTitle);
    comedyMovie.append(comedyImage);
    comedyMovie.append(likeIcon);
    comedyMovie.append(likeLabel);
    comedyMovie.append(commentButton);
    displayMovies.append(comedyMovie);
    let newNumLikes;
    likeIcon.onclick = (e) => {
      e.preventDefault();
      addLike(movie.show.id);
      newNumLikes = Number(numLikes) + 1;
      likeLabel.innerHTML = `${newNumLikes} likes`;
      numLikes = newNumLikes;
    };
    commentButton.onclick = (e) => {
      e.preventDefault();
      renderMovieDetail(movie.show.id);
    };
  });
};
