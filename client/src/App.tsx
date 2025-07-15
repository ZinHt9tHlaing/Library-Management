import { useState } from "react";
import HomePage from "./pages/HomePage";
import { IUser } from "./types/UserType";

const App = () => {
  const [displayLogin, setDisplayLogin] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<IUser>();

  return (
    <div>
      <HomePage displayLogin={displayLogin} />
    </div>
  );
};

export default App;
