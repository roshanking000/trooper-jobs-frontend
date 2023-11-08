import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

import Header from "/src/components/app/Header";
import RoundedButton from "/src/components/RoundedButton.jsx";

import MaskGroup from "/imgs/common/mask_group.svg";
import profileImg from "/imgs/app/profile/profile.png";
import linkedinLogo from "/imgs/app/profile/linkedinLogo.png";
import instagramLogo from "/imgs/app/profile/instagramLogo.png";
import facebookLogo from "/imgs/app/profile/facebookLogo.png";
import searchImg from "/imgs/app/header/search.png";
import ReviewStarIcon from "../../components/Icons/ReviewStarIcon";
import { accountApi } from "../../api/account";
import AccountAvatar from "../../components/AccountAvatar";
import { generateFavoriteGameList, generateRoleList, isInvalid } from "../../utils";
import { toast } from "react-toastify";

const GamerProfilePage = (props) => {
  const { setLoadingView } = props;
  const [currentTab, setCurrentTab] = useState("missions");
  const location = useLocation();
  const username = location.pathname.split('/')[location.pathname.split('/').length - 1];
  const [gamerData, setGamerData] = useState(null);
  const [reputation, setReputation] = useState(0);
  const [favoriteGameList, setFavoriteGameList] = useState([]);
  const [roles, setRoles] = useState([]);

  const getAccountData = useCallback(async (username) => {
    setLoadingView(true);
    try {
      const response = await accountApi.getAccountWithUsername(username);
      console.log('response >>> ', response);
      setGamerData(response);
      setFavoriteGameList(generateFavoriteGameList(response.account.favorite_games));
      setRoles(generateRoleList(response.account.roles));
      setReputation(response.account.is_official ? 5 : 0);
    } catch (err) {
      console.log('Error >>>', err);
      toast.error('Get gamer data failed');
    }
    setLoadingView(false);
  }, [username]);

  useEffect(() => {
    getAccountData(username);
  }, [username]);

  return (
    <>
      {gamerData != null && (
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
          <div className="w-full h-full inset-0 justify-center absolute z-0">
            <div className="w-4/6 h-70 left-0 right-0 mx-auto absolute mt-12 hidden sm:block">
              <img src={MaskGroup} />
            </div>
            <img
              src={MaskGroup}
              className="w-full h-full sm:hidden absolute object-cover"
            />
          </div>
          <section className="flex flex-col xl:flex-row justify-center xl:items-start gap-6 xl:gap-20 p-4 xl:p-0 w-full">
            <div className="flex flex-col items-center gap-3 xl:gap-8 xl:min-w-[320px] xl:max-w-[320px] z-10">
              <div className="flex flex-col w-1/2 xl:w-full items-center justify-center">
                <AccountAvatar
                  isOfficial={gamerData == null ? false : gamerData.account.is_official}
                  width={'w-[280px] xl:w-[296px]'}
                  height={'h-[280px] xl:h-[296px]'}
                  imageWidth={'max-w-[272px] w-[272px] sm:max-w-[288px] sm:w-[288px]'}
                  imageheight={'max-h-[272px] h-[272px] sm:max-h-[288px] sm:h-[288px]'}
                  zOrder={'z-0'}
                  avatarFile={gamerData == null ? null : gamerData.account.avatar_file}
                  padding={gamerData == null ? 'p-[2px]' : (gamerData.account.is_official ? 'p-[4px]' : 'p-[2px]')}
                />
                <RoundedButton
                  width={"w-full"}
                  padding={"py-3"}
                  margin={"!-mt-4"}
                  attrib={"xl:hidden !text-sm"}
                >
                  Hire @ninjafire
                </RoundedButton>
              </div>
              <div className="flex flex-col items-center gap-8 w-full">
                <div className="flex flex-col items-center gap-2">
                  <h1 className="text-xl font-bold text-center text-primary">
                    {reputation}
                  </h1>
                  <div className="flex items-center gap-2">
                    {(() => {
                      let _markArray = [];
                      for (let i = 0; i < Math.floor(reputation); i++) {
                        _markArray.push(
                          <ReviewStarIcon isFill={true} key={"fill" + i} keyValue={"fill" + i} />
                        );
                      }
                      for (let i = 0; i < 5 - Math.floor(reputation); i++) {
                        _markArray.push(
                          <ReviewStarIcon isFill={false} key={"unfill" + i} keyValue={"fill" + i} />
                        );
                      }
                      return _markArray;
                    })()}
                  </div>
                </div>
                <div className="hidden xl:flex flex-col justify-between gap-4 w-full">
                  <div className="flex flex-row justify-between items-center gap-2">
                    <h1 className="text-xl text-normal font-bold">
                      Reviews ({reviews?.length})
                    </h1>
                    {reviews?.length !== 0 && (
                      <RoundedButton
                        attrib={"!text-base !text-normal"}
                        padding={"px-4 py-2"}
                      >
                        See all
                      </RoundedButton>
                    )}
                  </div>
                  {reviews?.length > 0 &&
                    reviews.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-start gap-2 w-full"
                        >
                          <div className="flex flex-row items-center gap-2">
                            <div className="w-[32px] rounded-full border border-primary p-1">
                              <img
                                className="w-[32px] rounded-full"
                                src={item.avatar}
                              />
                            </div>
                            <h1 className="text-base text-normal font-bold">
                              {item.name}
                            </h1>
                          </div>
                          <p className="text-sm font-medium text-normal w-full xl:w-[320px] h-[57px] text-ellipsis overflow-hidden ...">
                            {item.content}
                          </p>
                        </div>
                      );
                    })}
                  {reviews?.length == 0 && (
                    <div className="flex flex-col items-start gap-2">
                      <p className="text-xs font-semibold text-normal">No review</p>
                    </div>
                  )}
                </div>
                <div className="hidden xl:flex flex-col px-6 py-4 gap-4 rounded-3xl bg-secondary border-2 border-primary w-full">
                  <div className="flex flex-row justify-between items-center gap-2">
                    <h1 className="text-xl text-normal font-bold">
                      NFTs ({nftList?.length})
                    </h1>
                    {nftList?.length !== 0 && (
                      <RoundedButton
                        attrib={"!text-base !text-normal"}
                        padding={"px-4 py-2"}
                      >
                        See all
                      </RoundedButton>
                    )}
                  </div>
                  {nftList?.length === 0 && (
                    <p className="text-xs font-semibold text-normal">No NFTs</p>
                  )}
                  <div className="grid grid-cols-3 gap-4">
                    {nftList?.length > 0 &&
                      nftList.map((item, index) => {
                        return (
                          <img
                            key={index}
                            className="w-20 h-20 border-2 border-primary rounded-[20px]"
                            src={item.url}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-6 xl:gap-8 w-full z-10">
              <div className="flex flex-row justify-between items-center gap-20 w-full">
                <div className="flex flex-row items-center justify-between w-full xl:gap-20">
                  <h1 className="text-[32px] xl:text-[64px] text-primary font-bold">
                    {gamerData.account.name}
                  </h1>
                  <div className="hidden flex flex-row items-start gap-2">
                    <a href="#" target="_blank" rel="noreferrer">
                      <img className="w-[48px] xl:w-[56px]" src={linkedinLogo} />
                    </a>
                    <a href="#" target="_blank" rel="noreferrer">
                      <img className="w-[48px] xl:w-[56px]" src={instagramLogo} />
                    </a>
                    <a href="#" target="_blank" rel="noreferrer">
                      <img className="w-[48px] xl:w-[56px]" src={facebookLogo} />
                    </a>
                  </div>
                </div>
                <RoundedButton
                  width={"min-w-[182px]"}
                  padding={"py-3"}
                  attrib={"hidden xl:block !text-base"}
                >
                  Hire @{gamerData.account.username}
                </RoundedButton>
              </div>
              <h1 className="text-2xl xl:text-[32px] font-medium text-normal w-full">
                @{gamerData.account.username}
              </h1>
              <h1 className="text-md font-medium text-normal w-full">
                {isInvalid(gamerData.account.short_description) ? 'No description' : gamerData.account.short_description}
              </h1>
              <div className="flex flex-row items-start gap-6 xl:gap-16 w-full">
                <div className="flex flex-col items-start gap-2 xl:gap-4 w-1/2">
                  <h1 className="text-lg xl:text-xl font-bold text-normal">
                    Favorite simulations / games
                  </h1>
                  {favoriteGameList?.length === 0 && (
                    <div className="flex flex-col items-start gap-2">
                      <p className="text-xs font-semibold text-normal">
                        No favorite simulations / games
                      </p>
                    </div>
                  )}
                  {favoriteGameList?.length > 0 && (
                    <div className="flex flex-row flex-wrap gap-4">
                      {favoriteGameList?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-row items-center gap-2"
                          >
                            <div className="hidden xl:block w-[32px] rounded-full border border-primary p-1">
                              <img
                                className="w-[32px] rounded-full"
                                src={item.image}
                              />
                            </div>
                            <p className="text-base font-bold text-normal truncate ...">
                              {item.name}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-start gap-2 xl:gap-4 w-1/2">
                  <h1 className="text-lg xl:text-xl font-bold text-normal">
                    Badges
                  </h1>
                  {badgeList?.length === 0 && (
                    <div className="flex flex-col items-start gap-2">
                      <p className="text-xs font-semibold text-normal">No badge</p>
                    </div>
                  )}
                  {badgeList?.length > 0 && (
                    <div className="flex flex-row flex-wrap gap-2 xl:gap-4">
                      {badgeList?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-row items-center gap-2"
                          >
                            <div className="w-[32px] h-[32px] rounded-full border border-primary p-1">
                              <img
                                className="w-[32px] rounded-full"
                                src={item.image}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 xl:gap-4 w-full">
                <p className="text-xl font-bold text-normal">Roles</p>
                <div className="flex flex-row flex-wrap gap-2">
                  {roles?.map((item, index) => {
                    return (
                      <p
                        key={index}
                        className="px-3 py-2 rounded-xl border border-primary text-sm text-center text-normal font-bold"
                      >
                        {item.name}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="hidden xl:flex flex-col items-start gap-4 w-full">
                <p className="text-xl text-normal font-bold">
                  Jobs ({gamerData.jobs?.length})
                </p>
                {gamerData.jobs?.length > 0 && (
                  <div className="flex flex-row items-center gap-2">
                    <RoundedButton
                      attrib={"!text-base !text-normal"}
                      padding={"px-4 py-1"}
                    >
                      All
                    </RoundedButton>
                    <RoundedButton
                      attrib={"!text-base !text-normal"}
                      padding={"px-4 py-1"}
                    >
                      Past
                    </RoundedButton>
                    <RoundedButton
                      attrib={"!text-base !text-normal"}
                      padding={"px-4 py-1"}
                    >
                      Ongoing
                    </RoundedButton>
                  </div>
                )}
                {gamerData.jobs?.length === 0 && (
                  <div className="flex flex-col items-start gap-2">
                    <p className="text-md font-semibold text-normal">No jobs</p>
                  </div>
                )}
                {gamerData.jobs?.length > 0 && (
                  <div className="flex flex-col items-start gap-4 w-full">
                    {gamerData.jobs?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-start gap-2 w-full"
                        >
                          <div className="flex flex-row items-center gap-4">
                            <p className="text-base text-primary font-bold">
                              {item.name}
                            </p>
                            <p className="text-base font-medium text-normal">
                              {item.time}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-normal">
                            {item.content}
                          </p>
                          <div className="flex flex-row items-center gap-2">
                            <div className="w-[32px] h-[32px] rounded-full border border-primary p-1">
                              <img
                                className="w-[32px] rounded-full"
                                src={item.guildAvatar}
                              />
                            </div>
                            <p className="text-base font-bold text-normal">
                              {item.guildName}
                            </p>
                          </div>
                          {index != gamerData.jobs?.length - 1 && (
                            <div className="border-2 border-primary w-full"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="xl:hidden w-full text-primary flex flex-row justify-between items-center">
                <ul className="flex justify-center gap-0 text-sm font-medium text-center w-full">
                  <li className="w-1/3">
                    <button
                      className={clsx('text-base inline-block p-2 border-b-4 rounded-t-lg w-full', currentTab == 'missions' ? 'border-mandatory' : 'border-primary')}
                      type="button"
                      onClick={() => setCurrentTab(`missions`)}
                    >
                      Jobs ({gamerData.jobs?.length})
                    </button>
                  </li>
                  <li className="w-1/3">
                    <button
                      className={clsx('text-base inline-block p-2 border-b-4 rounded-t-lg w-full', currentTab == 'reviews' ? 'border-mandatory' : 'border-primary')}
                      type="button"
                      onClick={() => setCurrentTab("reviews")}
                    >
                      Reviews ({reviews?.length})
                    </button>
                  </li>
                  <li className="w-1/3">
                    <button
                      className={clsx('text-base inline-block p-2 border-b-4 rounded-t-lg  w-full', currentTab == 'nfts' ? 'border-mandatory' : 'border-primary')}
                      type="button"
                      onClick={() => setCurrentTab("nfts")}
                    >
                      NFTs ({nftList?.length})
                    </button>
                  </li>
                </ul>
              </div>
              <div className="xl:hidden flex-col items-start gap-4 w-full">
                <div className="flex flex-col items-start gap-4 w-full">
                  {currentTab == "missions" &&
                    gamerData.jobs?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-start gap-2 w-full"
                        >
                          <div className="flex flex-row items-center gap-4">
                            <p className="text-sm text-primary font-bold">
                              {item.name}
                            </p>
                            <p className="text-sm font-medium text-normal">
                              {item.time}
                            </p>
                          </div>
                          <p className="text-xs font-medium text-normal">
                            {item.content}
                          </p>
                          <div className="flex flex-row items-center gap-2">
                            <div className="w-[32px] h-[32px] rounded-full border border-primary p-1">
                              <img
                                className="w-[32px] rounded-full"
                                src={item.guildAvatar}
                              />
                            </div>
                            <p className="text-sm font-bold text-normal">
                              {item.guildName}
                            </p>
                          </div>
                          {index != gamerData.jobs.length - 1 && (
                            <div className="border-2 border-primary w-full"></div>
                          )}
                        </div>
                      );
                    })}
                  {currentTab == "missions" && gamerData.jobs?.length == 0 && (
                    <p className="text-sm font-bold text-normal w-full text-center">
                      No jobs yet.
                    </p>
                  )}
                  {currentTab == "reviews" &&
                    reviews?.length > 0 &&
                    reviews.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-start gap-2 w-full"
                        >
                          <div className="flex flex-row items-center gap-2">
                            <div className="w-[32px] rounded-full border border-primary p-1">
                              <img
                                className="w-[32px] rounded-full"
                                src={item.avatar}
                              />
                            </div>
                            <h1 className="text-sm text-normal font-bold">
                              {item.name}
                            </h1>
                          </div>
                          <p className="text-xs font-medium text-normal w-full">
                            {item.content}
                          </p>
                          {index != reviews.length - 1 && (
                            <div className="border-2 border-primary w-full"></div>
                          )}
                        </div>
                      );
                    })}
                  {currentTab == "reviews" && reviews?.length == 0 && (
                    <p className="text-sm font-bold text-normal w-full text-center">
                      No reviews yet
                    </p>
                  )}
                  {currentTab == "nfts" && (
                  <p className="text-sm font-bold text-normal w-full text-center">
                    No NFTs yet
                  </p>
                  )};
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default GamerProfilePage;

const mark = 0;

const reviews = [
  // {
  //   avatar: "/imgs/app/profile/review_avatar.svg",
  //   name: "Trooper",
  //   content:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.",
  // },
  // {
  //   avatar: "/imgs/app/profile/review_avatar.svg",
  //   name: "Trooper",
  //   content:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.",
  // },
];

const nftList = [
  // {
  //   url: "/imgs/app/profile/profile.png",
  // },
  // {
  //   url: "/imgs/app/profile/profile.png",
  // },
  // {
  //   url: "/imgs/app/profile/profile.png",
  // },
  // {
  //   url: "/imgs/app/profile/profile.png",
  // },
  // {
  //   url: "/imgs/app/profile/profile.png",
  // },
];

const badgeList = [
  {
    image: "/imgs/app/profile/review_avatar.svg",
  },
  {
    image: "/imgs/app/profile/review_avatar.svg",
  },
  {
    image: "/imgs/app/profile/review_avatar.svg",
  },
  {
    image: "/imgs/app/profile/review_avatar.svg",
  },
  {
    image: "/imgs/app/profile/review_avatar.svg",
  },
];