import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";


import AdminRouter from "../../../Routers/AdminRouter";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
    
        <div><AdminRouter/></div>
      </div>
    </div>
  );
};

export default Home;
