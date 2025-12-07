import { Layout } from "../components/Layout";
import { AirdropPage } from "../pages/AirdropPage";
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
        path: "airdrop/:distributorId",
        element: <AirdropPage />,
      },
    ],
  },
];
