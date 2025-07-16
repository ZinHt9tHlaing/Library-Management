import LoginForm from "@/features/auth/components/LoginForm";
import { IUser } from "@/types/UserType";

interface HomePageProps {
  displayLogin?: boolean;
  updateLoggedInUser: (user: IUser) => void;
}

const HomePage = ({ displayLogin, updateLoggedInUser }: HomePageProps) => {
  return (
    <div className="page">
      HomePage{" "}
      {displayLogin ? (
        <LoginForm updateLoggedInUser={updateLoggedInUser} />
      ) : (
        <></>
      )}{" "}
    </div>
  );
};

export default HomePage;
