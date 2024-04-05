// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod
const personalKey = "karina-roz";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;
const userHost = `${baseHost}/api/v1/${personalKey}/instapro/user-posts`;

export async function getPosts({ token }) {
  const response = await fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
   if (response.status === 401) {
        throw new Error("Нет авторизации");
      }
      const data = await response.json();
      return data.posts;  
}

export async function getUserPosts({ id }) {
  console.log(id)
  const response = await fetch(`${userHost}/${id}`, {
    method: "GET",
    headers: {
      Authorization: getToken(),
    },
  });
  if (response.status === 401) {
    throw new Error("Нет авторизации");
  }
  const data_1 = await response.json();
  return data_1.posts;
}

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F
export async function registerUser({ login, password, name, imageUrl }) {
  const response = await fetch(userHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  });
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return await response.json();  
}

export async function loginUser({ login, password }) {
  const response = await fetch(`${userHost}/login`, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  });
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return await response.json(); 
}

// Загружает картинку в облако, возвращает url загруженной картинки
export async function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  const response = await fetch(`${baseHost}/api/upload/image`, {
    method: "POST",
    body: data,
  });
    return await response.json(); 
}
