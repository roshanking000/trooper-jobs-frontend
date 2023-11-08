import { Link } from "react-router-dom";
import clsx from "clsx";

import {
  getMissionStateTextColor,
  getMissionStateBorderColor,
  getPaymentIcon,
  getUSDCAmount,
} from "../../utils";

import AccountAvatar from "../../components/AccountAvatar";
import ReviewStarIcon from "../../components/Icons/ReviewStarIcon";
import ChevronDownIcon from "../../components/Icons/ChevronDownIcon";
import AnimationSpinnerIcon from "../../components/Icons/AnimationSpinnerIcon";

import MaskGroup from "/imgs/common/mask_group.svg";
import searchImg from "/imgs/app/header/search.png";
import infoIcon from "/icons/info.svg";
import warningIcon from "/icons/warning.svg";
import animateSpinnerIcon from "/icons/animate_spinner.svg";

const JobDashboardPage = (props) => {
  const { setLoadingView } = props;

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
      <div className="hidden w-full h-full inset-0 justify-center absolute z-0">
        <div className="w-4/6 h-70 left-0 right-0 mx-auto absolute mt-12 hidden sm:block">
          <img src={MaskGroup} />
        </div>
        <img
          src={MaskGroup}
          className="w-full h-full sm:hidden absolute object-cover"
        />
      </div>
      <div className="flex flex-col items-start gap-8 w-full">
        <p className="text-4xl lg:text-[64px] font-bold text-primary z-10">
          Dashboard
        </p>
        <div className="flex flex-col xl:flex-row gap-10 2xl:gap-20 z-20 w-full">
          <div className="flex flex-col xl:flex-row gap-4 xl:w-[70%]">
            <div className="flex flex-col px-6 py-5 border border-primary rounded-3xl xl:rounded-full bg-primary xl:w-[24%]">
              <p className="text-sm text-normal">Mission achieved</p>
              <p className="text-[32px] text-primary">{mission_achieved}</p>
            </div>
            <div className="flex flex-col px-6 py-5 border border-primary rounded-3xl xl:rounded-full bg-primary xl:w-[24%]">
              <p className="text-sm text-normal">Open missions</p>
              <p className="text-[32px] text-primary">{open_missions}</p>
            </div>
            <div className="flex flex-col px-6 py-5 border border-primary rounded-3xl xl:rounded-full bg-primary xl:w-[28%]">
              <p className="text-sm text-normal">Total spent</p>
              <p className="text-[32px] text-primary">${total_spent}</p>
            </div>
            <div className="flex flex-col px-6 py-5 border border-primary rounded-3xl xl:rounded-full bg-primary xl:w-[24%]">
              <p className="text-sm text-normal">Rating</p>
              <div className="flex flex-row items-center gap-2">
                <p className="text-[32px] text-primary">{rating}</p>
                <ReviewStarIcon isFill={true} size={30} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 px-6 py-5 border border-indigo bg-indigo rounded-3xl xl:rounded-full xl:w-[30%]">
            <div className="flex flex-row items-center gap-2">
              <img src={infoIcon} />
              <p className="text-sm 2xl:text-base text-small">
                Job reviews pending
              </p>
            </div>
            <p className="text-xs 2xl:text-sm text-normal">
              You currently have 2 missions supposed to be achieved. Please
              review these missions to enable your payment.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-10 2xl:gap-20 z-20 w-full">
          <div className="flex flex-col gap-6 w-[70%]">
            <div className="flex flex-row justify-between items-center w-full">
              <p className="text-xl text-normal">
                Missions ({missionList.length})
              </p>
              <button className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden hover:border-0 text-sm font-medium bg-grey rounded-full group hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500">
                <div className="flex flex-row gap-2 items-center bg-primary rounded-full text-primary relative px-4 py-2 transition-all">
                  Filter by
                  <ChevronDownIcon />
                </div>
              </button>
            </div>
            {missionList.length === 0 ? (
              <p className="text-xl font-semibold text-normal">No missions</p>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-8 w-[70%]">
                  <p className="text-xs text-normal w-[18%] 2xl:w-[15%]">Status</p>
                  <p className="text-xs text-normal w-[45%]">Title</p>
                  <p className="text-xs text-normal w-[25%]">Reward</p>
                  <p className="text-xs text-normal w-[15%]">Company</p>
                </div>
                {missionList.map((item, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="flex flex-row justify-between w-full"
                      >
                        <div className="flex flex-row items-center gap-8 py-1 w-full">
                          <div className="w-[15%]">
                            <div
                              className={clsx(
                                "inline-flex px-3 py-[10px] border rounded-xl text-sm",
                                getMissionStateTextColor(item.status),
                                getMissionStateBorderColor(item.status)
                              )}
                            >
                              {item.status}
                            </div>
                          </div>
                          <p className="text-base text-primary w-[30%] 2xl:w-[40%]">
                            {item.title}
                          </p>
                          <div className="flex flex-row items-center gap-2 w-[20%]">
                            <p className="text-sm text-small">
                              ~${item.payment_amount}
                            </p>
                            <p className="text-base text-primary font-bold">
                              {getUSDCAmount(item.payment_amount)}
                            </p>
                            <img
                              className="border border-primary rounded-full w-7"
                              src={getPaymentIcon(item.payment_type)}
                            />
                          </div>
                          <div className="flex flex-row items-center gap-2 w-[20%]">
                            <AccountAvatar
                              isOfficial={item.company_logo}
                              width={"w-8"}
                              height={"h-8"}
                              borderColor={"border-[#2C2C34]"}
                              avatarFile={item.company_logo}
                            />
                            <p className="text-base text-normal font-bold">
                              {item.company_name}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-row justify-end gap-4 w-[40%] 2xl:w-[30%]">
                          {item.status !== "dispute" && (
                            <img src={warningIcon} />
                          )}
                          <button
                            className={clsx(
                              "py-3 w-[170px] rounded-full border text-primary hover:bg-hover",
                              item.status === "dispute"
                                ? "border-red"
                                : "border-purple"
                            )}
                          >
                            {item.status === "dispute" && "Dispute open"}
                            {item.status === "claimable" && "Claim payment"}
                            {item.status === "pending" && (
                              <div className="flex flex-row justify-center items-center gap-3">
                                <AnimationSpinnerIcon />
                                <p>Pending</p>
                              </div>
                            )}
                            {item.status === "achieved" && "Request payment"}
                          </button>
                        </div>
                      </div>
                      <div className="border border-primary"></div>
                    </>
                  );
                })}
              </div>
            )}
          </div>
          <div className="hidden xl:flex flex-col gap-8 w-[30%]">
            <p className="text-xl text-normal">Reviews ({reviews.length})</p>
            {reviews.length === 0 ? (
              <p className="text-normal text-base">No reviews</p>
            ) : (
              reviews.map((item, index) => {
                return (
                  <div key={index} className="flex flex-row items-center gap-4">
                    <AccountAvatar
                      isOfficial={item.avatar}
                      width={"w-16"}
                      height={"h-16"}
                      borderColor={"border-[#2C2C34]"}
                      avatarFile={item.avatar}
                    />
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row items-center gap-2">
                        <p className="text-base text-primary">{item.name}</p>
                        <p className="text-base text-normal">{item.mark}</p>
                        <ReviewStarIcon isFill={true} />
                      </div>
                      <p className="text-sm text-normal max-w-[300px] 2xl:max-w-sm">{item.content}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDashboardPage;

const mission_achieved = 32;
const open_missions = 3;
const total_spent = 493.65;
const rating = 4.6;

const missionList = [
  {
    status: "dispute",
    title: "Design the Trooper Landing Page",
    company_name: "Trooper",
    company_logo: "/imgs/app/profile/review_avatar.svg",
    payment_amount: 4000,
    payment_type: "usdc",
  },
  {
    status: "claimable",
    title: "Design the Trooper Landing Page",
    company_name: "Trooper",
    company_logo: "/imgs/app/profile/review_avatar.svg",
    payment_amount: 4000,
    payment_type: "usdc",
  },
  {
    status: "pending",
    title: "Design the Trooper Landing Page",
    company_name: "Trooper",
    company_logo: "/imgs/app/profile/review_avatar.svg",
    payment_amount: 4000,
    payment_type: "usdc",
  },
  {
    status: "achieved",
    title: "Design the Trooper Landing Page",
    company_name: "Trooper",
    company_logo: "/imgs/app/profile/review_avatar.svg",
    payment_amount: 4000,
    payment_type: "usdc",
  },
];

const reviews = [
  {
    avatar: "/imgs/app/profile/review_avatar.svg",
    name: "Trooper",
    mark: 4.6,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.",
  },
  {
    avatar: "/imgs/app/profile/review_avatar.svg",
    name: "Trooper",
    mark: 4.6,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.",
  },
];
