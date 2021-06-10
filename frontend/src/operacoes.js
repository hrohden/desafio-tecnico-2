export const listar = () => {
  return fetch("http://localhost:3000/api/clientes", {
    headers: new Headers({
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBdXRlbnRpY2HDp8OjbyIsImlhdCI6MTYyMzI2MDgwMiwiZXhwIjoxNjIzMzQ3MjAyLCJzdWIiOiJhZG1pbiJ9.2NKHtgmfjn368BiZfaPKFD6I8NQwMd4jfOdHFBGNOMU",
    }),
  }).then((res) => res.json());
};

export const consultar = (id) => {
  return fetch("http://localhost:3000/api/clientes/" + id, {
    headers: new Headers({
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBdXRlbnRpY2HDp8OjbyIsImlhdCI6MTYyMzI2MDgwMiwiZXhwIjoxNjIzMzQ3MjAyLCJzdWIiOiJhZG1pbiJ9.2NKHtgmfjn368BiZfaPKFD6I8NQwMd4jfOdHFBGNOMU",
    }),
  }).then((res) => res.json());
};

export const salvar = (body) => {
  return fetch("http://localhost:3000/api/clientes", {
    method: "post",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBdXRlbnRpY2HDp8OjbyIsImlhdCI6MTYyMzI2MDgwMiwiZXhwIjoxNjIzMzQ3MjAyLCJzdWIiOiJhZG1pbiJ9.2NKHtgmfjn368BiZfaPKFD6I8NQwMd4jfOdHFBGNOMU",
    }),
  }).then((res) => res.json());
};

export const remover = (id) => {
  return fetch("http://localhost:3000/api/clientes/" + id, {
    method: "delete",
    headers: new Headers({
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBdXRlbnRpY2HDp8OjbyIsImlhdCI6MTYyMzI2MDgwMiwiZXhwIjoxNjIzMzQ3MjAyLCJzdWIiOiJhZG1pbiJ9.2NKHtgmfjn368BiZfaPKFD6I8NQwMd4jfOdHFBGNOMU",
    }),
  }).then((res) => res.json());
};
