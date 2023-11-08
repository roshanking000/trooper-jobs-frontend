import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import RoundedButton from "/src/components/RoundedButton.jsx";

import searchImg from "/imgs/app/header/search.png";
import usdcIcon from "/imgs/app/payment/usdc.svg";
import eyeIcon from "/imgs/app/common/Eye.svg";
import circleWavyWarningIcon from "/imgs/app/common/CircleWavyWarning.svg";
import discordIcon from "/imgs/app/common/DiscordLogo.svg";
import telegramIcon from "/imgs/app/common/TelegramLogo.svg";
import emailIcon from "/imgs/app/common/MailLogo.svg";
import arrowSquareOutIcon from "/imgs/app/common/ArrowSquareOut.svg";
import acceptIcon from "/imgs/app/common/accept.svg";
import circleWavyCheckIcon from "/imgs/app/common/CircleWavyCheck.svg";

import { useAuth } from "/src/hooks/use-auth";

import {
  getAvatarPath,
  getUSDCAmount,
  isInvalid,
  numberInputOnWheelPreventChange,
} from "/src/utils";
import { toast } from "react-toastify";
import { jobApi } from "/src/api/job";
import clsx from "clsx";
import CloseIcon from "/src/components/Icons/CloseIcon";
import ReviewStarIcon from "/src/components/Icons/ReviewStarIcon";
import ChevronDownIcon from "/src/components/Icons/ChevronDownIcon";
import AccountAvatar from "/src/components/AccountAvatar";

const ReviewApplicantsPage = (props) => {
  const navigate = useNavigate();
  const { setLoadingView } = props;

  const { account } = useAuth();

  const [leaveDialogView, setLeaveDialogView] = useState({
    target: "/jobs",
    dialogView: false,
  });
  const [confirmDialogView, setConfirmDialogView] = useState(false);

  const [currentSelectedFreelancerCount, setCurrentSelectedFreelancerCount] =
    useState(0);
  const [hiredFreelancerCount, setHiredFreelancerCount] = useState(0);
  const [currentViewApplicant, setCurrentViewApplicant] = useState(null);
  const [currentTab, setCurrentTab] = useState("Questions");

  useEffect(() => {
    if (applicantList.length > 0) {
      setCurrentSelectedFreelancerCount(1);
      setHiredFreelancerCount(2);
      setCurrentViewApplicant(applicantList[0]);
    }
  }, []);

  return (
    <>
      <div className="xl:hidden absolute bg-primary hover:bg-hover rounded-full h-16 border border-primary z-[1] top-20">
        <div className="flex flex-row justify-center items-center gap-4 p-1 pr-7">
          <div className="flex items-center justify-center w-14 h-14 rounded-full border border-primary">
            <img src={searchImg} />
          </div>
          <Link
            onClick={() =>
              setLeaveDialogView({
                target: "/gamers",
                dialogView: true,
              })
            }
          >
            <span className="text-base font-semibold text-normal cursor-pointer hover:text-secondary-hover">
              Freelancers
            </span>
          </Link>
          <Link
            onClick={() =>
              setLeaveDialogView({
                target: "/guilds",
                dialogView: true,
              })
            }
          >
            <span className="text-base font-semibold text-normal cursor-pointer hover:text-secondary-hover">
              Companies
            </span>
          </Link>
          <Link
            onClick={() =>
              setLeaveDialogView({
                target: "/jobs",
                dialogView: true,
              })
            }
          >
            <span className="text-base font-semibold text-normal cursor-pointer hover:text-secondary-hover">
              Jobs
            </span>
          </Link>
        </div>
      </div>
      <section className="flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <div className="flex flex-col xl:flex-row justify-between gap-4">
            <p className="text-4xl lg:text-[64px] font-bold text-primary">
              Review applicants
            </p>
            <div className="flex flex-row items-center gap-4">
              <p className="hidden xl:block text-sm text-normal">
                {currentSelectedFreelancerCount > 0 &&
                  applicantList.length > 0 &&
                  `${currentSelectedFreelancerCount}/${applicantList.length} freelancers selected`}
              </p>
              <RoundedButton
                padding={"px-6 py-3"}
                attrib={"!text-base"}
                clickFunc={() => setConfirmDialogView(true)}
              >
                Confirm applicants
              </RoundedButton>
              <RoundedButton
                padding={"px-6 py-3"}
                attrib={"!text-base"}
                clickFunc={() =>
                  setLeaveDialogView({
                    target: "/jobs",
                    dialogView: true,
                  })
                }
              >
                Cancel
              </RoundedButton>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row justify-between items-center px-4 xl:px-8 py-4 border border-primary rounded-3xl xl:rounded-full w-full">
            <div className="flex flex-row items-center gap-4">
              <span className="text-xl text-primary font-bold line-clamp-2">
                {jobInfo.title}
              </span>
              <p className="text-base font-medium text-normal whitespace-nowrap">
                {jobInfo.posted_date}
              </p>
            </div>
            <div className="flex flex-row items-center gap-3">
              <p className="text-base text-small break-words max-w-[80px] xl:max-w-[150px] 2xl:max-w-sm">
                {"~$" + jobInfo.budget}
              </p>
              <p className="text-base text-primary break-words max-w-[80px] xl:max-w-[150px] 2xl:max-w-sm">
                {getUSDCAmount(parseFloat(jobInfo.budget))}
              </p>
              <img
                className="p-1 rounded-full border border-primary"
                src={usdcIcon}
              />
              <p className="whitespace-nowrap text-sm text-normal break-words max-w-[80px] xl:max-w-[150px] 2xl:max-w-sm truncate">
                {parseFloat(jobInfo.budget / jobInfo.recruits).toFixed(2)}
                /freelancerfreelancer
              </p>
            </div>
            <span className="text-base text-normal">
              {currentSelectedFreelancerCount} selected - {hiredFreelancerCount}{" "}
              hired -&nbsp;
              <font color="#515fff">{applicantList.length} total</font>
            </span>
          </div>
        </section>
        <section className="flex flex-col xl:flex-row gap-8 xl:gap-16">
          <section className="flex flex-col gap-4 xl:w-[50%]">
            <div className="flex flex-col xl:flex-row justify-between items-center gap-4">
              <p className="text-xl font-bold text-normal w-full">
                Applicants ({applicantList.length})
              </p>
              {applicantList.length > 0 && (
                <div className="flex flex-row justify-center xl:justify-end items-center gap-2 w-full">
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
              )}
            </div>
            {applicantList.length === 0 ? (
              <p className="text-base text-primary font-bold w-full">
                No applicants
              </p>
            ) : (
              applicantList?.map((applicant, index) => {
                return (
                  <div
                    key={index}
                    className={clsx(
                      "flex flex-row gap-4 min-w-[174px] p-4 cursor-pointer hover:bg-primary hover:rounded-3xl",
                      currentViewApplicant?.name === applicant.name
                        ? "bg-primary border border-primary rounded-3xl"
                        : ""
                    )}
                    onClick={() => setCurrentViewApplicant(applicant)}
                  >
                    <AccountAvatar
                      isOfficial={applicant.avatar}
                      width={"w-12 lg:w-16"}
                      height={"h-12 lg:h-16"}
                      avatarFile={applicant.avatar}
                    />
                    <div className="flex flex-col justify-center gap-2">
                      <div className="flex flex-row gap-4">
                        <p className="text-base text-primary font-bold">
                          {applicant.name}
                        </p>
                        <p className="text-base text-normal">
                          {applicant.missionCount} missions
                        </p>
                        <div className="flex flex-row items-center gap-1">
                          <p className="text-base text-primary font-bold">
                            {applicant.mark}
                          </p>
                          <ReviewStarIcon isFill={true} />
                        </div>
                      </div>
                      <p className="text-sm text-normal max-w-[250px] xl:max-w-md 2xl:max-w-2xl line-clamp-3">
                        {applicant.description}
                      </p>
                      <div className="flex flex-row gap-2 px-2 max-w-2xl h-10 flex-wrap overflow-hidden justify-center">
                        {applicant.roles.split(",")?.map((role, index) => {
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
                  </div>
                );
              })
            )}
          </section>
          {currentViewApplicant !== null && (
            <section className="flex flex-col gap-4 xl:w-[50%] xl:max-w-[50%]">
              <div className="flex flex-col xl:flex-row justify-between items-center gap-4">
                <div className="flex flex-row items-center gap-2 w-full">
                  <img src={eyeIcon} />
                  <p className="text-base text-primary">Application form</p>
                </div>
                <div className="flex flex-row justify-center xl:justify-end items-center gap-2 w-full">
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
              <section className="flex flex-col gap-6 lg:gap-8 px-2 lg:px-8 py-6 shadow bg-app-normal rounded-[32px] border border-primary">
                <div className="flex flex-col gap-6 lg:gap-8">
                  <div className="flex flex-row gap-4">
                    <AccountAvatar
                      isOfficial={currentViewApplicant.avatar}
                      width={"w-12 lg:w-16"}
                      height={"h-12 lg:h-16"}
                      avatarFile={currentViewApplicant.avatar}
                    />
                    <div className="flex flex-col justify-center gap-2">
                      <div className="flex flex-row justify-between max-w-[250px] xl:max-w-full">
                        <div className="flex flex-row items-center gap-4">
                          <p className="text-base text-primary font-bold">
                            {currentViewApplicant.name}
                          </p>
                          <p className="hidden xl:block text-base text-normal">
                            {currentViewApplicant.missionCount} missions
                          </p>
                          <div className="hidden xl:flex flex-row items-center gap-1">
                            <p className="text-base text-primary font-bold">
                              {currentViewApplicant.mark}
                            </p>
                            <ReviewStarIcon isFill={true} />
                          </div>
                        </div>
                        <button className="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden hover:border-0 text-sm font-medium bg-grey rounded-full group hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500">
                          <div className="flex flex-row gap-2 items-center bg-primary rounded-full text-primary relative px-4 py-2 transition-all">
                            Open Profile
                            <img src={arrowSquareOutIcon} />
                          </div>
                        </button>
                      </div>
                      <p className="text-sm text-normal max-w-[250px] xl:max-w-md 2xl:max-w-2xl line-clamp-3">
                        {currentViewApplicant.description}
                      </p>
                      <div className="flex flex-row gap-2 px-2 max-w-2xl h-10 flex-wrap justify-center">
                        {currentViewApplicant.roles
                          .split(",")
                          ?.map((role, index) => {
                            return (
                              <p
                                key={index}
                                className="h-fit px-3 py-2 rounded-xl border border-primary text-xs text-center text-normal font-bold overflow-hidden text-ellipsis max-w-[200px] lg:max-w-full"
                              >
                                {role}
                              </p>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                    <li className="w-1/2">
                      <button
                        className={clsx(
                          "text-lg inline-block p-1 border-b-4 rounded-t-lg w-full text-primary",
                          currentTab === "Questions"
                            ? "border-secondary"
                            : "border-primary"
                        )}
                        type="button"
                        onClick={() => setCurrentTab("Questions")}
                      >
                        Questions
                      </button>
                    </li>
                    <li className="w-1/2">
                      <button
                        className={clsx(
                          "text-lg inline-block p-1 border-b-4 rounded-t-lg w-full text-primary",
                          currentTab === "Reviews"
                            ? "border-secondary"
                            : "border-primary"
                        )}
                        type="button"
                        onClick={() => setCurrentTab("Reviews")}
                      >
                        Reviews ({currentViewApplicant.reviews.length})
                      </button>
                    </li>
                  </ul>
                </div>
                {currentTab === "Questions" ? (
                  <div className="flex flex-col gap-6 lg:gap-8 px-8 max-h-[300px] overflow-y-auto">
                    <div className="flex flex-col gap-2">
                      <p className="text-base text-primary">
                        How long have you been playing this game?
                      </p>
                      <p className="text-sm text-normal">
                        {currentViewApplicant.experience}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-base text-primary">
                        What languages do you speak?
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {currentViewApplicant.language.map((lang, index) => {
                          return (
                            <p
                              key={index}
                              className="px-3 py-2 rounded-xl border text-sm text-normal font-bold border-primary"
                            >
                              {lang}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-base text-primary">
                        What skills or qualifications make you a good fit?
                      </p>
                      <p className="text-sm text-normal">
                        {currentViewApplicant.skill_question}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-base text-primary">
                        What relevant experience do you have for this job?
                      </p>
                      <p className="text-sm text-normal">
                        {currentViewApplicant.experience_question}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-base text-primary">
                        Do you have questions about this job?
                      </p>
                      <p className="text-sm text-normal">
                        {currentViewApplicant.job_question}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-base text-primary">Contact</p>
                      <div className="flex flex-row flex-wrap gap-8">
                        <div className="flex flex-row items-center gap-2">
                          <img src={discordIcon} />
                          <p className="text-sm text-normal">
                            {currentViewApplicant.discord_name}
                          </p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <img src={telegramIcon} />
                          <p className="text-sm text-normal">
                            {currentViewApplicant.telegram_name}
                          </p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <img src={emailIcon} />
                          <p className="text-sm text-normal">
                            {currentViewApplicant.email_address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6 lg:gap-8 px-8 max-h-[300px] overflow-y-auto">
                    {currentViewApplicant.reviews.map((review, index) => {
                      return (
                        <div key={index} className="flex flex-col gap-2">
                          <div className="flex flex-row items-center gap-2">
                            <AccountAvatar
                              isOfficial={review.avatar}
                              width={"w-12 lg:w-8"}
                              height={"h-12 lg:h-8"}
                              avatarFile={review.avatar}
                            />
                            <p className="text-base text-normal">
                              {review.name}
                            </p>
                          </div>
                          <p className="text-sm text-normal">
                            {review.content}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="border border-primary"></div>
                <div className="flex flex-col xl:flex-row justify-between gap-2 px-8">
                  <RoundedButton
                    padding={"px-4 lg:px-8 py-3"}
                    attrib={
                      "!text-base hover:!from-[#EB5757] hover:!via-[#EB5757] hover:!to-[#EB5757]"
                    }
                  >
                    Reject applicant
                  </RoundedButton>
                  <RoundedButton
                    padding={"px-4 lg:px-8 py-3"}
                    attrib={
                      "!text-base hover:!from-[#4B4BFB] hover:!via-[#4B4BFB] hover:!to-[#4B4BFB]"
                    }
                  >
                    Accept application
                  </RoundedButton>
                </div>
              </section>
            </section>
          )}
        </section>
      </section>
      {leaveDialogView.dialogView === true && (
        <div
          className="fixed bg-blend-lighten top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm"
          onClick={() =>
            setLeaveDialogView({
              target: "/jobs",
              dialogView: false,
            })
          }
        >
          <div
            className="relative max-w-3xl max-h-[50%] lg:max-h-[90%] m-auto top-1/2 transform -translate-y-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative shadow bg-app-normal rounded-[32px] border border-primary">
              <button
                type="button"
                className="lg:hidden absolute inline-flex top-3 right-3 text-gray-400 bg-transparent hover:bg-hover rounded-lg text-sm p-1 items-center"
                onClick={() =>
                  setLeaveDialogView({
                    target: "/jobs",
                    dialogView: false,
                  })
                }
              >
                <CloseIcon />
                <span className="sr-only">Close modal</span>
              </button>
              <div className="flex flex-col gap-6 lg:gap-8 px-2 lg:px-8 py-12 lg:py-6">
                <div className="flex flex-row justify-between items-center gap-4">
                  <div className="hidden lg:flex flex-row items-center gap-4">
                    <img
                      className="border border-primary p-1 rounded-full"
                      src={circleWavyWarningIcon}
                    />
                    <p className="text-2xl text-primary font-bold">Warning</p>
                  </div>
                  <div className="lg:hidden flex flex-row items-start gap-4">
                    <img
                      className="border border-primary p-1"
                      src={circleWavyWarningIcon}
                    />
                    <p className="text-2xl text-primary font-bold">Warning</p>
                  </div>
                  <button
                    type="button"
                    className="hidden lg:inline-flex text-gray-400 bg-transparent hover:bg-hover rounded-lg text-sm p-1 items-center"
                    onClick={() =>
                      setLeaveDialogView({
                        target: "/jobs",
                        dialogView: false,
                      })
                    }
                  >
                    <CloseIcon />
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <p className="text-base text-normal">
                  You are about to leave the review applicants page. If you
                  leave, all the information you provided will be lost.
                </p>
                <p className="text-base text-normal">
                  Are you sure you want to leave?
                </p>
                <div className="flex flex-col gap-6">
                  <div className="border border-primary"></div>
                  <div className="flex flex-row justify-end items-center gap-4">
                    <RoundedButton
                      padding={"px-4 lg:px-8 py-3"}
                      attrib={
                        "!text-base hover:!from-[#EB5757] hover:!via-[#EB5757] hover:!to-[#EB5757]"
                      }
                      clickFunc={() =>
                        setLeaveDialogView({
                          target: "/jobs",
                          dialogView: false,
                        })
                      }
                    >
                      Oups, stay here
                    </RoundedButton>
                    <RoundedButton
                      padding={"px-4 lg:px-8 py-3"}
                      attrib={
                        "!text-base hover:!from-[#EB5757] hover:!via-[#EB5757] hover:!to-[#EB5757]"
                      }
                      clickFunc={() => {
                        setLeaveDialogView({
                          dialogView: false,
                        });
                        navigate(leaveDialogView.target);
                      }}
                    >
                      Yes, leave the page
                    </RoundedButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {confirmDialogView === true && (
        <div
          className="fixed bg-blend-lighten top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full xl:backdrop-blur-sm"
          onClick={() => setConfirmDialogView(false)}
        >
          <div
            className="relative max-w-3xl max-h-[50%] lg:max-h-[90%] m-auto top-1/2 transform -translate-y-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative shadow bg-app-normal rounded-[32px] border border-primary">
              <button
                type="button"
                className="lg:hidden absolute inline-flex top-3 right-3 text-gray-400 bg-transparent hover:bg-hover rounded-lg text-sm p-1 items-center"
                onClick={() => setConfirmDialogView(false)}
              >
                <CloseIcon />
                <span className="sr-only">Close modal</span>
              </button>
              <div className="flex flex-col gap-6 lg:gap-8 px-2 lg:px-8 py-12 lg:py-6">
                <div className="flex flex-row justify-between items-center gap-4">
                  <div className="hidden lg:flex flex-row items-center gap-4">
                    <img
                      className="border border-primary p-1 rounded-full"
                      src={circleWavyCheckIcon}
                    />
                    <p className="text-2xl text-primary font-bold">
                      Confirm applicants
                    </p>
                  </div>
                  <div className="lg:hidden flex flex-row items-center gap-4">
                    <img
                      className="border border-primary p-1 rounded-full"
                      src={circleWavyCheckIcon}
                    />
                    <p className="text-2xl text-primary font-bold">
                      Confirm applicants
                    </p>
                  </div>
                  <button
                    type="button"
                    className="hidden lg:inline-flex text-gray-400 bg-transparent hover:bg-hover rounded-lg text-sm p-1 items-center"
                    onClick={() => setConfirmDialogView(false)}
                  >
                    <CloseIcon />
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <p className="text-base text-normal">
                  You are about to hire the following candidates to complete
                  the&nbsp;
                  <font color="#f4f4f7">Design the Trooper Landing Page</font>
                  &nbsp;task. After your confirmation, a notification will be
                  sent to all freelancers.
                </p>
                <div className="flex flex-col gap-4">
                  <p className="text-base text-normal">
                    Freelancers ({acceptedApplicants.length})
                  </p>
                  <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
                    {acceptedApplicants.map((applicant, index) => {
                      return (
                        <div key={index} className="flex flex-row gap-4">
                          <AccountAvatar
                            isOfficial={applicant.avatar}
                            width={"w-12 lg:w-16"}
                            height={"h-12 lg:h-16"}
                            avatarFile={applicant.avatar}
                          />
                          <div className="flex flex-col justify-center gap-2">
                            <div className="flex flex-row items-center gap-4">
                              <p className="text-base text-primary font-bold">
                                {applicant.name}
                              </p>
                              <p className="text-base text-normal">
                                {applicant.missionCount} missions
                              </p>
                              <div className="flex flex-row items-center gap-1">
                                <p className="text-base text-primary font-bold">
                                  {applicant.mark}
                                </p>
                                <ReviewStarIcon isFill={true} />
                              </div>
                            </div>
                            <p className="text-sm text-normal max-w-[250px] xl:max-w-xl line-clamp-2">
                              {applicant.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="border border-primary"></div>
                  <div className="flex flex-col xl:flex-row justify-end items-center gap-2 xl:gap-4">
                    <RoundedButton
                      padding={"px-4 lg:px-8 py-3"}
                      attrib={
                        "!text-base hover:!from-[#EB5757] hover:!via-[#EB5757] hover:!to-[#EB5757] w-full xl:w-auto"
                      }
                      clickFunc={() => setConfirmDialogView(false)}
                    >
                      Go back
                    </RoundedButton>
                    <RoundedButton
                      padding={"px-4 lg:px-8 py-3"}
                      attrib={
                        "!text-base hover:!from-[#EB5757] hover:!via-[#EB5757] hover:!to-[#EB5757] w-full xl:w-auto"
                      }
                      clickFunc={() => {
                        setConfirmDialogView(false);
                      }}
                    >
                      Yes, hire those freelancers
                    </RoundedButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewApplicantsPage;

const applicantList = [
  {
    avatar: "/imgs/app/profile/review_avatar.svg",
    name: "BayMax",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
    missionCount: 42,
    mark: 4.6,
    roles: "poker,trivia,strategy",
    reviews: [
      {
        name: "Trooper",
        avatar: "/imgs/app/profile/review_avatar.svg",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.",
      },
      {
        name: "Trooper",
        avatar: "/imgs/app/profile/review_avatar.svg",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.",
      },
      {
        name: "Trooper",
        avatar: "/imgs/app/profile/review_avatar.svg",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.",
      },
      {
        name: "Trooper",
        avatar: "/imgs/app/profile/review_avatar.svg",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.",
      },
    ],
    experience: "1 - 6 months",
    language: ["French", "English (US)", "Chinese"],
    payment_address: "0x1234567",
    skill_question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
    experience_question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
    job_question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
    discord_name: "ninja_fire",
    telegram_name: "ninja_fire",
    email_address: "ninjafire@gmail.com",
  },
  {
    avatar: "/imgs/app/profile/review_avatar.svg",
    name: "Trooper",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
    missionCount: 42,
    mark: 4.6,
    roles: "poker,trivia,strategy",
    reviews: [
      {
        name: "Trooper",
        avatar: "/imgs/app/profile/review_avatar.svg",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.",
      },
      {
        name: "Trooper",
        avatar: "/imgs/app/profile/review_avatar.svg",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.",
      },
      {
        name: "Trooper",
        avatar: "/imgs/app/profile/review_avatar.svg",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.",
      },
    ],
    experience: "1 - 6 months",
    language: ["French", "English (US)", "Chinese"],
    payment_address: "0x1234567",
    skill_question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
    experience_question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
    job_question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
    discord_name: "ninja_fire",
    telegram_name: "ninja_fire",
    email_address: "ninjafire@gmail.com",
  },
  {
    avatar: "/imgs/app/profile/review_avatar.svg",
    name: "Ninja Fire",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
    missionCount: 42,
    mark: 4.6,
    roles: "poker,trivia,strategy",
    reviews: [
      {
        name: "Trooper",
        avatar: "/imgs/app/profile/review_avatar.svg",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.",
      },
      {
        name: "Trooper",
        avatar: "/imgs/app/profile/review_avatar.svg",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.",
      },
      {
        name: "Trooper",
        avatar: "/imgs/app/profile/review_avatar.svg",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.",
      },
    ],
    experience: "1 - 6 months",
    language: ["French", "English (US)", "Chinese"],
    payment_address: "0x1234567",
    skill_question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
    experience_question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
    job_question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
    discord_name: "ninja_fire",
    telegram_name: "ninja_fire",
    email_address: "ninjafire@gmail.com",
  },
];

const jobInfo = {
  title: "Design the Trooper Landing Page Design the Trooper",
  posted_date: "2 days ago",
  budget: 4000,
  recruits: 3,
};

const acceptedApplicants = [
  {
    avatar: "/imgs/app/profile/review_avatar.svg",
    name: "Ninja Fire",
    missionCount: 42,
    mark: 4.6,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
  },
  {
    avatar: "/imgs/app/profile/review_avatar.svg",
    name: "Ninja Fire",
    missionCount: 42,
    mark: 4.6,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
  },
  {
    avatar: "/imgs/app/profile/review_avatar.svg",
    name: "Ninja Fire",
    missionCount: 42,
    mark: 4.6,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
  },
];
