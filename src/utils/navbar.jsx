import Analiktika from "../pages/analiktika/analiktika";

export const navbarData = [
  {
    id: 1,
    title: "Аналитика",
    path: "analiktika",
    element: <Analiktika />,
    child: [],
    visible: true,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 2,
    title: "Настройка условий",
    path: "nastroyka-usloviya",
    element: <h1>Настройка условий</h1>,
    child: [],
    visible: true,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 3,
    title: "Рецепт",
    path: "retsept",
    element: <h1>Рецепт</h1>,
    child: [],
    visible: true,
    onlyAdmin: false,
    icon: false,
  },
  {
    id: 4,
    title: "Депозит",
    path: "depozit",
    element: <h1>Депозит</h1>,
    child: [],
    visible: true,
    onlyAdmin: false,
    icon: false,
  },
];
