import { Layout } from "../components/ui/Layout";
import { HomePage } from "../pages/HomePage";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "airdrop/:id",
        element: <div>Airdrop Detail</div>,
      },
    ],
  },
];
