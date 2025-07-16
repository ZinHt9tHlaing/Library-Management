import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import { Bounce, ToastContainer } from "react-toastify";
import { RootState } from "./store/store";
import { useSelector } from "react-redux";

const App = () => {
  const { loggedInUser } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log("loggedInUser", loggedInUser);

    return () => {
      console.log("component unmounted");
    };
  }, [loggedInUser]);

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <HomePage />
    </div>
  );
};

export default App;
