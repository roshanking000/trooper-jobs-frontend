import { useState, Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

import RoundedButton from "/src/components/RoundedButton.jsx";

import searchImg from "/imgs/app/header/search.png";
import usdcIcon from "/imgs/app/payment/usdc.svg";
import circlesFourIcon from "/imgs/app/common/CirclesFour.svg";
import eyeIcon from "/imgs/app/common/Eye.svg";
import circleWavyWarningIcon from "/imgs/app/common/CircleWavyWarning.svg";
import paperIcon from "/imgs/app/common/paper.svg";
import contactIcon from "/imgs/app/common/contact.svg";
import discordIcon from "/imgs/app/common/DiscordLogo.svg";
import telegramIcon from "/imgs/app/common/TelegramLogo.svg";
import emailIcon from "/imgs/app/common/MailLogo.svg";

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

const LanguageName = [
  { name: "English" },
  { name: "Spanish" },
  { name: "French" },
];

const JobApplicationPage = (props) => {
  const navigate = useNavigate();
  const { setLoadingView } = props;

  const { account } = useAuth();

  const [leaveDialogView, setLeaveDialogView] = useState({
    target: "/jobs",
    dialogView: false,
  });

  const [experience, setExperience] = useState("");
  const [language, setLanguage] = useState([{ name: "Select" }]);
  const [paymentAddress, setPaymentAddress] = useState("");
  const [skillQuestion, setSkillQuestion] = useState("");
  const [experienceQuestion, setExperienceQuestion] = useState("");
  const [jobQuestion, setJobQuestion] = useState("");
  const [discordName, setDiscordName] = useState("");
  const [telegramName, setTelegramName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const handleApplyJob = async () => {
    // Check General Information
    if (isInvalid(experience)) {
      toast.warning("Please select your experience");
      return;
    }
    if (language[0].name === "Select") {
      toast.warning("Please select language");
      return;
    }
    if (isInvalid(paymentAddress)) {
      toast.warning("Please input your payment address");
      return;
    }
    // Check questions
    if (isInvalid(skillQuestion)) {
      toast.warning("Please input questions");
      return;
    }
    if (isInvalid(experienceQuestion)) {
      toast.warning("Please input questions");
      return;
    }
    if (isInvalid(jobQuestion)) {
      toast.warning("Please input questions");
      return;
    }

    const postData = {
      experience: experience,
      languages: language.map((lang) => lang.name).join(","),
      payment_address: paymentAddress,
      skill_question: skillQuestion,
      experience_question: experienceQuestion,
      job_question: jobQuestion,
      discord_name: discordName,
      telegram_name: telegramName,
      email_address: emailAddress,
    };
  };

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
        <div className="flex flex-row gap-4 justify-between items-center">
          <p className="text-4xl lg:text-[64px] font-bold text-primary">
            Job application
          </p>
          <div className="hidden xl:flex flex-row justify-end items-center gap-4">
            <RoundedButton
              padding={"px-6 py-3"}
              attrib={"!text-base"}
              clickFunc={handleApplyJob}
            >
              Apply to this job
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
        <section className="flex flex-col xl:flex-row gap-16">
          <section className="flex flex-col gap-8 xl:w-[50%]">
            <section className="flex flex-col gap-4">
              <div className="flex flex-row gap-2">
                <img src={circlesFourIcon} />
                <p className="text-base text-primary">General information*</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-normal">
                  How much experience do you have in this specific task area?
                </p>
                <div className="flex flex-wrap gap-2">
                  <p
                    className={clsx(
                      "px-3 py-2 rounded-xl border text-sm text-normal font-bold hover:bg-button-primary cursor-pointer",
                      experience === "1 month"
                        ? "border-purple"
                        : "border-primary"
                    )}
                    onClick={() => setExperience("1 month")}
                  >
                    &lt; 1 month
                  </p>
                  <p
                    className={clsx(
                      "px-3 py-2 rounded-xl border text-sm text-normal font-bold hover:bg-button-primary cursor-pointer",
                      experience === "1 - 6 months"
                        ? "border-purple"
                        : "border-primary"
                    )}
                    onClick={() => setExperience("1 - 6 months")}
                  >
                    1 - 6 months
                  </p>
                  <p
                    className={clsx(
                      "px-3 py-2 rounded-xl border text-sm text-normal font-bold hover:bg-button-primary cursor-pointer",
                      experience === "6 - 12 months"
                        ? "border-purple"
                        : "border-primary"
                    )}
                    onClick={() => setExperience("6 - 12 months")}
                  >
                    6 - 12 months
                  </p>
                  <p
                    className={clsx(
                      "px-3 py-2 rounded-xl border text-sm text-normal font-bold hover:bg-button-primary cursor-pointer",
                      experience === "1 year"
                        ? "border-purple"
                        : "border-primary"
                    )}
                    onClick={() => setExperience("1 year")}
                  >
                    &gt; 1 year
                  </p>
                  <p
                    className={clsx(
                      "px-3 py-2 rounded-xl border text-sm text-normal font-bold hover:bg-button-primary cursor-pointer",
                      experience === "2 years"
                        ? "border-purple"
                        : "border-primary"
                    )}
                    onClick={() => setExperience("2 years")}
                  >
                    &gt; 2 years
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-normal">
                  What languages do you speak?
                </p>
                <div className="relative w-1/2 xl:w-[32%] 2xl:w-[25%] z-50">
                  <Listbox
                    value={language}
                    onChange={(e) => {
                      if (e.length > 0) {
                        let flag = 0;
                        e.map((item) => {
                          if (item.name == "Select") flag = 1;
                        });
                        if (flag === 1) setLanguage(e.slice(1, e.length));
                        else setLanguage(e);
                      }
                    }}
                    multiple
                  >
                    <div className="relative">
                      <Listbox.Button className="flex items-center justify-between text-normal px-5 py-2 text-base focus:outline-none border border-primary bg-primary w-full rounded-full">
                        <span className="block truncate">
                          {language.map((lang) => lang.name).join(", ")}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronDownIcon />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute max-h-60 w-full overflow-auto bg-primary rounded-2xl text-base sm:text-sm">
                          {LanguageName.map((language, languageIdx) => (
                            <Listbox.Option
                              key={languageIdx}
                              className={({ active }) =>
                                `relative text-base cursor-default select-none py-2 pl-10 pr-4 bg-primary ${
                                  active ? "text-primary" : "text-normal"
                                }`
                              }
                              value={language}
                            >
                              {({ selected }) => (
                                <>
                                  <div className="flex flex-row gap-2 items-center">
                                    <span className="block truncate">
                                      {language.name}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-normal">
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </div>
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-normal">
                  What is your payment address?
                </p>
                <input
                  type="text"
                  placeholder="address"
                  className="xl:w-[50%] bg-app-normal block px-6 py-3 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-full"
                  value={paymentAddress}
                  onChange={(e) => setPaymentAddress(e.target.value)}
                />
              </div>
            </section>
            <div className="border border-primary"></div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2">
                <img src={paperIcon} />
                <p className="text-base text-primary">Questions*</p>
              </div>
              <textarea
                type="text"
                placeholder="What skills or qualifications make you a good fit?"
                className="bg-app-normal block w-full h-[150px] px-6 py-3 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-3xl"
                value={skillQuestion}
                onChange={(e) => setSkillQuestion(e.target.value)}
              />
              <textarea
                type="text"
                placeholder="What relevant experience do you have for this job?"
                className="bg-app-normal block w-full h-[150px] px-6 py-3 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-3xl"
                value={experienceQuestion}
                onChange={(e) => setExperienceQuestion(e.target.value)}
              />
              <textarea
                type="text"
                placeholder="Do you have questions about this job?"
                className="bg-app-normal block w-full h-[150px] px-6 py-3 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-3xl"
                value={jobQuestion}
                onChange={(e) => setJobQuestion(e.target.value)}
              />
            </div>
            <div className="border border-primary"></div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2">
                <img src={contactIcon} />
                <p className="text-base text-primary">Contacts</p>
              </div>
              <div className="flex flex-col xl:flex-row gap-4">
                <div className="relative xl:w-1/3">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <img src={discordIcon} />
                  </div>
                  <input
                    type="text"
                    className="bg-app-normal block w-full h-14 p-4 pl-10 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-full"
                    placeholder="Discord"
                    value={discordName}
                    onChange={(e) => setDiscordName(e.target.value)}
                  />
                </div>
                <div className="relative xl:w-1/3">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <img src={telegramIcon} />
                  </div>
                  <input
                    type="text"
                    className="bg-app-normal block w-full h-14 p-4 pl-10 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-full"
                    placeholder="Telegram"
                    value={telegramName}
                    onChange={(e) => setTelegramName(e.target.value)}
                  />
                </div>
                <div className="relative xl:w-1/3">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <img src={emailIcon} />
                  </div>
                  <input
                    type="text"
                    className="bg-app-normal block w-full h-14 p-4 pl-10 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-full"
                    placeholder="Email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="xl:hidden flex flex-row justify-center items-center gap-4">
              <RoundedButton
                padding={"px-6 py-3"}
                attrib={"!text-base"}
                clickFunc={handleApplyJob}
              >
                Apply to this job
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
          </section>
          <section className="border border-primary h-100vh"></section>
          <section className="flex flex-col gap-4 xl:w-[50%] xl:max-w-[50%]">
            <div className="flex flex-row items-center gap-2">
              <img src={eyeIcon} />
              <p className="text-base text-primary">Job offer</p>
            </div>
            <section className="shadow bg-app-normal rounded-[32px] border border-primary">
              <div className="flex flex-col gap-6 lg:gap-8 px-2 lg:px-8 py-6">
                <div className="flex flex-row justify-between items-center gap-4">
                  <div className="hidden lg:flex flex-row justify-between items-center gap-4 w-full">
                    <div className="flex flex-row gap-4 items-center">
                      <div className="px-3 py-1 border border-green rounded-xl text-sm text-green">
                        open
                      </div>
                      <span className="text-2xl text-primary font-bold break-words xl:max-w-sm 2xl:max-w-xl">
                        {jobInfo.title}
                      </span>
                    </div>
                    <p className="text-base font-medium text-normal whitespace-nowrap">
                      {jobInfo.posted_date}
                    </p>
                  </div>
                  <div className="lg:hidden flex flex-row justify-between items-start gap-4">
                    <div className="flex flex-row gap-4 items-center">
                      <div className="px-3 py-1 border border-green rounded-xl text-sm text-green">
                        open
                      </div>
                      <div className="flex flex-col justify-center gap-2">
                        <p className="text-lg lg:text-2xl text-primary font-bold break-words max-w-[250px]">
                          {jobInfo.title}
                        </p>
                      </div>
                    </div>
                    <p className="text-base font-medium text-normal">
                      {jobInfo.posted_date}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <AccountAvatar
                    isOfficial={account != null && account.is_official}
                    width={"w-12 lg:w-16"}
                    height={"h-12 lg:h-16"}
                    avatarFile={account != null ? account.avatar : null}
                  />
                  <div className="flex flex-col justify-center gap-2">
                    <div className="flex flex-row gap-4">
                      <p className="text-base text-primary font-bold">
                        {account != null && account.name}
                      </p>
                      <p className="text-base text-normal">0 missions</p>
                      <div className="flex flex-row items-center gap-1">
                        <p className="text-base text-primary font-bold">
                          {account != null && account.is_official ? 5 : 0}
                        </p>
                        <ReviewStarIcon isFill={true} />
                      </div>
                    </div>
                    <p className="text-sm text-normal min-h-[50px]">
                      {account != null && account.description}
                    </p>
                    <div className="flex flex-row gap-4 items-start lg:items-center">
                      <p className="text-base text-normal font-bold">Badges</p>
                      <div className="flex flex-row flex-wrap items-center gap-2">
                        {clientInfo.badgeList?.map((item, index) => {
                          return (
                            <img
                              key={index}
                              className="border border-primary rounded-full w-8 p-0.5"
                              src={item.image}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                  <li className="w-1/2">
                    <button
                      className="text-lg inline-block p-1 border-b-4 rounded-t-lg w-full border-secondary text-primary"
                      type="button"
                    >
                      General
                    </button>
                  </li>
                  <li className="w-1/2">
                    <button
                      className="text-lg inline-block p-1 border-b-4 border-primary text-normal rounded-t-lg w-full"
                      type="button"
                    >
                      Rewards (3)
                    </button>
                  </li>
                </ul>
                <div className="flex flex-col gap-6 lg:gap-8">
                  <div className="flex flex-col gap-2">
                    <p className="text-base text-primary font-bold">
                      Company name
                    </p>
                    <p className="text-base text-normal w-full break-words max-w-sm xl:max-w-md 2xl:max-w-2xl">
                      {jobInfo.company_name}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-base text-primary font-bold">
                      Description
                    </p>
                    <p className="text-base text-normal w-full break-words max-w-sm xl:max-w-md 2xl:max-w-2xl">
                      {jobInfo.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                    <div className="flex flex-col gap-1 lg:gap-2">
                      <p className="text-base text-primary font-bold">
                        Starting on
                      </p>
                      <p className="text-base text-normal">
                        {jobInfo.starting_on}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 lg:gap-2">
                      <p className="text-base text-primary font-bold">
                        Duration
                      </p>
                      <p className="text-base text-normal">
                        {jobInfo.duration}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 lg:gap-2">
                      <p className="text-base text-primary font-bold">
                        Recruits
                      </p>
                      <p className="text-base text-normal break-words">
                        {jobInfo.recruits}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 lg:gap-2">
                      <p className="text-base text-primary font-bold">
                        Language
                      </p>
                      {jobInfo.language.map((item, index) => {
                        return (
                          <div key={index}>
                            <p className="text-base text-normal">{item.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-base text-primary font-bold">Skills</p>
                    <div className="flex flex-row flex-wrap items-center gap-2">
                      {jobInfo.roles?.map((item, index) => {
                        return (
                          <p
                            key={index}
                            className="px-3 py-2 rounded-xl border border-primary text-sm text-normal font-bold"
                          >
                            {item.text}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="border border-primary"></div>
                  <div className="flex flex-row justify-end items-center gap-4">
                    <div className="flex flex-row justify-end items-center gap-3 w-full">
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
                      <p className="text-sm text-normal break-words max-w-[80px] xl:max-w-[150px] 2xl:max-w-sm">
                        {parseFloat(jobInfo.budget / jobInfo.recruits).toFixed(
                          2
                        )}
                        /freelancer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
                    <div className="lg:hidden flex flex-row items-center gap-4">
                      <img
                        className="border border-primary p-1 rounded-full"
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
                    You are about to leave the job creation page. If you leave,
                    all the information you provided for your job creation will
                    be lost.
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
      </section>
    </>
  );
};

export default JobApplicationPage;

const clientInfo = {
  avatar: "/imgs/app/profile/review_avatar.svg",
  name: "Trooper",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.",
  hireCount: 42,
  mark: 4.6,
  badgeList: [
    {
      image: "/imgs/app/profile/review_avatar.svg",
    },
  ],
};

const jobInfo = {
  title: "Design the Trooper Landing Page Design the Trooper",
  posted_date: "2 days ago",
  status: "open",
  budget: 4000,
  company_name: "Trooper",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.",
  starting_on: "2023-07-14",
  duration: "2 weeks",
  recruits: 3,
  language: ["English"],
  nft_required: "BAYC 5467",
  roles: [
    {
      text: "poker",
    },
    {
      text: "trivia",
    },
    {
      text: "strategy",
    },
  ],
};
