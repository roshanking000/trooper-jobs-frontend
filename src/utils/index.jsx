import { UserType } from "../Global";
import { SERVER_URL } from "../api/config";
import profileImg from "/imgs/app/profile/profile.png";

export const generateEIP4361MessageBody = (message) => {
  const header = `${message.domain} wants you to sign in with your Ethereum account:`;
  const uriField = `URI: ${message.uri}`;
  let prefix = [header, message.address].join("\n");
  const versionField = `Version: ${message.version}`;

  const chainField = `Chain ID: ` + message.chainId || "1";

  const nonceField = `Nonce: ${message.nonce}`;

  const suffixArray = [uriField, versionField, chainField, nonceField];

  message.issuedAt = message.issuedAt || new Date().toISOString();

  suffixArray.push(`Issued At: ${message.issuedAt}`);

  const suffix = suffixArray.join("\n");
  prefix = [prefix, message.statement].join("\n\n");
  if (message.statement) {
    prefix += "\n";
  }
  return [prefix, suffix].join("\n");
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const getProfileTypeString = (profile_type) => {
  switch (profile_type) {
    case UserType.Gamer:
      return "Gamer";
    case UserType.Guild:
      return "Guild";
    case UserType.Brand:
      return "Brand";
    case UserType.Game:
      return "Game";
    default:
      return "Unknown";
  }
};

export const isInvalid = (data) => {
  if (data == null || data == undefined) return true;

  if (typeof data == "string" && data === "") {
    return true;
  }
  return false;
};

export const generateTags = (data) => {
  if (data == null || data == undefined || data == "") return [];

  const data_array = data.split(",");

  let result = [];
  data_array.forEach((item) => {
    const tag = {
      id: item,
      text: item,
    };
    result.push(tag);
  });
  return result;
};

export const amendString = (str) => {
  if (str == undefined || str == null) return "";
  return str;
};

export const generateFavoriteGameList = (data) => {
  if (data == null || data == undefined || data == "") return [];

  const data_array = data.split(",");

  let result = [];
  data_array.forEach((item) => {
    const game = {
      name: item,
      image: "/icons/gamer_color.svg",
    };
    result.push(game);
  });
  return result;
};

export const generateRoleList = (data) => {
  if (data == null || data == undefined || data == "") return [];

  const data_array = data.split(",");

  let result = [];
  data_array.forEach((item) => {
    const role = {
      name: item,
    };
    result.push(role);
  });
  return result;
};

export const compareArray = (arr1, arr2) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};

export const getAvatarPath = (avatar_filename) => {
  if (isInvalid(avatar_filename)) return profileImg;
  if (
    avatar_filename.toLowerCase().indexOf("googleusercontent".toLowerCase()) !=
    -1
  ) {
    return avatar_filename;
  }
  return SERVER_URL + "/avatars/" + avatar_filename;
};

export const getPaymentIcon = (payment) => {
  const lower_payment = payment.toLowerCase();
  switch (lower_payment) {
    case "usdc":
      return "/imgs/app/payment/usdc.svg";
    default:
      return "";
  }
};

export const getAccountRating = (account) => {
  if (
    account == undefined ||
    account == null ||
    account.poster_rating == undefined ||
    account.poster_rating == null
  )
    return "0.0";
  if (account.is_official == 1) return "5.0";
  return parseFloat(account.poster_rating).toFixed(2);
};

export const getLocalDateTime = (datetime) => {
  const date = new Date(datetime);
  const options = { year: "numeric", month: "long", day: "2-digit" };
  const outputDate = date
    .toLocaleDateString("en-US", options)
    .replace(/\//g, "-");
  return outputDate;
};

export const getPastDays = (pastDate) => {
  const duration = calcDuration(pastDate, new Date());
  if (duration == 0) {
    return "Today";
  }
  return duration + " days ago";
};

export const calcDuration = (date1, date2) => {
  const startDate = new Date(date1);
  const endDate = new Date(date2);
  const diffMs = endDate.getTime() - startDate.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const avatarDivStyle = (is_official) => {
  if (is_official) {
    return {
      // boxShadow: "0px 0px 8px #f0f0ff",
      boxShadow: "0px 0px 8px #2f40FF",
      mixBlendMode: "normal",
    };
  } else {
    return {
      boxShadow: "0px 0px 8px #2f40FF",
      mixBlendMode: "normal",
    };
  }
};

export const avatarDivClassName = (is_official) => {
  if (is_official) {
    return {
      // boxShadow: "0px 0px 8px #f0f0ff",
      boxShadow: "0px 0px 8px #2f40FF",
      mixBlendMode: "normal",
    };
  } else {
    return {
      boxShadow: "0px 0px 8px #2f40FF",
      mixBlendMode: "normal",
    };
  }
};

export const amendPaymentAmount = (amount) => {
  return parseFloat(amount)
    .toFixed(2)
    .replace(/\.?0+$/, "");
};

export const getUSDCAmount = (usdAmount) => {
  return (parseFloat(usdAmount) * 0.999).toFixed(2).replace(/\.?0+$/, "");
};

export const getJobStateString = (jobState) => {
  switch (jobState) {
    case "Open":
      return "open";
    case "In progress":
      return "started";
    case "Done":
      return "closed";
    default:
      return "Unknown";
  }
};

export const getJobStateTextColor = (jobState) => {
  switch (jobState) {
    case "Open":
      return "text-[#2FE28C]";
    case "In progress":
      return "text-[#515FFF]";
    case "Done":
      return "text-[#E22F70]";
    default:
      return "text-[#2f40FF]";
  }
};

export const getJobStateBorderColor = (jobState) => {
  switch (jobState) {
    case "Open":
      return "border-green";
    case "In progress":
      return "border-purple";
    case "Done":
      return "border-red";
    default:
      return "border-[#2f40FF]";
  }
};

export const numberInputOnWheelPreventChange = (e) => {
  // Prevent the input value change
  e.target.blur();

  // Prevent the page/container scrolling
  e.stopPropagation();

  setTimeout(() => {
    e.target.focus();
  }, 0);
};

export const getMissionStateTextColor = (missionState) => {
  switch (missionState) {
    case "pending":
      return "text-[#E2B02F]";
    case "claimable":
      return "text-[#2FE28C]";
    case "dispute":
      return "text-[#E22F70]";
    case "achieved":
      return "text-[#515FFF]";
  }
};

export const getMissionStateBorderColor = (missionState) => {
  switch (missionState) {
    case "claimable":
      return "border-green";
    case "achieved":
      return "border-[#515FFF]";
    case "dispute":
      return "border-red";
    case "pending":
      return "border-[#E2B02F]";
  }
};
