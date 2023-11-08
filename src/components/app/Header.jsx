import { useState, Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import { Status } from "../../Global";

import trooperLogo from "/imgs/logo/trooper_logo.svg";
import searchImg from "/imgs/app/header/search.png";
import alarmImg from "/imgs/app/header/alarm.png";
import paperIcon from "/imgs/app/header/paper.svg";
import LightbulbIcon from "/imgs/app/common/Lightbulb.svg";
import GearIcon from "/imgs/app/common/Gear.svg";
import SignOutIcon from "/imgs/app/common/SignOut.svg";
import profileImg from "/imgs/app/header/profile.png";

import { useAuth } from "../../hooks/use-auth";
import { avatarDivStyle, getAvatarPath } from "../../utils";
import AccountAvatar from "/src/components/AccountAvatar";

const Header = () => {
  const navigate = useNavigate();

  const [avatarClicked, setAvatarClicked] = useState(false);
  const { signOut, account } = useAuth();

  useEffect(() => {
    if (account == null)
      navigate("/auth", { state: { target: Status.Signin } });
  }, [account]);

  return (
    <header className="flex flex-row justify-between items-center w-full z-20">
      <Link to="/" className="w-[100px] xl:w-[164px]">
        <img src={trooperLogo} />
      </Link>
      <div className="hidden xl:flex flex-row items-center gap-12">
        <div className="relative w-[232px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <img src={searchImg} />
          </div>
          <input
            type="text"
            className="bg-app-normal block w-full h-14 p-4 pl-10 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-full"
            placeholder="Search..."
          />
        </div>
        <Link to="/gamers">
          <span
            className={clsx(
              "text-base font-semibold text-normal cursor-pointer hover:text-secondary-hover",
              window.location.pathname == "/gamers"
                ? "text-secondary-hover"
                : ""
            )}
          >
            Freelancers
          </span>
        </Link>
        <Link to="/guilds">
          <span
            className={clsx(
              "text-base font-semibold text-normal cursor-pointer hover:text-secondary-hover",
              window.location.pathname == "/guilds"
                ? "text-secondary-hover"
                : ""
            )}
          >
            Companies
          </span>
        </Link>
        <Link to="/jobs">
          <span
            className={clsx(
              "text-base font-semibold text-normal cursor-pointer hover:text-secondary-hover",
              window.location.pathname == "/jobs" ? "text-secondary-hover" : ""
            )}
          >
            Jobs
          </span>
        </Link>
      </div>
      <div className="flex flex-row items-center gap-4">
        <img className="cursor-pointer w-6 xl:w-8" src={alarmImg} />
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button className="focus:outline-none focus-visible:ring-0 focus-visible:ring-white focus-visible:ring-opacity-75">
                {account != null && (
                  <AccountAvatar
                    isOfficial={account != null && account.is_official}
                    width={"w-12 xl:w-14"}
                    height={"h-12 xl:h-14"}
                    additionalAttr={"cursor-pointer"}
                    avatarFile={account.avatar}
                  />
                )}
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
                <Popover.Panel className="flex flex-col gap-2 absolute right-0 py-2 bg-primary border border-primary rounded-2xl w-60">
                  {account != null && (
                    <span className="text-base text-center font-semibold cursor-pointer text-primary">
                      {account.username}
                    </span>
                  )}
                  <div className="border border-primary mb-2"></div>
                  <Popover.Overlay>
                    <div className="flex flex-row items-center gap-2 px-6 pb-2 cursor-pointer group">
                      <img src={paperIcon} />
                      <span
                        className="text-base font-semibold text-normal group-hover:text-secondary-hover"
                        onClick={() => {
                          navigate("/myprofile");
                        }}
                      >
                        Profile
                      </span>
                    </div>
                  </Popover.Overlay>
                  <Popover.Overlay>
                    <div className="flex flex-row items-center gap-2 px-6 pb-2 cursor-pointer group">
                      <img src={LightbulbIcon} />
                      <span
                        className="text-base font-semibold text-normal cursor-pointer group-hover:text-secondary-hover"
                      >
                        Dashboard
                      </span>
                    </div>
                  </Popover.Overlay>
                  <Popover.Overlay>
                    <div className="flex flex-row items-center gap-2 px-6 cursor-pointer group">
                      <img src={GearIcon} />
                      <span
                        className="text-base font-semibold text-normal cursor-pointer group-hover:text-secondary-hover"
                      >
                        Settings
                      </span>
                    </div>
                  </Popover.Overlay>
                  <div className="border border-primary mb-2"></div>
                  <Popover.Overlay>
                    <div className="flex flex-row items-center gap-2 px-6 cursor-pointer">
                      <img src={SignOutIcon} />
                      <span
                        className="text-base font-semibold text-[#E22F70]"
                        onClick={async () => {
                          await signOut();
                          navigate("/auth", {
                            state: { target: Status.Signin },
                          });
                        }}
                      >
                        Sign out
                      </span>
                    </div>
                  </Popover.Overlay>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </header>
  );
};

export default Header;
