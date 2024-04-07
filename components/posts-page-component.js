import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";



  export async function renderPostsPageComponent({ appEl }) {
    try {
      // Получаем данные о постах из вашего API
      const response = await fetch('URL_вашего_API/posts');
      const postsData = await response.json();
  
      // Создаем HTML для списка постов на основе данных из API
      let postsHTML = '';
      postsData.forEach(post => {
        postsHTML += `
          <li class="post">
            <div class="post-header" data-user-id="${post.userId}">
                <img src="${post.userImageUrl}" class="post-header__user-image">
                <p class="post-header__user-name">${post.userName}</p>
            </div>
            <div class="post-image-container">
              <img class="post-image" src="${post.imageUrl}">
            </div>
            <div class="post-likes">
              <button data-post-id="${post.id}" class="like-button">
                <img src="./assets/images/${post.isLiked ? 'like-active' : 'like-not-active'}.svg">
              </button>
              <p class="post-likes-text">
                Нравится: <strong>${post.likes}</strong>
              </p>
            </div>
            <p class="post-text">
              <span class="user-name">${post.userName}</span>
              ${post.description}
            </p>
            <p class="post-date">
              ${post.createdAt} <!-- Здесь нужно форматировать дату -->
            </p>
          </li>`;
      });
  
      // Добавляем HTML списка постов на страницу
      const appHtml = `
        <div class="page-container">
          <div class="header-container"></div>
          <ul class="posts">
            ${postsHTML}
          </ul>
        </div>`;
      
      appEl.innerHTML = appHtml;
  
      // Рендерим компонент заголовка
      renderHeaderComponent({
        element: document.querySelector(".header-container"),
      });
  
      // Добавляем обработчики событий для перехода на страницу пользователя
      for (let userEl of document.querySelectorAll(".post-header")) {
        userEl.addEventListener("click", () => {
          goToPage(USER_POSTS_PAGE, {
            userId: userEl.dataset.userId,
          });
        });
      }
    } catch (error) {
      console.error('Ошибка при загрузке постов:', error);
    }
  }

  export function renderUserPostsPageComponent({ appEl, posts, user, goToPage }) {
    const postsHtml = posts.map(post => `
      <li class="post">
        <div class="post-header" data-user-id="${post.user.id}">
            <img src="${post.user.imageUrl}" class="post-header__user-image">
            <p class="post-header__user-name">${post.user.name}</p>
        </div>
        <div class="post-image-container">
          <img class="post-image" src="${post.imageUrl}">
        </div>
        <div class="post-likes">
          <button data-post-id="${post.id}" class="like-button">
            <img src="${post.isLiked ? './assets/images/like-active.svg' : './assets/images/like-not-active.svg'}">
          </button>
          <p class="post-likes-text">
            Нравится: <strong>${post.likes.length}</strong>
          </p>
        </div>
        <p class="post-text">
          <span class="user-name">${post.user.name}</span>
          ${post.description}
        </p>
        <p class="post-date">
          ${formatDate(post.createdAt)}
        </p>
      </li>
    `).join('');
  
    const appHtml = `
      <div class="page-container">
        <div class="header-container"></div>
        <ul class="posts">
          ${postsHtml}
        </ul>
      </div>
    `;
  
    appEl.innerHTML = appHtml;
  
    // Добавляем обработчики событий для кнопок лайков
    const likeButtons = appEl.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const postId = button.dataset.postId;
        postLike(postId)
          .then(() => {
            // Обновляем посты после лайка
            goToPage(USER_POSTS_PAGE, { userId: user.id });
          })
          .catch(error => {
            console.error('Ошибка при лайке поста:', error);
          });
      });
    });
  }

  export { renderUserPostsPageComponent };
  
  function formatDate(date) {
    const options = { 
      day: 'numeric', 
      month: 'numeric', 
      year: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric' 
    };
    
    return new Intl.DateTimeFormat('ru-RU', options).format(date);
  }
  
  // Пример использования:
  const now = new Date();
  const formattedDate = formatDate(now);
  console.log(formattedDate);
