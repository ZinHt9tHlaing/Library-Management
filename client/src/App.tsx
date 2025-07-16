import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import { IUser } from "./types/UserType";
import { Bounce, ToastContainer } from "react-toastify";

const App = () => {
  const [displayLogin, setDisplayLogin] = useState<boolean>(true);
  const [loggedInUser, setLoggedInUser] = useState<IUser>();

  const updateLoggedInUser = (user: IUser) => {
    setLoggedInUser(user);
  };

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

      <HomePage
        displayLogin={displayLogin}
        updateLoggedInUser={updateLoggedInUser}
      />
    </div>
  );
};

export default App;
