export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <input type="text" id="description-input" placeholder="Введите описание">
      <input type="text" id="image-url-input" placeholder="Введите URL изображения">
      <button class="button" id="add-button">Добавить</button>
    </div>
  `;

    appEl.innerHTML = appHtml;

    document.getElementById("add-button").addEventListener("click", () => {
      const description = document.getElementById("description-input").value;
      const imageUrl = document.getElementById("image-url-input").value;
    
      // Проверка на пустые поля
      if (description.trim() === '' || imageUrl.trim() === '') {
        alert('Пожалуйста, заполните все поля');
        return;
      }
    
      // Вызов функции обработчика с введенными данными
      onAddPostClick({ description, imageUrl });
    }); 
  }

  render();
}
