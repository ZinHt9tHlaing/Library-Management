interface HomePageProps {
  displayLogin: boolean;
}

const HomePage = ({ displayLogin }: HomePageProps) => {
  return (
    <div className="page">
      HomePage {displayLogin ? <p>Displaying the Login Form</p> : <></>}{" "}
    </div>
  );
};

export default HomePage;
