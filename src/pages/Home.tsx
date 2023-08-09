import { useContext } from "react";
import Navigation from "../components/Navigation";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  console.log("user", user);
  return (
    <>
      <Navigation />
    </>
  );
};

export default Home;
