import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/use-auth";
import { Status } from "../../../Global";

import gamecontroller from "/imgs/landing/GameController.svg";
import crown from "/imgs/landing/crown.svg";

const Home = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const handleFindJobs = () => {
    if (isAuthenticated == false)
      navigate("/auth", { state: { target: Status.Signin } });
    else navigate("/jobs");
  };

  const handleHireGamers = () => {
    if (isAuthenticated == false)
      navigate("/auth", { state: { target: Status.Signin } });
    else navigate("/gamers");
  };

  return (
    <section
      id="home"
      className="lg:w-[70%] h-[400px] lg:h-[900px] mx-auto lg:bg-[url('/imgs/landing/home_background.png')] bg-repeat-round"
    >
      <section className="w-[80%] lg:w-[80%] flex flex-col gap-12 text-center mt-16 mx-auto">
        <div className="flex flex-col gap-10">
          <div className="text-3xl lg:text-[58px] font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F36890] to-[#515fff]">
              Job training and placement
            </span>
          </div>
          <p className="text-sm lg:text-xl font-semibold text-normal">
            Trooper is the ultimate platform for finding jobs and hiring talent
            The first zero-fee job market adapted to immersive
            job training, placement and gaming
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 mx-auto">
          <button
            className="flex flex-row gap-3 items-center justify-center text-center bg-app-normal hover:bg-button-primary text-primary border-2 border-secondary rounded-full w-[202.5px] h-12 px-3 py-6 hover:bg-hover"
            onClick={handleFindJobs}
          >
            <img src={gamecontroller} />
            Find jobs
            <img src={gamecontroller} />
          </button>
          <button
            className="rounded-full w-[202.5px] h-[51px] bg-gradient-to-r p-[2px] from-[#bb69cc] to-[#515fff]"
            onClick={handleHireGamers}
          >
            <div className="flex items-center justify-center flex-row gap-3 h-full bg-app-normal text-primary rounded-full hover:bg-hover">
              <img src={crown} />
              Hire now
              <img src={crown} />
            </div>
          </button>
        </div>
      </section>
    </section>
  );
};

export default Home;
