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

const GuildProfilePage = (props) => {
  const { setLoadingView } = props;
  const [currentTab, setCurrentTab] = useState("guild open roles");
  const location = useLocation();
  const username = location.pathname.split('/')[location.pathname.split('/').length - 1];
  const [companyData, setCompanyData] = useState(null);
  const [reputation, setReputation] = useState(0);
  const [favoriteGameList, setFavoriteGameList] = useState([]);
  const [roles, setRoles] = useState([]);

  const getCompanyData = useCallback(async (username) => {
    setLoadingView(true);
    try {
      const response = await accountApi.getAccountWithUsername(username);
      setCompanyData(response);
      setFavoriteGameList(generateFavoriteGameList(response.account.favorite_games));
      setRoles(generateRoleList(response.account.roles));
      setReputation(response.account.is_official ? 5 : 0);
    } catch (err) {
      console.log('Error >>> ', err);
      toast.error("Get Company data failed");
    }
    setLoadingView(false);
  }, [username]);

  useEffect(() => {
    getCompanyData(username);
  }, [username]);

  return (
    <>
      {companyData != null && (
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
          <section className="flex flex-col xl:flex-row justify-center xl:items-start gap-6 xl:gap-20 p-6 xl:p-0 w-full">
            <div className="flex flex-col items-center gap-3 xl:gap-8 xl:min-w-[320px] xl:max-w-[320px] z-10">
              <div className="flex flex-col w-1/2 xl:w-full items-center justify-center">
                <AccountAvatar
                  isOfficial={companyData == null ? false : companyData.account.is_official}
                  width={'w-[280px] xl:w-[296px]'}
                  height={'h-[280px] xl:h-[296px]'}
                  imageWidth={'max-w-[272px] w-[272px] sm:max-w-[288px] sm:w-[288px]'}
                  imageheight={'max-h-[272px] h-[272px] sm:max-h-[288px] sm:h-[288px]'}
                  zOrder={'z-0'}
                  avatarFile={companyData == null ? null : companyData.account.avatar_file}
                  padding={companyData == null ? 'p-[2px]' : (companyData.account.is_official ? 'p-[4px]' : 'p-[2px]')}
                />
                <RoundedButton
                  width={"w-full"}
                  padding={"px-6 py-3"}
                  margin={"!-mt-4"}
                  attrib={"xl:hidden !text-sm"}
                >
                  Contact
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
                      Last news ({lastNews?.length})
                    </h1>
                    {lastNews?.length !== 0 && (
                      <RoundedButton
                        attrib={"!text-base !text-normal"}
                        padding={"px-4 py-2"}
                      >
                        See all
                      </RoundedButton>
                    )}
                  </div>
                  {lastNews?.length > 0 &&
                    lastNews.map((item, index) => {
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
                  {lastNews?.length == 0 && (
                    <div className="flex flex-col items-start gap-2">
                      <p className="text-xs font-semibold text-normal">No news</p>
                    </div>
                  )}
                </div>
                <div className="hidden xl:flex flex-col px-6 py-4 gap-4 rounded-3xl bg-secondary border-2 border-primary w-full">
                  <div className="flex flex-row justify-between items-center gap-2">
                    <h1 className="text-lg 2xl:text-xl text-normal font-bold">
                      Total members ({companyData.members.length})
                    </h1>
                    {companyData.members?.length !== 0 && (
                      <RoundedButton
                        attrib={"!text-base !text-normal"}
                        padding={"px-4 py-2"}
                      >
                        See all
                      </RoundedButton>
                    )}
                  </div>
                  {companyData.members?.length === 0 && (
                    <p className="text-xs font-semibold text-normal">No members</p>
                  )}
                  <div className="grid grid-cols-3 gap-4">
                    {companyData.members?.length > 0 &&
                      companyData.members.map((item, index) => {
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
                    {companyData.account.name}
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
                  width={"min-w-[120px]"}
                  padding={"py-3"}
                  attrib={"hidden xl:block !text-base"}
                >
                  Contact
                </RoundedButton>
              </div>
              <h1 className="text-2xl xl:text-[32px] font-medium text-normal w-full">
                @{companyData.account.username}
              </h1>
              <h1 className="text-md font-medium text-normal w-full">
                {isInvalid(companyData.account.short_description) ? 'No description' : companyData.account.short_description}
              </h1>
              <div className="flex flex-row items-start gap-6 xl:gap-16 w-full">
                <div className="flex flex-col items-start gap-2 xl:gap-4 w-1/2">
                  <h1 className="text-lg xl:text-xl font-bold text-normal">
                    Games this guild plays
                  </h1>
                  {favoriteGameList?.length === 0 && (
                    <div className="flex flex-col items-start gap-2">
                      <p className="text-xs font-semibold text-normal">No games</p>
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
                <p className="text-xl font-bold text-normal">guild heads</p>
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
                  Guild open roles ({companyData.jobs?.length})
                </p>
                {companyData.jobs?.length === 0 && (
                  <div className="flex flex-col items-start gap-2">
                    <p className="text-xs font-semibold text-normal">
                      No open roles
                    </p>
                  </div>
                )}
                {companyData.jobs?.length > 0 && (
                  <div className="flex flex-col items-start gap-4 w-full">
                    {companyData.jobs?.map((item, index) => {
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
                          {index != companyData.jobs.length - 1 && (
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
                      className={clsx('text-sm inline-block p-2 border-b-4 rounded-t-lg w-full', currentTab == 'guild open roles' ? 'border-mandatory' : 'border-primary')}
                      type="button"
                      onClick={() => setCurrentTab(`guild open roles`)}
                    >
                      Guild open roles ({companyData.jobs?.length})
                    </button>
                  </li>
                  <li className="w-1/3">
                    <button
                      className={clsx('text-sm inline-block p-2 border-b-4 rounded-t-lg', currentTab == 'last news' ? 'border-mandatory' : 'border-primary')}
                      type="button"
                      onClick={() => setCurrentTab("last news")}
                    >
                      Last news ({lastNews?.length})
                    </button>
                  </li>
                  <li className="w-1/3">
                    <button
                      className={clsx('text-sm inline-block p-2 border-b-4 rounded-t-lg', currentTab == 'total members' ? 'border-mandatory' : 'border-primary')}
                      type="button"
                      onClick={() => setCurrentTab("total members")}
                    >
                      Total members ({companyData.members?.length})
                    </button>
                  </li>
                </ul>
              </div>
              <div className="xl:hidden flex-col items-start gap-4 w-full">
                <div className="flex flex-col items-start gap-4 w-full">
                  {currentTab == "guild open roles" &&
                    companyData.jobs?.map((item, index) => {
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
                          {index != companyData.jobs.length - 1 && (
                            <div className="border-2 border-primary w-full"></div>
                          )}
                        </div>
                      );
                    })}
                  {currentTab == "guild open roles" && companyData.jobs?.length == 0 && (
                    <p className="text-sm font-bold text-normal w-full text-center">
                      No open role yet.
                    </p>
                  )}
                  {currentTab == "last news" &&
                    lastNews?.length > 0 &&
                    lastNews.map((item, index) => {
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
                          {index != lastNews.length - 1 && (
                            <div className="border-2 border-primary w-full"></div>
                          )}
                        </div>
                      );
                    })}
                  {currentTab == "last news" && lastNews?.length == 0 && (
                    <p className="text-sm font-bold text-normal w-full text-center">
                      No news yet
                    </p>
                  )}
                  {currentTab == "total members" && companyData.members.length == 0 && (
                    <p className="text-sm font-bold text-normal w-full text-center">
                      No members
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

    </>
  );
};

export default GuildProfilePage;

const lastNews = [
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

// const games = [
//   {
//     name: "RollerCoin",
//     image: "/imgs/app/profile/review_avatar.svg",
//   },
//   {
//     name: "The Sandbox",
//     image: "/imgs/app/profile/review_avatar.svg",
//   },
//   {
//     name: "Decentraland",
//     image: "/imgs/app/profile/review_avatar.svg",
//   },
//   {
//     name: "Axie Infinity",
//     image: "/imgs/app/profile/review_avatar.svg",
//   },
//   {
//     name: "Gala Games",
//     image: "/imgs/app/profile/review_avatar.svg",
//   },
//   {
//     name: "Enjin Coin",
//     image: "/imgs/app/profile/review_avatar.svg",
//   },
// ];

const badgeList = [
  {
    image: "/imgs/app/profile/review_avatar.svg",
  },
  {
    image: "/imgs/app/profile/review_avatar.svg",
  },
];

// const guildHeads = [
//   {
//     name: "CEO",
//   },
//   {
//     name: "CMO",
//   },
//   {
//     name: "Guild manager",
//   },
//   {
//     name: "NFT trader",
//   },
// ];

// const guildOpenRoleList = [
//   {
//     name: "Design the Trooper Landing Page",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.",
//     guildName: "Trooper",
//     guildAvatar: "/imgs/app/profile/review_avatar.svg",
//     time: "2 days ago",
//     status: "Past",
//   },
//   {
//     name: "Design the Trooper Landing Page",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.",
//     guildName: "Trooper",
//     guildAvatar: "/imgs/app/profile/review_avatar.svg",
//     time: "2 days ago",
//     status: "Past",
//   },
//   {
//     name: "Design the Trooper Landing Page",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.",
//     guildName: "Trooper",
//     guildAvatar: "/imgs/app/profile/review_avatar.svg",
//     time: "2 days ago",
//     status: "Past",
//   },
//   {
//     name: "Design the Trooper Landing Page",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.",
//     guildName: "Trooper",
//     guildAvatar: "/imgs/app/profile/review_avatar.svg",
//     time: "2 days ago",
//     status: "Past",
//   },
// ];
