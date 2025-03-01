import React, { ReactNode } from "react";
import Header from "../components/shared/Header";

interface AppProps {
  children: ReactNode;
}

const Layout: React.FC<AppProps> = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export default Layout;
