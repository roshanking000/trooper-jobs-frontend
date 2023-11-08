import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Header from "/src/components/app/Header";
import RoundedButton from "/src/components/RoundedButton.jsx";
import SpecialityTagInput from "/src/components/SpecialityTagInput";

import MaskGroup from "/imgs/common/mask_group.svg";
import profileImg from "/imgs/app/profile/profile.png";
import linkedinLogo from "/imgs/app/profile/linkedinLogo.png";
import instagramLogo from "/imgs/app/profile/instagramLogo.png";
import facebookLogo from "/imgs/app/profile/facebookLogo.png";
import SwordIcon from "/icons/sword.svg";
import searchImg from "/imgs/app/header/search.png";
import floppyDiskIcon from "/imgs/app/common/FloppyDisk.svg";
import uploadIcon from "/imgs/app/common/Upload.svg";
import circleWavyWarningIcon from "/imgs/app/common/CircleWavyWarning.svg";

import { amendString, avatarDivStyle, compareArray, generateTags, getAvatarPath } from "../../utils";
import { toast } from "react-toastify";
import { accountApi } from "../../api/account";
import { commonApi } from "../../api/common";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAuth } from "../../hooks/use-auth";
import clsx from "clsx";
import CloseIcon from "../../components/Icons/CloseIcon";
import ReviewStarIcon from "../../components/Icons/ReviewStarIcon";
import AccountAvatar from "../../components/AccountAvatar";

const EditMyProfilePage = (props) => {
  const [currentTab, setCurrentTab] = useState("missions");
  const { signIn } = useAuth();
  const location = useLocation();
  const profile = location.state.profile;
  const [leaveDialogView, setLeaveDialogView] = useState(false);
  const [avatar, setAvatar] = useState(profile.account.avatar_file == null ? null : getAvatarPath(profile.account.avatar_file));
  const [uploadAvatar, setUploadAvatar] = useState(null);
  const [name, setName] = useState(amendString(profile.account.name));
  const [surname, setSurname] = useState(amendString(profile.account.surname));
  const [username, setUsername] = useState(
    amendString(profile.account.username)
  );
  const [description, setDescription] = useState(
    amendString(profile.account.short_description)
  );
  const [favoriteGames, setFavoriteGames] = useState(
    generateTags(profile.account.favorite_games)
  );
  const [roles, setRoles] = useState(generateTags(profile.account.roles));
  const navigate = useNavigate();
  const { setLoadingView } = props;
  const [reputation, setReputation] = useState(profile.account.is_official ? 5 : 0);

  const updateProfile = async () => {
    setLoadingView(true);
    try {
      let avatarURL = profile.account.avatar_file;
      if (uploadAvatar != undefined && uploadAvatar != null) {
        try {
          const formData = new FormData();
          formData.append("avatar", uploadAvatar);
          const payload = await commonApi.uploadFile(formData);
          console.log('payload >>> ', payload);
          avatarURL = payload.filename;
        } catch (err) {
          console.log("Error >>> ", err);
          avatarURL = null;
        }
      }

      const response = await accountApi.updateAccountProfile({
        name: name,
        surname: surname,
        short_description: description,
        roles: roles.map((obj) => obj.text).join(","),
        favorite_games: favoriteGames.map((obj) => obj.text).join(","),
        avatar_file: avatarURL,
      });
      if (response.status == "success") {
        toast.info(response.message);
        await signIn(response.token);
        navigate("/myprofile");
      } else {
        toast.error("Update profile failed");
      }
    } catch (err) {
      console.log("updateProfile error >>> ", err);
      toast.error("Update profile failed");
    }
    setLoadingView(false);
  };

  const leaveEditProfilePage = () => {

    if (name != profile.account.name ||
      surname != profile.account.surname ||
      description != profile.account.short_description ||
      compareArray(favoriteGames, generateTags(profile.account.favorite_games)) == false ||
      compareArray(roles, generateTags(profile.account.roles)) == false ||
      avatar != getAvatarPath(profile.account.avatar_file)) {
      setLeaveDialogView(true);
    } else {
      navigate("/myprofile");
    }
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
      <div className="w-full h-full inset-0 justify-center !z-0 absolute">
        <div className="w-4/6 h-70 left-0 right-0 mx-auto absolute mt-12 hidden sm:block">
          <img src={MaskGroup} />
        </div>
        <img
          src={MaskGroup}
          className="w-full h-full sm:hidden absolute object-cover"
        />
      </div>
      <section className="flex flex-col xl:flex-row justify-center xl:items-start gap-6 xl:gap-20 p-6 xl:p-0 w-full">
        <div className="flex flex-col items-center gap-3 xl:gap-8 xl:w-[320px] z-10">
          <div className="flex flex-col w-1/2 xl:w-full items-center justify-center">
            <AccountAvatar
              isOfficial={profile.account.is_official}
              width={'w-[224px] sm:w-[244px]'}
              height={'h-[224px] sm:h-[244px]'}
              imageWidth={'max-w-[216px] w-[216px] sm:max-w-[236px] sm:w-[236px]'}
              imageheight={'max-h-[216px] h-[216px] sm:max-h-[236px] sm:h-[236px]'}
              avatarFile={profile.account.avatar_file}
              padding={profile.account.is_official ? 'p-[4px]' : 'p-[2px]'}
              zOrder={'z-0'}
            />
            <input
              type="file"
              id="avatarImage"
              name="avatarImage"
              className="z-50 hidden"
              accept="image/*"
              onChange={(e) => {
                let src = null;
                if (e.target.files.length > 0)
                  src = URL.createObjectURL(e.target.files[0]);
                setAvatar(src);
                setUploadAvatar(e.target.files[0]);
              }}
            />
            <RoundedButton
              htmlFor="avatarImage"
              width={"w-full xl:w-[80%] 2xl:w-2/3"}
              margin={"!-mt-4 mx-auto"}
              attrib={"!text-sm"}
            >
              <label
                htmlFor="avatarImage"
                className="flex flex-row gap-2 items-center justify-center xl:px-6 py-3 z-50 w-full cursor-pointer"
              >
                <span>
                  <img src={uploadIcon}></img>
                </span>
                Upload avatar
              </label>
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
                      <ReviewStarIcon isFill={true} key={"fill" + i} />
                    );
                  }
                  for (let i = 0; i < 5 - Math.floor(reputation); i++) {
                    _markArray.push(
                      <ReviewStarIcon isFill={false} key={"unfill" + i} />
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
                  <p className="text-xs font-semibold text-normal">
                    Complete a new mission to have your first review.
                  </p>
                  <Link to="/jobs">
                    <p className="text-sm font-semibold text-small">
                      {"Search for a new job >"}
                    </p>
                  </Link>
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
                <p className="text-xs font-semibold text-normal">
                  Connect your wallet to display your NFTs.
                </p>
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
        <div className="flex flex-col items-start gap-6 xl:gap-8 w-full z-10">
          <div className="flex flex-row justify-between items-center gap-20 w-full">
            <div className="flex flex-row items-start gap-4">
              <div className="flex flex-col items-start gap-2">
                <p className="px-6 text-base font-semibold text-normal">Name</p>
                <input
                  type="text"
                  className="z-50 bg-app-normal block w-full h-[51px] px-6 py-4 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="px-6 text-base font-semibold text-normal">
                  Surname
                </p>
                <input
                  type="text"
                  className="z-50 bg-app-normal block w-full h-[51px] px-6 py-4 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-full"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
            </div>
            <div className="hidden xl:flex flex-row gap-4">
              <RoundedButton
                padding={"px-6 py-3"}
                attrib={"!text-base"}
                clickFunc={updateProfile}
              >
                <span>
                  <img src={floppyDiskIcon}></img>
                </span>
                Save
              </RoundedButton>
              <RoundedButton
                padding={"px-6 py-3"}
                attrib={"hidden xl:block !text-base"}
                clickFunc={leaveEditProfilePage}
              >
                Cancel
              </RoundedButton>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="px-6 text-base font-semibold text-normal">
              Choose your username
            </p>
            <div className="relative w-[232px]">
              <div className="absolute inset-y-0 left-0 flex items-center px-4 pointer-events-none">
                <img src={SwordIcon} />
              </div>
              <input
                type="text"
                className="bg-app-normal block w-full h-[51px] pl-12 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-full"
                value={username}
                disabled
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <p className="px-6 text-base font-semibold text-normal">
              Description
            </p>
            <textarea
              type="text"
              className="z-50 bg-app-normal block w-full h-[127px] px-6 py-4 text-sm text-normal border border-primary focus:border-primary focus:ring-0 rounded-3xl"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-lg xl:text-xl font-bold text-normal">
              Favorite simulations / games
            </h1>
            <SpecialityTagInput
              tags={favoriteGames}
              setTags={setFavoriteGames}
              type="game"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-lg xl:text-xl font-bold text-normal">Roles</h1>
            <SpecialityTagInput
              tags={roles}
              setTags={setRoles}
              type="speciality"
            />
          </div>
          <div className="flex flex-row gap-2 mx-auto">
            <RoundedButton
              padding={"px-6 py-2"}
              attrib={"xl:hidden !text-sm mx-auto"}
              clickFunc={updateProfile}
            >
              <span>
                <img src={floppyDiskIcon}></img>
              </span>
              Save
            </RoundedButton>
            <RoundedButton
              padding={"px-6 py-2"}
              attrib={"xl:hidden !text-base mx-auto"}
              clickFunc={leaveEditProfilePage}
            >
              Cancel
            </RoundedButton>
          </div>
        </div>
      </section>
      {leaveDialogView === true && (
        <div
          className="fixed bg-blend-lighten top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm"
          onClick={() => setLeaveDialogView(false)}
        >
          <div
            className="relative max-w-3xl max-h-[50%] lg:max-h-[90%] m-auto top-1/2 transform -translate-y-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative shadow bg-app-normal rounded-[32px] border border-primary">
              <button
                type="button"
                className="lg:hidden absolute inline-flex top-3 right-3 text-gray-400 bg-transparent hover:bg-hover rounded-lg text-sm p-1 items-center"
                onClick={() => setLeaveDialogView(false)}
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
                    onClick={() => setLeaveDialogView(false)}
                  >
                    <CloseIcon />
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <p className="text-base text-normal">
                  You are about to leave the edit profile page. If you leave,
                  all the changes you done for your profile will be
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
                      clickFunc={() => setLeaveDialogView(false)}
                    >
                      Oups, stay here
                    </RoundedButton>
                    <RoundedButton
                      padding={"px-4 lg:px-8 py-3"}
                      attrib={
                        "!text-base hover:!from-[#EB5757] hover:!via-[#EB5757] hover:!to-[#EB5757]"
                      }
                      clickFunc={() => {
                        setLeaveDialogView(false);
                        navigate("/myprofile");
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
    </>
  );
};

export default EditMyProfilePage;

const reviews = [
  // {
  //   avatar: "/imgs/app/profile/review_avatar.svg",
  //   name: "Trooper",
  //   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna."
  // },
  // {
  //   avatar: "/imgs/app/profile/review_avatar.svg",
  //   name: "Trooper",
  //   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna."
  // },
];

const nftList = [
  // {
  //   url: '/imgs/app/profile/profile.png'
  // },
  // {
  //   url: '/imgs/app/profile/profile.png'
  // },
  // {
  //   url: '/imgs/app/profile/profile.png'
  // },
  // {
  //   url: '/imgs/app/profile/profile.png'
  // },
  // {
  //   url: '/imgs/app/profile/profile.png'
  // },
];

const favoriteGameList = [
  // {
  //   name: 'Trooper',
  //   image: '/imgs/app/profile/review_avatar.svg'
  // },
  // {
  //   name: 'Trooper',
  //   image: '/imgs/app/profile/review_avatar.svg'
  // },
  // {
  //   name: 'Trooper',
  //   image: '/imgs/app/profile/review_avatar.svg'
  // },
  // {
  //   name: 'Trooper',
  //   image: '/imgs/app/profile/review_avatar.svg'
  // },
  // {
  //   name: 'Trooper',
  //   image: '/imgs/app/profile/review_avatar.svg'
  // },
  // {
  //   name: 'Trooper',
  //   image: '/imgs/app/profile/review_avatar.svg'
  // },
];

const badgeList = [
  // {
  //   image: '/imgs/app/profile/review_avatar.svg'
  // },
  // {
  //   image: '/imgs/app/profile/review_avatar.svg'
  // },
  // {
  //   image: '/imgs/app/profile/review_avatar.svg'
  // },
  // {
  //   image: '/imgs/app/profile/review_avatar.svg'
  // },
  // {
  //   image: '/imgs/app/profile/review_avatar.svg'
  // },
  // {
  //   image: '/imgs/app/profile/review_avatar.svg'
  // },
  // {
  //   image: '/imgs/app/profile/review_avatar.svg'
  // },
  // {
  //   image: '/imgs/app/profile/review_avatar.svg'
  // },
  // {
  //   image: '/imgs/app/profile/review_avatar.svg'
  // },
  // {
  //   image: '/imgs/app/profile/review_avatar.svg'
  // },
];

const roleList = [
  // {
  //   name: 'ux design'
  // },
  // {
  //   name: 'ui design'
  // },
  // {
  //   name: 'html'
  // },
  // {
  //   name: 'CSS'
  // },
];

const missionList = [
  // {
  //   name: 'Design the Trooper Landing Page',
  //   content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.',
  //   guildName: 'Trooper',
  //   guildAvatar: '/imgs/app/profile/review_avatar.svg',
  //   time: '2 days ago',
  //   status: 'Past'
  // },
  // {
  //   name: 'Design the Trooper Landing Page',
  //   content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.',
  //   guildName: 'Trooper',
  //   guildAvatar: '/imgs/app/profile/review_avatar.svg',
  //   time: '2 days ago',
  //   status: 'Past'
  // },
  // {
  //   name: 'Design the Trooper Landing Page',
  //   content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.',
  //   guildName: 'Trooper',
  //   guildAvatar: '/imgs/app/profile/review_avatar.svg',
  //   time: '2 days ago',
  //   status: 'Past'
  // },
  // {
  //   name: 'Design the Trooper Landing Page',
  //   content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.',
  //   guildName: 'Trooper',
  //   guildAvatar: '/imgs/app/profile/review_avatar.svg',
  //   time: '2 days ago',
  //   status: 'Past'
  // },
];
