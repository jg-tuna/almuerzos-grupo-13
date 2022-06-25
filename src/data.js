let locals = [
  {
    id: 1,
    name: "Quick Deli",
    category: "Comida Saludable, Sandwich, Comida Rápida",
    details: "Arriba las manos esto es un asalto",
    img: "http://toolspublicidad.cl/wp-content/uploads/2014/11/12.jpg",
    alt: "Vista del local 'Quickdeli'",
    favorite: false,
    stars: 3,
    lvl_price: 2,
    location: null,
    contact: "+5629685369",
    food: [
        {
          name: "Aliado",
          description: "Pan con jamón y queso",
          price: 1490
        },
        {
          name: "Wrap",
          description: "Wrap con pollo y lechuga",
          price: 2690
        }
    ],
    comments : [
      {
        username : "Javier Pérez",
        rating : "3",
        date : "9 de Mayo, 2022",
        img : "https://freesvg.org/img/abstract-user-flat-4.png",
        alt : "user picture",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      {
        username : "Manuela Infante",
        rating : "2",
        date : "5 de Mayo, 2022",
        img : "https://www.pinclipart.com/picdir/middle/68-687405_profile-clipart-generic-user-icono-de-una-mujer.png",
        alt : "user picture",
        content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
      }
    ],
    img_1 : "https://www.infogate.cl/wp-content/uploads/2018/12/medioambiente171201.jpg",
    alt_1 : "imagen vaso con fruta quickdeli",
    img_2 : "https://tofuu.getjusto.com/orioneat-prod-resized/2WMgnjHn5pLLtmdmd-300-500.webp",
    alt_2 : "imagen quickdeli construccion civil",
    img_3 : "https://i0.wp.com/www.diariosustentable.com/wp-content/uploads/2019/02/Captura-de-pantalla-2019-01-16-a-las-13.jpg?fit=800%2C533&ssl=1",
    alt_3 : "bandeja con productos quickdeli"
  }
  ,
  {
    id: 2,
    name: "Little Caesars",
    category: "Pizza",
    details: "Su pizza",
    alt: "Vista del local 'Little Ceasars'",
    img: 'https://pbs.twimg.com/profile_images/1160964413320585217/AwpQ4k_A_400x400.jpg',
    favorite: false,
    stars: 4.5,
    lvl_price: 3,
    location: null,
    contact: "+5629685369",
    food: [
        {
          name: "Aliado",
          description: "Pan con jamón y queso",
          price: 990
        },
        {
          name: "Wrap",
          description: "Wrap con pollo y lechuga",
          price: 1990
        }
    ],
    comments : [],
    img_1 : "",
    alt_1 : "",
    img_2 : "",
    alt_2 : "",
    img_3 : "",
    alt_3 : ""
  },
  {
    id: 3,
    name: "El señor de las moscas",
    category: "Basura",
    details: "Servimos basura de todo tipo",
    alt: "Un tarro de basura lleno de moscas",
    img: 'https://previews.123rf.com/images/lenm/lenm1307/lenm130700320/20779971-illustration-of-overflowing-trashbin-with-flies.jpg',
    favorite: false,
    stars: 1,
    lvl_price: 3,
    location: null,
    contact: "+5629685369",
    food: [
      {
        name: "Alimento misterioso 1",
        description: "???",
        price: 990
      },
      {
        name: "Alimento misterioso 2",
        description: "???",
        price: 1990
      }
    ],
    comments : [],
    img_1 : "",
    alt_1 : "",
    img_2 : "",
    alt_2 : "",
    img_3 : "",
    alt_3 : ""
  },
  {
    id: 4,
    name: "Subway",
    category: "Sándwich",
    details: "Sandwich, ensaladas y wraps",
    alt: "Un tarro de basura lleno de moscas",
    img: 'https://d500.epimg.net/cincodias/imagenes/2019/07/22/companias/1563791858_091796_1563792307_miniatura_normal.jpg',
    favorite: false,
    stars: 4.3,
    lvl_price: 4,
    location: null,
    contact: "+5629685369",
    food: [
        {
          name: "Pechuga de pollo",
          description: "Pan con jamón y queso",
          price: 3050
        },
        {
          name: "Carne y queso",
          description: "Doble ración de láminas de carne, con queso, vegetales, salsas y aderezos a elección.",
          price: 3990
        },
        {
          name: "Pollo Teriyaki",
          description: "Doble ración de trocitos de pollo bañados en salsa teriyaki, con queso, vegetales, salsas y aderezos a elección.",
          price: 4050
        },
        {
          name: "Wrap",
          description: "Wrap con pollo y lechuga",
          price: 1990
        }
    ],
    comments : [],
    img_1 : "",
    alt_1 : "",
    img_2 : "",
    alt_2 : "",
    img_3 : "",
    alt_3 : ""
  },
  {
    id: 5,
    name: "Sopaipillas",
    category: "Comida chilena",
    details: "Mejores sopaipillas en San Joaquín",
    alt: "Un tarro de basura lleno de moscas",
    img: 'https://imagenes.t13.cl/images/original/2018/05/1527632293-auno705825.jpg?width=1200&height=675&position=top',
    favorite: false,
    stars: 4,
    lvl_price: 1,
    location: null,
    contact: "+5629685369",
    food: [
        {
          name: "Sopaipilla",
          description: "La clásica sopaipilla chilena",
          price: 990
        },
    ],
    comments : [],
    img_1 : "",
    alt_1 : "",
    img_2 : "",
    alt_2 : "",
    img_3 : "",
    alt_3 : ""
  }
]

let users = [
  {
    "id": 1,
    "firstName": null,
    "lastName": null,
    "email": null,
    "password": null,
    "createdAt": "2022-05-29T20:30:10.642Z",
    "updatedAt": "2022-05-29T20:30:10.642Z"
  },
  {
    "id": 2,
    "firstName": "hola",
    "lastName": "chao",
    "email": "hola@gmail.com",
    "password": "123456",
    "createdAt": "2022-05-29T20:32:06.631Z",
    "updatedAt": "2022-05-29T20:32:06.631Z"
  },
  {
    "id": 3,
    "firstName": "hola",
    "lastName": "chao",
    "email": "hola@gmail.com",
    "password": "123456",
    "createdAt": "2022-05-29T20:32:21.803Z",
    "updatedAt": "2022-05-29T20:32:21.803Z"
  },
  {
    "id": 4,
    "firstName": null,
    "lastName": null,
    "email": null,
    "password": null,
    "createdAt": "2022-05-29T21:04:58.099Z",
    "updatedAt": "2022-05-29T21:04:58.099Z"
  },
  {
    "id": 5,
    "firstName": "el",
    "lastName": "tunas",
    "email": "el_tunas@gmail.com",
    "password": "123123123",
    "createdAt": "2022-05-30T00:36:25.875Z",
    "updatedAt": "2022-05-30T00:36:25.875Z"
  },
  {
    "id": 6,
    "firstName": "Hola",
    "lastName": "Como",
    "email": "hola@como.com",
    "password": "123123",
    "createdAt": "2022-05-30T00:43:30.906Z",
    "updatedAt": "2022-05-30T00:43:30.906Z"
  }
]

export function getLocals() {
  return locals;
};
export function getUsers() {
  return users;
};
