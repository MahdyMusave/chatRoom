import React from "react";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div>Home</div>;
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default Home;
