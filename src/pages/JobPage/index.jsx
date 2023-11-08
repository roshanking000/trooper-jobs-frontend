import { useEffect, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";

import RoundedButton from "/src/components/RoundedButton.jsx";

import MaskGroup from "/imgs/common/mask_group.svg";
import searchImg from "/imgs/app/header/search.png";
import usdcIcon from "/imgs/app/payment/usdc.svg";
import threeDotsIcon from "/icons/DotsThree.svg";
import copyIcon from "/icons/copy.svg";
import lightbulbIcon from "/icons/lightbulb.svg";
import scrollIcon from "/icons/scroll.svg";
import trashIcon from "/icons/trash_red.svg";
import shareIcon from "/icons/share_network.svg";
import circleWavyWarningIcon from "/imgs/app/common/CircleWavyWarning.svg";

import { jobApi } from "../../api/job";
import {
  amendPaymentAmount,
  calcDuration,
  getAccountRating,
  getJobStateBorderColor,
  getJobStateString,
  getJobStateTextColor,
  getLocalDateTime,
  getPastDays,
  getPaymentIcon,
  getUSDCAmount,
  isInvalid,
} from "../../utils";
import { Popover, Transition, Switch } from "@headlessui/react";
import { useAuth } from "../../hooks/use-auth";
import CloseIcon from "../../components/Icons/CloseIcon";
import ReviewStarIcon from "../../components/Icons/ReviewStarIcon";
import { toast } from "react-toastify";
import ChevronDownIcon from "../../components/Icons/ChevronDownIcon";
import AccountAvatar from "../../components/AccountAvatar";

const JobPage = (props) => {
  const navigate = useNavigate();
  const { setLoadingView } = props;
  const { account } = useAuth();
  const [onlyCreatedByMe, SetOnlyCreatedByMe] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);
  const [jobDetailDialogView, setJobDetailDialogView] = useState(false);
  const [jobDeleteDialogView, setJobDeleteDialogView] = useState(false);
  const [currentTab, setCurrentTab] = useState("General");
  const [jobList, setJobList] = useState([]);
  const [deletingJob, setDeletingJob] = useState(null)

  const getAllJobs = async () => {
    setLoadingView(true);
    try {
      const allJobs = await jobApi.getAllJobs();
      if (allJobs.length > 0) setJobList(allJobs.data);
    } catch (err) {
      console.log(err);
    }
    setLoadingView(false);
  };
  useEffect(() => {
    getAllJobs();
  }, []);

  const promptDeleteJob = async (e) => {
    console.log('deleting job >>> ', e.target.dataset.jobId);
    const job = jobList.filter(item => item.job_id == e.target.dataset.jobId)[0];
    if (isInvalid(job))
      return;
    setDeletingJob(job);
    setJobDeleteDialogView(true);
  }

  const deleteJob = async () => {
    setLoadingView(true);
    try {
      const response = await jobApi.deleteJob(deletingJob.job_id);
      toast.success('Job deleted successfully');
      setJobDeleteDialogView(false);
      if (jobDetailDialogView)
        setJobDetailDialogView(false);
      const updatedJobList = jobList.filter(item => item.job_id != deletingJob.job_id);
      setDeletingJob(null);
      setJobList(updatedJobList);
    } catch (err) {
      toast.error(err.message);
    }
    setLoadingView(false);
  }

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
      <div className="w-full h-full inset-0 justify-center absolute z-0">
        <div className="w-4/6 h-70 left-0 right-0 mx-auto absolute mt-12 hidden sm:block">
          <img src={MaskGroup} />
        </div>
        <img
          src={MaskGroup}
          className="w-full h-full sm:hidden absolute object-cover"
        />
      </div>
      <div className="flex flex-col items-start gap-8 w-full">
        <div className="flex flex-row justify-between items-center w-full">
          <p className="text-4xl lg:text-[64px] font-bold text-primary z-10">
            Jobs
          </p>
          <RoundedButton
            padding={"px-6 py-3"}
            attrib={"!text-base"}
            clickFunc={() => navigate("/new-job/create")}
          >
            Post a new job
          </RoundedButton>
        </div>
        <div className="flex flex-col items-start gap-6 w-full z-10">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-2 w-full">
            <p className="text-xl font-bold text-normal w-full">
              Jobs ({onlyCreatedByMe ? jobList?.filter(job => job.poster_id == account.account_id).length : jobList?.length})
            </p>
            <div className="flex flex-row justify-center xl:justify-end items-center gap-2 w-full">
              <Switch.Group>
                <div className="flex items-center h-full mr-2">
                  <Switch
                    checked={onlyCreatedByMe}
                    onChange={SetOnlyCreatedByMe}
                    className={`${onlyCreatedByMe ? 'bg-switch-on' : 'bg-switch-off'
                      } relative inline-flex h-[28px] w-[60px] shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 border-switch`}
                  >
                    <span
                      className={`${onlyCreatedByMe ? 'translate-x-8' : 'translate-x-0'
                        } pointer-events-none inline-block h-[28px] w-[28px] transform rounded-full bg-switch-thumb transition-transform`}
                    />
                  </Switch>
                  <Switch.Label className="ml-2 text-normal">Only created by me</Switch.Label>
                </div>
              </Switch.Group>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {(onlyCreatedByMe ? jobList?.filter(job => job.poster_id == account.account_id) : jobList)?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col px-6 py-5 gap-2 bg-primary border border-primary rounded-[32px] cursor-pointer xl:min-h-[220px] max-h-[400px] xl:max-h-[220px] hover:bg-hover"
                  onClick={() => {
                    setSelectedJob(item), setJobDetailDialogView(true);
                  }}
                >
                  <div className="flex flex-row items-center gap-4">
                    <div
                      className={clsx(
                        "px-3 py-1 border rounded-xl text-sm",
                        getJobStateTextColor(item.job_state),
                        getJobStateBorderColor(item.job_state)
                      )}
                    >
                      {getJobStateString(item.job_state)}
                    </div>
                    <div className="flex flex-row items-center gap-2 max-w-[50%] xl:max-w-[50%] 2xl:max-w-[60%]">
                      <p className="text-base font-bold text-primary max-w-[80%] xl:max-w-[80%] 2xl:max-w-[80%] text-ellipsis overflow-hidden double-ellipsis ...">
                        {item.job_title} - {item.job_game}
                      </p>
                      <p className="text-base font-medium text-normal">
                        {getPastDays(item.date_created)}
                      </p>
                    </div>
                    <div className="xl:hidden block grow"></div>
                    <Popover
                      className="relative xl:hidden"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {({ open }) => (
                        <>
                          <Popover.Button className="focus:outline-none focus-visible:ring-0 focus-visible:ring-white focus-visible:ring-opacity-75 w-[32px] h-[32px]">
                            <img
                              className="cursor-pointer"
                              src={threeDotsIcon}
                            />
                          </Popover.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="flex flex-col gap-3 absolute z-50 right-0 py-4 px-4 bg-primary border border-primary rounded-2xl w-60">
                              <Popover.Overlay>
                                <div className="flex flex-row gap-2 group">
                                  <img src={copyIcon}></img>
                                  <p className="text-base font-semibold text-normal cursor-pointer group-hover:text-secondary-hover">
                                    Copy link
                                  </p>
                                </div>
                              </Popover.Overlay>
                              <Popover.Overlay>
                                <div className="flex flex-row gap-2 group">
                                  <img src={shareIcon}></img>
                                  <p className="text-base font-semibold text-normal cursor-pointer group-hover:text-secondary-hover">
                                    Share on Twitter
                                  </p>
                                </div>
                              </Popover.Overlay>
                              <Popover.Overlay>
                                <Link to="/jobs/dashboard" className="flex flex-row gap-2 group">
                                  <img src={lightbulbIcon}></img>
                                  <p className="text-base font-semibold text-normal cursor-pointer group-hover:text-secondary-hover">
                                    Manage in dashboard
                                  </p>
                                </Link>
                              </Popover.Overlay>
                              <Popover.Overlay>
                                <Link to="/jobs/review_applicants" className="flex flex-row gap-2 group">
                                  <img src={scrollIcon}></img>
                                  <p className="text-base font-semibold text-normal cursor-pointer group-hover:text-secondary-hover">
                                    Review applications
                                  </p>
                                </Link>
                              </Popover.Overlay>
                              {account != null && (account.is_official || item.poster_id == account.account_id) && (
                                <div className="border border-primary"></div>
                              )}
                              {account != null && (account.is_official || item.poster_id == account.account_id) && (
                                <Popover.Overlay>
                                  <div className="flex flex-row gap-2 group" onClick={promptDeleteJob}>
                                    <img src={trashIcon} data-job-id={item.job_id}></img>
                                    <p className="text-base font-semibold text-error cursor-pointer group-hover:text-secondary-hover" data-job-id={item.job_id}>
                                      Delete this job
                                    </p>
                                  </div>
                                </Popover.Overlay>
                              )}
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                    <div className="hidden xl:block grow"></div>
                    <div className="hidden xl:flex flex-row items-center gap-2">
                      <p className="text-xs font-medium text-small">
                        {"~$" +
                          (item.payment_share == 0
                            ? amendPaymentAmount(
                              item.payment_amount * item.number_of_gamers
                            )
                            : amendPaymentAmount(item.payment_amount))}
                      </p>
                      <p className="text-base text-primary font-bold">
                        {item.payment_share == 0
                          ? getUSDCAmount(
                            parseFloat(
                              item.payment_amount * item.number_of_gamers
                            )
                          )
                          : getUSDCAmount(item.payment_amount)}
                      </p>
                      <img
                        className="border border-primary rounded-full w-7"
                        src={getPaymentIcon(item.payment_type)}
                      />
                      <Popover
                        className="relative"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {({ open }) => (
                          <>
                            <Popover.Button className="focus:outline-none focus-visible:ring-0 focus-visible:ring-white focus-visible:ring-opacity-75 w-[32px] h-[32px]">
                              <img
                                className="cursor-pointer"
                                src={threeDotsIcon}
                              />
                            </Popover.Button>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel className="flex flex-col gap-3 absolute right-0 py-4 px-4 bg-primary border border-primary rounded-2xl w-60 z-20">
                                <Popover.Overlay>
                                  <div className="flex flex-row gap-2 group">
                                    <img src={copyIcon}></img>
                                    <p className="text-base font-semibold text-normal cursor-pointer group-hover:text-secondary-hover">
                                      Copy link
                                    </p>
                                  </div>
                                </Popover.Overlay>
                                <Popover.Overlay>
                                  <div className="flex flex-row gap-2 group">
                                    <img src={shareIcon}></img>
                                    <p className="text-base font-semibold text-normal cursor-pointer group-hover:text-secondary-hover">
                                      Share on Twitter
                                    </p>
                                  </div>
                                </Popover.Overlay>
                                <Popover.Overlay>
                                  <Link to="/jobs/dashboard" className="flex flex-row gap-2 group">
                                    <img src={lightbulbIcon}></img>
                                    <p className="text-base font-semibold text-normal cursor-pointer group-hover:text-secondary-hover">
                                      Manage in dashboard
                                    </p>
                                  </Link>
                                </Popover.Overlay>
                                <Popover.Overlay>
                                  <Link to="/jobs/review_applicants" className="flex flex-row gap-2 group">
                                    <img src={scrollIcon}></img>
                                    <p className="text-base font-semibold text-normal cursor-pointer group-hover:text-secondary-hover">
                                      Review applications
                                    </p>
                                  </Link>
                                </Popover.Overlay>
                                {account != null && (account.is_official || item.poster_id == account.account_id) && (
                                  <div className="border border-primary"></div>
                                )}
                                {account != null && (account.is_official || item.poster_id == account.account_id) && (
                                  <Popover.Overlay>
                                    <div className="flex flex-row gap-2 group" onClick={promptDeleteJob}>
                                      <img src={trashIcon} data-job-id={item.job_id}></img>
                                      <p className="text-base font-semibold text-error cursor-pointer group-hover:text-secondary-hover" data-job-id={item.job_id}>
                                        Delete this job
                                      </p>
                                    </div>
                                  </Popover.Overlay>
                                )}
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                      {/* <img src={threeDotsIcon} onClick={(e) => { alert(123), e.preventDefault() }}></img> */}
                    </div>
                  </div>
                  <p className="text-sm text-normal font-medium text-ellipsis overflow-hidden multiline-ellipsis ...">
                    {item.description}
                  </p>
                  <div className="xl:hidden flex flex-row flex-wrap gap-2">
                    {item.roles.split(",")?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-center px-4 py-2 h-8 border-2 border-primary p-1 rounded-full"
                        >
                          <p className="text-xs text-normal font-bold text-center">
                            {item}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="grow"></div>
                  <div className="flex flex-row justify-between items-center gap-2">
                    <div className="flex flex-row items-center gap-2">
                      <AccountAvatar
                        isOfficial={item.is_official}
                        width={'w-8'}
                        height={'h-8'}
                        borderColor={'border-[#2C2C34]'}
                        avatarFile={item.avatar_file}
                      />
                      <p className="text-base text-normal font-bold">
                        {item.name}
                      </p>
                    </div>
                    <div className="flex xl:hidden flex-row items-center gap-2">
                      <p className="text-xs font-medium text-small">
                        {"~$" +
                          (item.payment_share == 0
                            ? amendPaymentAmount(
                              item.payment_amount * item.number_of_gamers
                            )
                            : amendPaymentAmount(item.payment_amount))}
                      </p>
                      <p className="text-base text-primary font-bold">
                        {item.payment_share == 0
                          ? getUSDCAmount(
                            parseFloat(
                              item.payment_amount * item.number_of_gamers
                            )
                          )
                          : getUSDCAmount(item.payment_amount)}
                      </p>
                      <img
                        className="border border-primary rounded-full w-7"
                        src={getPaymentIcon(item.payment_type)}
                      />
                    </div>
                    <div className="hidden xl:flex flex-row justify-end gap-2">
                      {item.roles.split(",")?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-center px-4 py-2 h-8 border-2 border-primary p-1 rounded-full"
                          >
                            <p className="text-xs text-normal font-bold text-center">
                              {item}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {jobDetailDialogView === true && selectedJob !== null && (
        <div
          className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm"
          onClick={() => setJobDetailDialogView(false)}
        >
          <div
            className="relative max-w-3xl max-h-[50%] lg:max-h-[90%] m-auto top-1/2 transform -translate-y-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative shadow bg-app-normal rounded-[32px] border border-primary">
              <div className="sm:hidden absolute top-3 right-3 flex flex-row gap-2">
                <Popover
                  className="relative"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {({ open }) => (
                    <>
                      <Popover.Button className="focus:outline-none focus-visible:ring-0 focus-visible:ring-white focus-visible:ring-opacity-75 w-[32px] h-[32px]">
                        <img
                          className="cursor-pointer"
                          src={threeDotsIcon}
                        />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="flex flex-col gap-3 absolute right-0 py-4 px-4 bg-primary border border-primary rounded-2xl w-60 z-20">
                          <Popover.Overlay>
                            <div className="flex flex-row gap-2 group">
                              <img src={copyIcon}></img>
                              <p className="text-base font-semibold text-normal cursor-pointer group-hover:text-secondary-hover">
                                Copy link
                              </p>
                            </div>
                          </Popover.Overlay>
                          <Popover.Overlay>
                            <div className="flex flex-row gap-2 group">
                              <img src={shareIcon}></img>
                              <p className="text-base font-semibold text-normal cursor-pointer group-hover:text-secondary-hover">
                                Share on Twitter
                              </p>
                            </div>
                          </Popover.Overlay>
                          <Popover.Overlay>
                            <Link to="/jobs/dashboard" className="flex flex-row gap-2 group">
                              <img src={lightbulbIcon}></img>
                              <p className="text-base font-semibold text-normal cursor-pointer group-hover:text-secondary-hover">
                                Manage in dashboard
                              </p>
                            </Link>
                          </Popover.Overlay>
                          <Popover.Overlay>
                            <Link to="/jobs/review_applicants" className="flex flex-row gap-2 group">
                              <img src={scrollIcon}></img>
                              <p className="text-base font-semibold text-normal cursor-pointer group-hover:text-secondary-hover">
                                Review applications
                              </p>
                            </Link>
                          </Popover.Overlay>
                          {account != null && (account.is_official || selectedJob.poster_id == account.account_id) && (
                            <div className="border border-primary"></div>
                          )}
                          {account != null && (account.is_official || selectedJob.poster_id == account.account_id) && (
                            <Popover.Overlay>
                              <div className="flex flex-row gap-2 group" onClick={promptDeleteJob}>
                                <img src={trashIcon} data-job-id={selectedJob.job_id}></img>
                                <p className="text-base font-semibold text-error cursor-pointer group-hover:text-secondary-hover" data-job-id={selectedJob.job_id}>
                                  Delete this job
                                </p>
                              </div>
                            </Popover.Overlay>
                          )}
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
                <div className="min-h-full my-1 w-[2px] border border-primary"></div>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-hover rounded-lg text-sm p-1 items-center"
                  onClick={() => setJobDetailDialogView(false)}
                >
                  <CloseIcon />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="flex flex-col gap-6 lg:gap-8 px-2 lg:px-8 py-12 lg:py-6">
                <div className="flex flex-row justify-between items-center gap-4">
                  <div className="hidden lg:flex flex-row items-center gap-4">
                    <div
                      className={clsx(
                        "px-3 py-1 border rounded-xl text-sm",
                        getJobStateTextColor(selectedJob.job_state),
                        getJobStateBorderColor(selectedJob.job_state)
                      )}
                    >
                      {getJobStateString(selectedJob.job_state)}
                    </div>
                    <p className="text-2xl text-primary font-bold">
                      {selectedJob.job_title}
                    </p>
                    <p className="text-base text-normal">
                      {getPastDays(selectedJob.date_created)}
                    </p>
                  </div>
                  <div className="lg:hidden flex flex-row items-start gap-4">
                    <div
                      className={clsx(
                        "px-3 py-1 border rounded-xl text-sm",
                        getJobStateTextColor(selectedJob.job_state),
                        getJobStateBorderColor(selectedJob.job_state)
                      )}
                    >
                      {getJobStateString(selectedJob.job_state)}
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                      <p className="text-lg lg:text-2xl text-primary font-bold">
                        {selectedJob.job_title}
                      </p>
                      <p className="text-base text-normal">
                        {getPastDays(selectedJob.date_created)}
                      </p>
                    </div>
                  </div>
                  <div className="hidden lg:flex flex-row gap-3">
                    <Popover
                      className="relative"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {({ open }) => (
                        <>
                          <Popover.Button className="focus:outline-none focus-visible:ring-0 focus-visible:ring-white focus-visible:ring-opacity-75 w-[32px] h-[32px]">
                            <img
                              className="cursor-pointer"
                              src={threeDotsIcon}
                            />
                          </Popover.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="flex flex-col gap-3 absolute right-0 py-4 px-4 bg-primary border border-primary rounded-2xl w-60 z-20">
                              <Popover.Overlay>
                                <div className="flex flex-row gap-2 group">
                                  <img src={copyIcon}></img>
                                  <p className="text-base font-semibold text-normal cursor-pointer group-hover:text-secondary-hover">
                                    Copy link
                                  </p>
                                </div>
                              </Popover.Overlay>
                              <Popover.Overlay>
                                <div className="flex flex-row gap-2 group">
                                  <img src={shareIcon}></img>
                                  <p className="text-base font-semibold text-normal cursor-pointer group-hover:text-secondary-hover">
                                    Share on Twitter
                                  </p>
                                </div>
                              </Popover.Overlay>
                              <Popover.Overlay>
                                <Link to="/jobs/dashboard" className="flex flex-row gap-2 group">
                                  <img src={lightbulbIcon}></img>
                                  <p className="text-base font-semibold text-normal cursor-pointer group-hover:text-secondary-hover">
                                    Manage in dashboard
                                  </p>
                                </Link>
                              </Popover.Overlay>
                              <Popover.Overlay>
                                <Link to="/jobs/review_applicants" className="flex flex-row gap-2 group">
                                  <img src={scrollIcon}></img>
                                  <p className="text-base font-semibold text-normal cursor-pointer group-hover:text-secondary-hover">
                                    Review applications
                                  </p>
                                </Link>
                              </Popover.Overlay>
                              {account != null && (account.is_official || selectedJob.poster_id == account.account_id) && (
                                <div className="border border-primary"></div>
                              )}
                              {account != null && (account.is_official || selectedJob.poster_id == account.account_id) && (
                                <Popover.Overlay>
                                  <div className="flex flex-row gap-2 group" onClick={promptDeleteJob}>
                                    <img src={trashIcon} data-job-id={selectedJob.job_id}></img>
                                    <p className="text-base font-semibold text-error cursor-pointer group-hover:text-secondary-hover" data-job-id={selectedJob.job_id}>
                                      Delete this job
                                    </p>
                                  </div>
                                </Popover.Overlay>
                              )}
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                    <div className="min-h-full w-[2px] border border-primary"></div>
                    <button
                      type="button"
                      className="hidden lg:inline-flex text-gray-400 bg-transparent hover:bg-hover rounded-lg text-sm p-1 items-center"
                      onClick={() => setJobDetailDialogView(false)}
                    >
                      <CloseIcon />
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center px-2 sm:px-0 sm:flex-row w-full gap-2">
                  <div className="flex flex-row gap-2 grow">
                    <p className="text-base text-primary font-bold">Game</p>
                    <p className="text-base text-normal break-all">
                      {selectedJob.job_game}
                    </p>
                  </div>
                  <div className="flex flex-row items-center gap-3 flex-none">
                    <p className="text-base font-medium text-small">
                      {"~$" +
                        (selectedJob.payment_share == 0
                          ? amendPaymentAmount(
                            selectedJob.payment_amount *
                            selectedJob.number_of_gamers
                          )
                          : amendPaymentAmount(selectedJob.payment_amount))}
                    </p>
                    <p className="text-base text-primary">
                      {" "}
                      {selectedJob.payment_share == 0
                        ? getUSDCAmount(
                          parseFloat(
                            selectedJob.payment_amount *
                            selectedJob.number_of_gamers
                          )
                        )
                        : getUSDCAmount(selectedJob.payment_amount)}
                    </p>
                    <img
                      className="p-1 rounded-full border border-primary"
                      src={usdcIcon}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <AccountAvatar
                    isOfficial={selectedJob.is_official}
                    width={'w-12 sm:w-16'}
                    height={'h-12 sm:h-16'}
                    avatarFile={selectedJob.avatar_file}
                  />

                  <div className="flex flex-col justify-center gap-2">
                    <div className="flex flex-row gap-4">
                      <p className="text-base text-primary font-bold">
                        {selectedJob.name}
                      </p>
                      <p className="text-base text-normal">0 missions</p>
                      <div className="flex flex-row items-center gap-1">
                        <p className="text-base text-primary font-bold">
                          {getAccountRating(selectedJob)}
                        </p>
                        <ReviewStarIcon isFill={true} />
                      </div>
                    </div>
                    <p className="text-sm text-normal max-w-[240px] sm:max-w-xl">
                      {selectedJob.short_description}
                    </p>
                    <div className="flex flex-row gap-4 items-start lg:items-center">
                      <p className="text-base text-normal font-bold">Badges</p>
                      <div className="flex flex-row flex-wrap items-center gap-2">
                        {selectedJob.badgeList?.map((item, index) => {
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
                  <li className="w-1/3">
                    <button
                      className={clsx(
                        "text-sm sm:text-lg inline-block p-1 border-b-4 border-primary text-normal rounded-t-lg w-full",
                        currentTab === "General"
                          ? "border-secondary text-primary"
                          : ""
                      )}
                      type="button"
                      onClick={() => setCurrentTab("General")}
                    >
                      General
                    </button>
                  </li>
                  <li className="w-1/3">
                    <button
                      className={clsx(
                        "text-sm sm:text-lg inline-block p-1 border-b-4 border-primary text-normal rounded-t-lg w-full",
                        currentTab === "Applicants"
                          ? "border-secondary text-primary"
                          : ""
                      )}
                      type="button"
                      onClick={() => setCurrentTab("Applicants")}
                    >
                      Applicants (
                      {selectedJob.applicants
                        ? selectedJob.applicants?.length
                        : 0}
                      )
                    </button>
                  </li>
                  <li className="w-1/3">
                    <button
                      className={clsx(
                        "text-sm sm:text-lg inline-block p-1 border-b-4 border-primary text-normal rounded-t-lg w-full",
                        currentTab === "Rewards"
                          ? "border-secondary text-primary"
                          : ""
                      )}
                      type="button"
                      onClick={() => setCurrentTab("Rewards")}
                    >
                      Rewards (
                      {selectedJob.rewards
                        ? selectedJob.rewards?.length
                        : 0}
                      )
                    </button>
                  </li>
                </ul>
                {currentTab === "General" && (
                  <div className="flex flex-col gap-6 lg:gap-8 max-h-[300px] overflow-y-auto">
                    <div className="flex flex-col gap-2">
                      <p className="text-base text-primary font-bold">
                        Description
                      </p>
                      <p className="text-base text-normal">
                        {selectedJob.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4 xl:gap-8">
                      <div className="flex flex-col gap-1 lg:gap-2">
                        <p className="text-base text-primary font-bold">
                          Starting on
                        </p>
                        <p className="text-base text-normal">
                          {getLocalDateTime(selectedJob.start_on)}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 lg:gap-2">
                        <p className="text-base text-primary font-bold">
                          Duration
                        </p>
                        <p className="text-base text-normal">
                          {calcDuration(
                            selectedJob.start_on,
                            selectedJob.end_on
                          )}{" "}
                          days
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 lg:gap-2">
                        <p className="text-base text-primary font-bold">
                          Recruits
                        </p>
                        <p className="text-base text-normal">
                          {selectedJob.number_of_gamers}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 lg:gap-2">
                        <p className="text-base text-primary font-bold">
                          Language
                        </p>
                        {selectedJob.languages.split(",").map((item, index) => {
                          return (
                            <div key={index}>
                              <p className="text-base text-normal">{item}</p>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex flex-col gap-1 lg:gap-2">
                        <p className="text-base text-primary font-bold">
                          NFT required
                        </p>
                        <p className="text-base text-normal">
                          {selectedJob.nftRequired}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 lg:gap-2 col-span-2">
                        <p className="text-base text-primary font-bold">
                          Payment distribution
                        </p>
                        <p className="text-base text-normal">
                          {selectedJob.payment_share == 0
                            ? "Payment per recruiter"
                            : "Payment to be shared between all recruiters"}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-base text-primary font-bold">Skills</p>
                      <div className="flex flex-row flex-wrap items-center gap-2">
                        {selectedJob.roles.split(",")?.map((item, index) => {
                          return (
                            <p
                              key={index}
                              className="px-3 py-2 rounded-xl border border-primary text-sm text-normal font-bold"
                            >
                              {item}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
                {currentTab == "Applicants" && (
                  <div className="flex flex-col gap-8">
                    {selectedJob.applicants != null &&
                      selectedJob.applicants.map((item, index) => {
                        return (
                          <div key={index} className="flex flex-row gap-4">
                            <img
                              className="rounded-full border border-primary w-12 h-12 lg:w-16 lg:h-16"
                              src={item.avatar}
                            />
                            <div className="flex flex-col justify-center gap-2">
                              <div className="flex flex-row gap-4">
                                <p className="text-base text-primary font-bold">
                                  {item.name}
                                </p>
                                <p className="text-base text-normal">
                                  {item.hireCount} missions
                                </p>
                                <div className="flex flex-row items-center gap-1">
                                  <p className="text-base text-primary font-bold">
                                    {item.mark}
                                  </p>
                                  <ReviewStarIcon isFill={true} />
                                </div>
                              </div>
                              <p className="text-sm text-normal">
                                {item.description}
                              </p>
                              <div className="flex flex-row flex-wrap items-center gap-2">
                                {item.skills?.map((item, index) => {
                                  return (
                                    <p
                                      key={index}
                                      className="px-3 py-2 rounded-xl border border-primary text-sm text-normal font-bold"
                                    >
                                      {item}
                                    </p>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {(selectedJob.applicants == null ||
                      selectedJob.applicants?.length == 0) && (
                        <p className="text-base text-primary font-bold w-full text-center">
                          No applicants yet
                        </p>
                      )}
                  </div>
                )}
                {currentTab == "Rewards" && (
                  <div className="flex flex-col gap-8">
                    {selectedJob.rewards != null &&
                      selectedJob.rewards.map((item, index) => {
                        return (
                          <div key={index} className="flex flex-row gap-4">
                            <img
                              className="rounded-full border border-primary w-12 h-12 lg:w-16 lg:h-16"
                              src={item.avatar}
                            />
                            <div className="flex flex-col justify-center gap-2">
                              <div className="flex flex-row gap-4">
                                <p className="text-base text-primary font-bold">
                                  {item.name}
                                </p>
                                <p className="text-base text-normal">
                                  {item.hireCount} missions
                                </p>
                                <div className="flex flex-row items-center gap-1">
                                  <p className="text-base text-primary font-bold">
                                    {item.mark}
                                  </p>
                                  <ReviewStarIcon isFill={true} />
                                </div>
                              </div>
                              <p className="text-sm text-normal">
                                {item.description}
                              </p>
                              <div className="flex flex-row flex-wrap items-center gap-2">
                                {item.skills?.map((item, index) => {
                                  return (
                                    <p
                                      key={index}
                                      className="px-3 py-2 rounded-xl border border-primary text-sm text-normal font-bold"
                                    >
                                      {item}
                                    </p>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {(selectedJob.rewards == null ||
                      selectedJob.rewards?.length == 0) && (
                        <p className="text-base text-primary font-bold w-full text-center">
                          No rewards yet
                        </p>
                      )}
                  </div>
                )}

                <div className="flex flex-col gap-6">
                  <div className="border border-primary"></div>
                  <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
                    <div className="flex flex-row items-center gap-3">
                      <p className="text-base font-medium text-small">
                        {"~$" +
                          (selectedJob.payment_share == 0
                            ? amendPaymentAmount(
                              selectedJob.payment_amount *
                              selectedJob.number_of_gamers
                            )
                            : amendPaymentAmount(selectedJob.payment_amount))}
                      </p>
                      <p className="text-base text-primary">
                        {" "}
                        {selectedJob.payment_share == 0
                          ? getUSDCAmount(
                            parseFloat(
                              selectedJob.payment_amount *
                              selectedJob.number_of_gamers
                            )
                          )
                          : getUSDCAmount(selectedJob.payment_amount)}
                      </p>
                      <img
                        className="p-1 rounded-full border border-primary"
                        src={usdcIcon}
                      />
                      <p className="text-sm text-normal break-words max-w-[80px] xl:max-w-[150px] 2xl:max-w-sm">
                        {selectedJob.paymentShare == 0 ? amendPaymentAmount(selectedJob.payment_amount) : amendPaymentAmount(selectedJob.payment_amount / selectedJob.number_of_gamers)}/gamer
                      </p>
                    </div>
                    {account != null && selectedJob.poster_id == account.account_id && (
                      <RoundedButton
                        padding={"px-4 lg:px-8 py-3"}
                        attrib={"!text-base"}
                        clickFunc={() => navigate("/jobs/review_applicants")}
                      >
                        Review applications
                      </RoundedButton>
                    )}
                    {(account == null || selectedJob.poster_id != account.account_id) && (
                      <RoundedButton
                        padding={"px-4 lg:px-8 py-3"}
                        attrib={"!text-base"}
                        clickFunc={() => navigate("/jobs/proposals")}
                      >
                        Apply to this job
                      </RoundedButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {jobDeleteDialogView == true && deletingJob != null && (
        <div
          className="flex items-center justify-center fixed bg-blend-lighten top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm"
          onClick={() => setJobDeleteDialogView(false)}
        >
          <div className="shadow bg-app-normal rounded-[32px] border border-primary max-w-3xl max-h-[90%] m-auto top-1/2">
            <div className="flex flex-col gap-2 lg:gap-4 px-4 lg:px-8 py-6">
              <div className="flex flex-row justify-between items-center gap-4">
                <div className="flex flex-row items-center gap-4">
                  <img
                    className="border border-primary p-1 rounded-full"
                    src={circleWavyWarningIcon}
                  />
                  <p className="text-2xl text-primary font-bold">Deleting job</p>
                </div>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-hover rounded-lg text-sm p-1 items-center"
                  onClick={() => setJobDeleteDialogView(false)}
                >
                  <CloseIcon />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <p className="text-base text-normal">
                You are about to delete the following job offer.
                If you confirm, your job offer won&rsquo;t appear in the job list and freelancers won&rsquo;t be able to apply anymore.
              </p>
              <div className="flex flex-row h-48 rounded-[32px] border-2 border-primary p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row items-center gap-4">
                    <div
                      className={clsx(
                        "px-3 py-1 border rounded-xl text-sm",
                        getJobStateTextColor(deletingJob.job_state),
                        getJobStateBorderColor(deletingJob.job_state)
                      )}
                    >
                      {getJobStateString(deletingJob.job_state)}
                    </div>
                    <p className="text-xl text-primary font-bold break-all singleline-ellipsis">
                      {deletingJob.job_title}
                    </p>
                    <p className="text-base text-normal">
                      {getPastDays(deletingJob.date_created)}
                    </p>
                  </div>
                  <p className="text-sm text-normal font-medium overflow-auto">
                    {deletingJob.description}
                  </p>
                </div>
              </div>
              <p className="text-base text-normal">
                Are you sure you want to proceed?
              </p>
              <div className="flex flex-col gap-6">
                <div className="border border-primary"></div>
                <div className="flex flex-row justify-end items-center gap-4">
                  <RoundedButton
                    padding={"px-4 lg:px-8 py-3"}
                    attrib={
                      "!text-base hover:!from-[#EB5757] hover:!via-[#EB5757] hover:!to-[#EB5757]"
                    }
                    clickFunc={() => setJobDeleteDialogView(false)}
                  >
                    No, keep it!
                  </RoundedButton>
                  <RoundedButton
                    padding={"px-4 lg:px-8 py-3"}
                    attrib={
                      "!text-base hover:!from-[#EB5757] hover:!via-[#EB5757] hover:!to-[#EB5757]"
                    }
                    clickFunc={deleteJob}
                  >
                    Yes, delete this job
                  </RoundedButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobPage;
