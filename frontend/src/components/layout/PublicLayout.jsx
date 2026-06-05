import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

export function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;
