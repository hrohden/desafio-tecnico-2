const urlBase = "http://localhost:3000/api/clientes/";

const headers = new Headers({
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBdXRlbnRpY2HDp8OjbyIsImlhdCI6MTYyMzI2MDgwMiwiZXhwIjoxNjIzMzQ3MjAyLCJzdWIiOiJhZG1pbiJ9.2NKHtgmfjn368BiZfaPKFD6I8NQwMd4jfOdHFBGNOMU",
});

export const listar = () => {
  return fetch(urlBase, { headers }).then((res) => res.json());
};

export const consultar = (id) => {
  return fetch(urlBase + id, { headers }).then((res) => res.json());
};

export const salvar = (body) => {
  return fetch(urlBase, {
    method: "post",
    body: JSON.stringify(body),
    headers: headers,
  }).then((res) => res.json());
};

export const remover = (id) => {
  return fetch(urlBase + id, {
    method: "delete",
    headers: headers,
  }).then((res) => res.json());
};
