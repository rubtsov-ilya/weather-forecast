import { Routes, Route } from "react-router-dom";
import BodyLockProvider from "../providers/BodyLockProvider.tsx";
import ScrollToTopProvider from "../providers/ScrollToTopProvider.tsx";
import DarkThemeProvider from "../providers/DarkThemeProvider.tsx";
import ServerErrorProvider from "../providers/ServerErrorProvider.tsx";
import AuthProvider from "../providers/AuthProvider.tsx";

import Layout from "./../components/layout/Layout.tsx";
import NotfoundPage from "../components/pages/not-found-page/NotfoundPage.tsx";
import HomePage from "../components/pages/home-page/HomePage.tsx";

export default function App() {
  return (
    <BodyLockProvider>
      <DarkThemeProvider>
        <ServerErrorProvider>
          <ScrollToTopProvider />
          <AuthProvider />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              {/* <Route path="cart" element={<ProductsCartPage />} /> */}
              <Route path="*" element={<NotfoundPage />} />
            </Route>
          </Routes>
        </ServerErrorProvider>
      </DarkThemeProvider>
    </BodyLockProvider>
  );
}
