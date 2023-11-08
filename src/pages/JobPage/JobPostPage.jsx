import { useState, Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import RoundedButton from "/src/components/RoundedButton.jsx";
import SpecialityTagInput from "/src/components/SpecialityTagInput";

import SecurePaymentDialog from "./SecurePaymentDialog";
import ApproveTokenDialog from "./ApproveTokenDialog";

import searchImg from "/imgs/app/header/search.png";
import usdcIcon from "/imgs/app/payment/usdc.svg";
import circlesFourIcon from "/imgs/app/common/CirclesFour.svg";
import alignLeftIcon from "/imgs/app/common/AlignLeft.svg";
import eyeIcon from "/imgs/app/common/Eye.svg";
import scrollIcon from "/imgs/app/common/Scroll.svg";
import circleWavyWarningIcon from "/imgs/app/common/CircleWavyWarning.svg";
import circleWavyCheckIcon from "/imgs/app/common/CircleWavyCheck.svg";
import gamecontrollerIcon from "/imgs/landing/GameController.svg";
import crownIcon from "/imgs/landing/crown.svg";
import questionIcon from "/imgs/app/common/Question.svg";
import { useAuth } from "../../hooks/use-auth";
import trooperLogo from "/imgs/app/profile/review_avatar.svg";
import {
  getAvatarPath,
  getUSDCAmount,
  isInvalid,
  numberInputOnWheelPreventChange,
} from "../../utils";
import { toast } from "react-toastify";
import { jobApi } from "../../api/job";
import clsx from "clsx";
import CloseIcon from "../../components/Icons/CloseIcon";
import ReviewStarIcon from "../../components/Icons/ReviewStarIcon";
import ChevronDownIcon from "../../components/Icons/ChevronDownIcon";
import AccountAvatar from "../../components/AccountAvatar";

const PaymentName = [{ name: "USDC" }];

const LanguageName = [
  { name: "English" },
  { name: "Spanish" },
  { name: "French" },
];

const JobPostPage = (props) => {
  const navigate = useNavigate();
  const { setLoadingView } = props;

  const { account } = useAuth();
  const [jobTitle, setJobTitle] = useState("");
  const [gameName, setGameName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [payment, setPayment] = useState(PaymentName[0]);
  const [additionalReward, setAdditionalReward] = useState(false);
  const [type, setType] = useState("");
  const [rewardReference, setRewardReference] = useState("");
  const [roles, setRoles] = useState([]);
  const [startingOn, setStartingOn] = useState("");
  const [endingOn, setEndingOn] = useState("");
  const [endUnderCondition, setEndUnderCondition] = useState(false);
  const [paymentShare, setPaymentShare] = useState(1);
  const [condition, setCondition] = useState("");
  const [duration, setDuration] = useState("");
  const [nftRequired, setNFTRequired] = useState(false);

  const [numberOfGamers, setNumberOfGamers] = useState("");
  const [language, setLanguage] = useState([LanguageName[0]]);
  const [ndaRequired, setNDARequired] = useState(false);
  const [requirements, setRequirements] = useState("");

  const [paymentInfo, setPaymentInfo] = useState({
    usd_budget: 4000,
    usdc_budget: 3998,
    gamer_per_amount: 39.98,
  });
  const [leaveDialogView, setLeaveDialogView] = useState({
    target: "/jobs",
    dialogView: false,
  });
  const [jobCreateSuccess, setJobCreateSuccess] = useState(false);
  const [securePaymentDialogView, setSecurePaymentDialogView] = useState(false);
  const [approveTokenDialogView, setApproveTokenDialogView] = useState(false);
  const [jobId, setJobId] = useState("");

  useEffect(() => {
    if (!jobCreateSuccess)
      return;
    if (!approveTokenDialogView && !securePaymentDialogView)
      navigate('/jobs');
  }, [jobCreateSuccess, securePaymentDialogView, approveTokenDialogView])

  const handleCreateJob = async () => {
    // Check General Information
    if (isInvalid(jobTitle)) {
      toast.warning("Please input job title");
      return;
    }
    if (isInvalid(gameName)) {
      toast.warning("Please input company name");
      return;
    }
    if (isInvalid(jobDescription)) {
      toast.warning("Please input job description");
      return;
    }
    if (isInvalid(paymentAmount)) {
      toast.warning("Please input payment amount");
      return;
    }

    // Check Roles
    if (roles.length == 0) {
      toast.warning("Please input skills");
      return;
    }

    // Check Schedule
    if (isInvalid(startingOn)) {
      toast.warning("Please input start date");
      return;
    }

    if (isInvalid(endingOn)) {
      toast.warning("Please input end date");
      return;
    }

    if (isInvalid(numberOfGamers)) {
      toast.warning("Please input number of freelancers");
      return;
    }

    if (endUnderCondition && isInvalid(condition)) {
      toast.warning("Please input end under condition");
      return;
    }

    const postData = {
      job_title: jobTitle,
      game_name: gameName,
      description: jobDescription,
      payment_amount: paymentAmount,
      payment_type: payment.name,
      roles: roles.map((obj) => obj.text).join(","),
      start_on: startingOn,
      end_on: endingOn,
      end_under_condition: condition,
      number_of_gamers: numberOfGamers,
      languages: language.map((lang) => lang.name).join(","),
      nda_required: ndaRequired,
      requirements: requirements,
    };
    console.log("postData >>> ", postData);

    setLoadingView(true);
    try {
      const response = await jobApi.createJob(postData);
      if (response.status == "success") {
        toast.success(response.message);
        const job_id = response.data.job_id;
        setJobId(job_id);
        setSecurePaymentDialogView(true);
        setJobCreateSuccess(true);
      }
    } catch (err) {
      console.log("err >>> ", err);
      toast.error(err.message);
    }
    setLoadingView(false);
  };

  const onTransferFundSuccess = async () => {
    console.log("onTransferFundSuccess");
    setLoadingView(true);
    try {
      const response = await jobApi.updateJobPaymentStatus(
        jobId,
        "Deposited",
        "tx1234567"
      );
      if (response.status == "success") {
        navigate("/jobs");
      }
    } catch (err) {
      toast.error(err.message);
    }
    setLoadingView(false);
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
        <div className="flex flex-col xl:flex-row gap-4 justify-between items-center">
          <p className="text-4xl lg:text-[64px] font-bold text-primary">
            New job offer
          </p>
          <div className="flex flex-row justify-end items-center gap-4">
            <RoundedButton
              padding={"px-6 py-3"}
              attrib={"!text-base"}
              clickFunc={handleCreateJob}
            >
              Create a new job
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
              <div className="flex flex-row gap-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  className="bg-app-normal block w-[50%] xl:w-[65%] px-6 py-3 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-full"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Company name"
                  className="bg-app-normal block w-[50%] xl:w-[35%] px-6 py-3 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-full"
                  value={gameName}
                  onChange={(e) => setGameName(e.target.value)}
                />
              </div>
              <textarea
                type="text"
                placeholder="Job Description"
                className="bg-app-normal block w-full h-[127px] px-6 py-3 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-3xl"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <div className="flex flex-col xl:flex-row gap-4 items-center">
                <div className="flex flex-row gap-4 items-center w-full justify-center">
                  <input
                    type="number"
                    onWheel={numberInputOnWheelPreventChange}
                    placeholder="Payment"
                    className="w-[55%] h-10 bg-app-normal block px-6 py-3 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-full"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                  />
                  <div className="relative w-[45%] z-50 h-10">
                    <Listbox value={payment} onChange={setPayment}>
                      <div className="relative">
                        <Listbox.Button className="flex items-center justify-between text-normal px-5 py-2 text-base focus:outline-none border border-primary bg-primary w-full rounded-full">
                          <span className="block truncate">{payment.name}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-normal"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute max-h-60 w-full overflow-auto bg-primary rounded-2xl text-base sm:text-sm">
                            {PaymentName.map((payment, paymentIdx) => (
                              <Listbox.Option
                                key={paymentIdx}
                                className={({ active }) =>
                                  `relative text-base cursor-default select-none py-2 pl-10 pr-4 bg-primary ${
                                    active ? "text-primary" : "text-normal"
                                  }`
                                }
                                value={payment}
                              >
                                {({ selected }) => (
                                  <>
                                    <div className="flex flex-row gap-2 items-center">
                                      {payment.name == "USDC" && (
                                        <img
                                          className="w-6 h-6"
                                          src={usdcIcon}
                                        />
                                      )}
                                      <span className="block truncate">
                                        {payment.name}
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
                  <div className="hidden flex items-center gap-1 cursor-pointer">
                    {additionalReward == true ? (
                      <input
                        checked
                        id="additional-reward-checkbox"
                        type="checkbox"
                        className="cursor-pointer w-4 h-4 text-secondary bg-primary border-primary rounded focus:ring-0 focus:ring-offset-0"
                        onChange={() => setAdditionalReward(false)}
                      />
                    ) : (
                      <input
                        id="additional-reward-checkbox"
                        type="checkbox"
                        className="cursor-pointer w-4 h-4 text-secondary bg-primary border-primary rounded focus:ring-0 focus:ring-offset-0"
                        onChange={() => setAdditionalReward(true)}
                      />
                    )}
                    <label
                      htmlFor="additional-reward-checkbox"
                      className="ml-2 text-sm text-normal cursor-pointer"
                    >
                      Additional reward
                    </label>
                    <img className="cursor-pointer" src={questionIcon} />
                  </div>
                </div>

                <div className="flex flex-col gap-2 ">
                  <div className="flex items-center">
                    {paymentShare == 0 && (
                      <input
                        checked
                        id="per-recruiter-checkbox"
                        type="checkbox"
                        className="cursor-pointer w-4 h-4 text-secondary bg-primary border-primary rounded focus:ring-0 focus:ring-offset-0"
                        onChange={() => setPaymentShare(0)}
                      />
                    )}
                    {paymentShare == 1 && (
                      <input
                        id="per-recruiter-checkbox"
                        type="checkbox"
                        className="cursor-pointer w-4 h-4 text-secondary bg-primary border-primary rounded focus:ring-0 focus:ring-offset-0"
                        onChange={() => setPaymentShare(0)}
                      />
                    )}
                    <label
                      htmlFor="per-recruiter-checkbox"
                      className="cursor-pointer ml-2 text-sm text-normal"
                    >
                      Payment per recruiter
                    </label>
                  </div>
                  <div className="flex items-center">
                    {paymentShare == 1 && (
                      <input
                        checked
                        id="share-recruiter-checkbox"
                        type="checkbox"
                        className="cursor-pointer w-4 h-4 text-secondary bg-primary border-primary rounded focus:ring-0 focus:ring-offset-0"
                        onChange={() => setPaymentShare(1)}
                      />
                    )}
                    {paymentShare == 0 && (
                      <input
                        id="share-recruiter-checkbox"
                        type="checkbox"
                        className="cursor-pointer w-4 h-4 text-secondary bg-primary border-primary rounded focus:ring-0 focus:ring-offset-0"
                        onChange={() => setPaymentShare(1)}
                      />
                    )}
                    <label
                      htmlFor="share-recruiter-checkbox"
                      className="cursor-pointer ml-2 text-sm text-normal"
                    >
                      Payment to be shared between all recruiters
                    </label>
                  </div>
                </div>
              </div>
              {additionalReward == true && (
                <div className="flex flex-row justify-between items-center w-full">
                  <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden hover:border-0 text-sm font-medium bg-grey rounded-full group hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500">
                    <div className="flex flex-row gap-2 items-center bg-primary rounded-full text-primary relative px-6 py-3 transition-all">
                      Type
                      <ChevronDownIcon />
                    </div>
                  </button>
                  <input
                    type="text"
                    placeholder="Reward reference"
                    className="2xl:!w-[70%] bg-app-normal block w-[35%] px-6 py-3 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-full"
                    value={rewardReference}
                    onChange={(e) => setRewardReference(e.target.value)}
                  />
                  <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden hover:border-0 text-sm font-medium bg-grey rounded-full group hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500">
                    <div className="flex flex-row gap-2 items-center bg-primary rounded-full text-primary relative px-6 py-3 transition-all">
                      Add
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.99999 1.72656V6.49953M5.99999 6.49953V11.2725M5.99999 6.49953H10.773M5.99999 6.49953H1.22702"
                          stroke="#F4F4F7"
                          strokeOpacity="0.5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              )}
            </section>
            <div className="border border-primary"></div>
            <section className="flex flex-col gap-4">
              <div className="flex flex-row gap-2">
                <img src={gamecontrollerIcon} />
                <p className="text-base text-primary">Recruits*</p>
              </div>
              <div className="hidden xl:flex flex-row gap-8 items-center">
                <input
                  type="number"
                  onWheel={numberInputOnWheelPreventChange}
                  placeholder="Number of freelancers"
                  className="w-[30%] xl:w-[32%] bg-app-normal block px-6 py-3 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-full"
                  value={numberOfGamers}
                  onChange={(e) => setNumberOfGamers(e.target.value)}
                />
                <div className="relative w-[32%] 2xl:w-[20%] z-50">
                  <Listbox
                    value={language}
                    onChange={(e) => {
                      if (e.length > 0) setLanguage(e);
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
                <div className="flex items-center gap-1 cursor-pointer">
                  {ndaRequired == true && (
                    <input
                      checked
                      id="nda-required-checkbox"
                      type="checkbox"
                      value=""
                      className="cursor-pointer w-4 h-4 text-secondary bg-primary border-primary rounded focus:ring-0 focus:ring-offset-0"
                      onChange={() => setNDARequired(false)}
                    />
                  )}
                  {ndaRequired == false && (
                    <input
                      id="nda-required-checkbox"
                      type="checkbox"
                      value=""
                      className="cursor-pointer w-4 h-4 text-secondary bg-primary border-primary rounded focus:ring-0 focus:ring-offset-0"
                      onChange={() => setNDARequired(true)}
                    />
                  )}
                  <label
                    htmlFor="nda-required-checkbox"
                    className="cursor-pointer ml-2 text-sm text-normal"
                  >
                    NDA required
                  </label>
                  <img className="cursor-pointer" src={questionIcon} />
                </div>
              </div>
              <div className="xl:hidden flex flex-col gap-4">
                <input
                  type="number"
                  onWheel={numberInputOnWheelPreventChange}
                  placeholder="Number of freelancers"
                  className="w-[50%] bg-app-normal block px-6 py-3 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-full"
                  value={numberOfGamers}
                  onChange={(e) => setNumberOfGamers(e.target.value)}
                />
                <div className="flex flex-row items-center gap-4 w-full">
                  <div className="relative w-[50%] z-50">
                    <Listbox
                      value={language}
                      onChange={(e) => {
                        if (e.length > 0) setLanguage(e);
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
                  <div className="flex items-center gap-1 cursor-pointer">
                    {ndaRequired == true && (
                      <input
                        checked
                        id="nda-required-checkbox"
                        type="checkbox"
                        value=""
                        className="cursor-pointer w-4 h-4 text-secondary bg-primary border-primary rounded focus:ring-0 focus:ring-offset-0"
                        onChange={() => setNDARequired(false)}
                      />
                    )}
                    {ndaRequired == false && (
                      <input
                        id="nda-required-checkbox"
                        type="checkbox"
                        value=""
                        className="cursor-pointer w-4 h-4 text-secondary bg-primary border-primary rounded focus:ring-0 focus:ring-offset-0"
                        onChange={() => setNDARequired(true)}
                      />
                    )}
                    <label
                      htmlFor="nda-required-checkbox"
                      className="cursor-pointer ml-2 text-sm text-normal"
                    >
                      NDA required
                    </label>
                    <img className="cursor-pointer" src={questionIcon} />
                  </div>
                </div>
              </div>
            </section>
            <div className="border border-primary"></div>
            <section className="flex flex-col gap-4">
              <div className="flex flex-row gap-2">
                <img src={crownIcon} />
                <p className="text-base text-primary">Skills*</p>
              </div>
              <SpecialityTagInput
                tags={roles}
                setTags={setRoles}
                type="speciality"
              />
            </section>
            <div className="border border-primary"></div>
            <section className="flex flex-col gap-4">
              <div className="flex flex-row gap-2">
                <img src={alignLeftIcon} />
                <p className="text-base text-primary">Schedule*</p>
              </div>
              <div>
                <div className="flex flex-col gap-4">
                  <label className="text-primary text-sm font-medium ml-6">
                    Starting on
                  </label>
                  <input
                    type="date"
                    className="w-[55%] xl:w-[35%] 2xl:w-[25%] fill-blue-500 text-primary px-5 py-2 text-lg font-medium focus:outline-none rounded-full border border-primary bg-primary"
                    value={startingOn}
                    onChange={(e) => setStartingOn(e.target.value)}
                  />
                </div>
              </div>
              <div className="hidden 2xl:flex flex-col gap-4 items-center w-full">
                <label className="text-primary text-sm font-medium ml-12 w-full">
                  Ending on
                </label>
                <div className="flex flex-row gap-8 justify-start w-full">
                  <input
                    type="date"
                    className="w-[55%] xl:w-[35%] 2xl:w-[27%] caret-white text-primary px-5 py-2 text-lg font-medium focus:outline-none rounded-full border border-primary bg-primary"
                    value={endingOn}
                    onChange={(e) => setEndingOn(e.target.value)}
                  />
                  <div className="flex items-center gap-1">
                    {endUnderCondition == true && (
                      <input
                        checked
                        id="endunder-condition-checkbox"
                        type="checkbox"
                        value=""
                        className="cursor-pointer w-4 h-4 text-secondary bg-primary border-primary rounded focus:ring-0 focus:ring-offset-0"
                        onChange={() => setEndUnderCondition(false)}
                      />
                    )}
                    {endUnderCondition == false && (
                      <input
                        id="endunder-condition-checkbox"
                        type="checkbox"
                        value=""
                        className="cursor-pointer w-4 h-4 text-secondary bg-primary border-primary rounded focus:ring-0 focus:ring-offset-0"
                        onChange={() => setEndUnderCondition(true)}
                      />
                    )}
                    <label
                      htmlFor="endunder-condition-checkbox"
                      className="cursor-pointer ml-2 text-sm text-normal"
                    >
                      End under condition
                    </label>
                    <img className="cursor-pointer" src={questionIcon} />
                  </div>
                  {endUnderCondition == true && (
                    <input
                      type="text"
                      placeholder="Condition"
                      className="bg-app-normal block w-[30%] px-6 py-3 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-full"
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                    />
                  )}
                </div>
              </div>
              <div className="2xl:hidden flex flex-col gap-4 items-center w-full">
                <label className="text-primary text-sm font-medium ml-12 w-full">
                  Ending on
                </label>
                <div className="flex justify-start w-full">
                  <input
                    type="date"
                    className="w-[55%] xl:w-[35%] 2xl:w-[27%] caret-white text-primary px-5 py-2 text-lg font-medium focus:outline-none rounded-full border border-primary bg-primary"
                    value={endingOn}
                    onChange={(e) => setEndingOn(e.target.value)}
                  />
                </div>
                <div className="flex flex-row gap-4 items-center w-full">
                  <div className="flex items-center gap-1">
                    {endUnderCondition == true && (
                      <input
                        checked
                        id="endunder-condition-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-secondary bg-primary border-primary rounded focus:ring-0 focus:ring-offset-0"
                        onChange={() => setEndUnderCondition(false)}
                      />
                    )}
                    {endUnderCondition == false && (
                      <input
                        id="endunder-condition-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-secondary bg-primary border-primary rounded focus:ring-0 focus:ring-offset-0"
                        onChange={() => setEndUnderCondition(true)}
                      />
                    )}
                    <label
                      htmlFor="endunder-condition-checkbox"
                      className="ml-2 text-sm text-normal"
                    >
                      End under condition
                    </label>
                    <img className="cursor-pointer" src={questionIcon} />
                  </div>
                </div>
                {endUnderCondition == true && (
                  <input
                    type="text"
                    placeholder="Condition"
                    className="bg-app-normal block w-full h-[51px] px-6 py-3 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-full"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  />
                )}
              </div>
            </section>
            <div className="border border-primary"></div>
            <section className="flex flex-col gap-4">
              <div className="flex flex-row gap-2">
                <img src={scrollIcon} />
                <p className="text-base text-primary">Requirements</p>
              </div>
              <div>
                <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden hover:border-0 text-sm font-medium bg-grey rounded-full group hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500">
                  <div className="flex flex-row gap-2 items-center bg-primary rounded-full text-primary relative px-4 py-3 transition-all">
                    Requirement
                    <ChevronDownIcon />
                  </div>
                </button>
              </div>
            </section>
          </section>
          <section className="border border-primary h-100vh"></section>
          <section className="flex flex-col gap-4 xl:w-[50%] xl:max-w-[50%]">
            <div className="flex flex-row items-center gap-2">
              <img src={eyeIcon} />
              <p className="text-base text-primary">Job offer preview</p>
            </div>
            <section className="shadow bg-app-normal rounded-[32px] border border-primary">
              <div className="flex flex-col gap-6 lg:gap-8 px-2 lg:px-8 py-6">
                <div className="flex flex-row justify-between items-center gap-4">
                  <div className="hidden lg:flex flex-row items-center gap-4">
                    <div className="px-3 py-1 border border-green rounded-xl text-sm text-green">
                      open
                    </div>
                    <span className="text-2xl text-primary font-bold break-words xl:max-w-sm 2xl:max-w-xl">
                      {jobTitle}
                    </span>
                  </div>
                  <div className="lg:hidden flex flex-row items-start gap-4">
                    <div className="px-3 py-1 border border-green rounded-xl text-sm text-green">
                      open
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                      <p className="text-lg lg:text-2xl text-primary font-bold break-words max-w-[250px]">
                        {jobTitle}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <AccountAvatar 
                    isOfficial={account != null && account.is_official}
                    width={'w-12 lg:w-16'}
                    height={'h-12 lg:h-16'}
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
                      Applicants (0)
                    </button>
                  </li>
                </ul>
                <div className="flex flex-col gap-6 lg:gap-8 max-h-[300px] overflow-y-auto">
                  <div className="flex flex-col gap-2">
                    <p className="text-base text-primary font-bold">Company name</p>
                    <p className="text-base text-normal w-full break-words max-w-sm xl:max-w-md 2xl:max-w-2xl">
                      {gameName}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-base text-primary font-bold">
                      Description
                    </p>
                    <p className="text-base text-normal w-full break-words max-w-sm xl:max-w-md 2xl:max-w-2xl">
                      {jobDescription}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                    <div className="flex flex-col gap-1 lg:gap-2">
                      <p className="text-base text-primary font-bold">
                        Starting on
                      </p>
                      <p className="text-base text-normal">{startingOn}</p>
                    </div>
                    <div className="flex flex-col gap-1 lg:gap-2">
                      <p className="text-base text-primary font-bold">
                        Ending on
                      </p>
                      <p className="text-base text-normal">{endingOn}</p>
                    </div>
                    <div className="flex flex-col gap-1 lg:gap-2">
                      <p className="text-base text-primary font-bold">
                        Recruits
                      </p>
                      <p className="text-base text-normal break-words">
                        {numberOfGamers}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 lg:gap-2">
                      <p className="text-base text-primary font-bold">
                        Language
                      </p>
                      {language.map((item, index) => {
                        return (
                          <div key={index}>
                            <p className="text-base text-normal">{item.name}</p>
                          </div>
                        );
                      })}
                    </div>
                    {ndaRequired == true && (
                      <div className="flex flex-col gap-1 lg:gap-2">
                        <p className="text-base text-primary font-bold">
                          NDA required
                        </p>
                      </div>
                    )}
                    <div className="flex flex-col col-span-2">
                      <p className="text-base text-primary font-bold">
                        Payment share
                      </p>
                      <p className="text-base text-normal">
                        {paymentShare == 0
                          ? "Payment per recruiter"
                          : "Payment to be shared between all recruiters"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-base text-primary font-bold">Skills</p>
                    <div className="flex flex-row flex-wrap items-center gap-2">
                      {roles?.map((item, index) => {
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
                    {paymentAmount > 0 && (
                      <div className="flex flex-row justify-end items-center gap-3 w-full">
                        <p className="text-base text-small break-words max-w-[80px] xl:max-w-[150px] 2xl:max-w-sm">
                          {"~$" +
                            (paymentShare == 0
                              ? parseFloat(
                                  paymentAmount * numberOfGamers
                                ).toFixed(2)
                              : paymentAmount)}
                        </p>
                        <p className="text-base text-primary break-words max-w-[80px] xl:max-w-[150px] 2xl:max-w-sm">
                          {paymentShare == 0
                            ? getUSDCAmount(
                                parseFloat(paymentAmount * numberOfGamers)
                              )
                            : getUSDCAmount(paymentAmount)}
                        </p>
                        <img
                          className="p-1 rounded-full border border-primary"
                          src={usdcIcon}
                        />
                        {numberOfGamers > 0 && (
                          <p className="text-sm text-normal break-words max-w-[80px] xl:max-w-[150px] 2xl:max-w-sm">
                            {paymentShare == 0
                              ? paymentAmount
                              : parseFloat(
                                  paymentAmount / numberOfGamers
                                ).toFixed(2)}
                            /freelancer
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
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
                  You are about to leave the apply job page. If you leave,
                  all the information you provided will be
                  lost.
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
      {securePaymentDialogView === true && (
        <SecurePaymentDialog
          paymentInfo={paymentInfo}
          setSecurePaymentDialogView={setSecurePaymentDialogView}
          setApproveTokenDialogView={setApproveTokenDialogView}
        />
      )}
      {approveTokenDialogView === true && (
        <ApproveTokenDialog
          paymentInfo={paymentInfo}
          setApproveTokenDialogView={setApproveTokenDialogView}
          onTransferFundSuccess={onTransferFundSuccess}
        />
      )}
    </>
  );
};

export default JobPostPage;

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
