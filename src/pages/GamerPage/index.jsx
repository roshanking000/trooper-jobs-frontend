import { Link, useNavigate } from "react-router-dom";

import Header from "/src/components/app/Header";

import MaskGroup from "/imgs/common/mask_group.svg";
import searchImg from "/imgs/app/header/search.png";
import ReviewStarIcon from "../../components/Icons/ReviewStarIcon";
import { accountApi } from "../../api/account";
import { useEffect, useState } from "react";
import ChevronDownIcon from "../../components/Icons/ChevronDownIcon";
import { amendString, isInvalid } from "../../utils";
import AccountAvatar from "../../components/AccountAvatar";

const GamersPage = (props) => {
  const { setLoadingView } = props;
  const [gamerList, setGamerList] = useState([]);
  const navigate = useNavigate();

  const getAllGamers = async () => {
    setLoadingView(true);
    try {
      const response = await accountApi.getAllAccounts('Gamer');
      setGamerList(response.data);
    } catch (err) {
      console.log(err);
    }
    setLoadingView(false);
  };

  useEffect(() => {
    getAllGamers();
  }, []);

  return (
    <>
      <div className="xl:hidden absolute bg-primary hover:bg-hover rounded-full h-16 border border-primary z-[1] top-20">
        <div className="flex flex-row justify-center items-center gap-4 p-1 pr-7">
          <div className="flex items-center justify-center w-14 h-14 rounded-full border border-primary">
            <img src={searchImg} />
          </div>
          <Link to="/gamers">
            <span className="text-base font-semibold text-normal cursor-pointer hover:text-secondary-hover">
              Freelancers
            </span>
          </Link>
          <Link to="/guilds">
            <span className="text-base font-semibold text-normal cursor-pointer hover:text-secondary-hover">
              Companies
            </span>
          </Link>
          <Link to="/jobs">
            <span className="text-base font-semibold text-normal cursor-pointer hover:text-secondary-hover">
              Jobs
            </span>
          </Link>
        </div>
      </div>
      <div className="w-full h-full inset-0 justify-center absolute !z-0">
        <div className="w-4/6 h-70 left-0 right-0 mx-auto absolute !z-0 mt-12 hidden sm:block">
          <img src={MaskGroup} />
        </div>
        <img
          src={MaskGroup}
          className="w-full h-full sm:hidden absolute object-cover"
        />
      </div>
      <div className="flex flex-col items-start gap-8">
        <p className="text-4xl lg:text-[64px] font-bold text-primary z-10">
          Freelancers
        </p>
        <div className="flex flex-col items-start gap-16 z-10 w-full">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-2 w-full">
            <p className="text-xl font-bold text-normal w-full">
              Total ({gamerList?.length})
            </p>
            <div className="flex flex-row justify-center xl:justify-end items-start gap-2 w-full">
              <button className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden hover:border-0 text-sm font-medium bg-grey rounded-full group hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500">
                <div className="flex flex-row gap-2 items-center bg-primary rounded-full text-primary relative px-4 py-2 transition-all">
                  Skills
                  <ChevronDownIcon />
                </div>
              </button>
              <button className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden hover:border-0 text-sm font-medium bg-grey rounded-full group hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500">
                <div className="flex flex-row gap-2 items-center bg-primary rounded-full text-primary relative px-4 py-2 transition-all">
                  Filter by
                  <ChevronDownIcon />
                </div>
              </button>
            </div>
          </div>
          <div className="grid xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-16 w-full">
            {gamerList?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center px-6 py-4 gap-2 bg-primary border border-primary min-h-[220px] max-h-[220px] sm:min-h-[240px] sm:max-h-[240px] rounded-[32px] cursor-pointer z-10 hover:bg-hover"
                  onClick={() => navigate("/gamers/" + item.username)}
                >
                  <AccountAvatar
                    isOfficial={item.is_official}
                    margin={'-mt-16 '}
                    avatarFile={item.avatar_file} />
                  <div className="flex flex-col justify-center items-center gap-1">
                    <p className="text-base font-bold text-primary">
                      {item.name} {item.surname == null ? '' : (' ' + item.surname)}
                    </p>
                    <div className="flex flex-row justify-center items-center gap-2">
                      <p className="text-sm font-medium text-normal">
                        {item.missionCount} missions
                      </p>
                      <p className="text-sm font-medium text-primary">
                        {item.is_official ? '5' : '0'}
                      </p>
                      <ReviewStarIcon isFill={true} />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-center text-normal text-ellipsis break-all overflow-hidden doubleline-ellipsis">
                    {isInvalid(item.short_description) ? "No description" : amendString(item.short_description)}
                  </p>
                  <div className="grow"></div>
                  <div className="flex flex-row gap-2 px-2 max-w-full h-10 flex-wrap overflow-hidden justify-center">
                    {item.roles.split(',')?.map((role, index) => {
                      return (
                        <p
                          key={index}
                          className="h-fit px-3 py-2 rounded-xl border border-primary text-xs text-center text-normal font-bold overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px] lg:max-w-full"
                        >
                          {role}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default GamersPage;