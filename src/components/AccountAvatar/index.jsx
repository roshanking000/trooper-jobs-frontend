import clsx from "clsx";
import { getAvatarPath, isInvalid } from "../../utils";
import profileIcon from "/imgs/app/profile/profile.png";
import { useState } from "react";

const AccountAvatar = (props) => {
  const { isOfficial,
    avatarFile,
    borderColor,
    backgroundImg,
    backgroundColor,
    width,
    height,
    margin,
    additionalAttr,
    padding,
    imageWidth,
    imageHeight,
    customStyle,
    zOrder } = props;

  const [showImage, setShowImage] = useState(false);
  const onErrorFunc = () => {
    console.log('onErrorFunc');
    setShowImage(false);
  }
  const onLoadFunc = () => {
    console.log('onLoadFunc');
    setShowImage(true);
  }

  if (isOfficial) {
    return (
      <div
        className={clsx(
          "rounded-full",
          "shadow-button-hover group bg-gradient-to-r from-[#F5A55B] via-[#8B65F6] to-[#2F40FF]",
          isInvalid(width) ? "w-24" : width,
          isInvalid(height) ? "h-24" : height,
          isInvalid(margin) ? "" : margin,
          isInvalid(padding) ? "p-[2px]" : padding,
          isInvalid(zOrder) ? "z-10" : zOrder
        )}
      >
        <div className={clsx("rounded-full w-full h-full z-20", isInvalid(backgroundColor) ? 'bg-app-normal' : backgroundColor)}>
          <div className={clsx(
            "rounded-full w-full h-full z-20 bg-cover bg-no-repeat", 
            showImage ? 'bg-none' : (isInvalid(backgroundImg) ? "bg-[url('/imgs/app/profile/profile.png')]" : backgroundImg))}>
            <img
              className={clsx(
                "rounded-full border-mandatory",
                isInvalid(imageWidth) ? 'w-full' : imageWidth,
                isInvalid(imageHeight) ? 'h-full' : imageHeight,
                isInvalid(additionalAttr) ? "" : additionalAttr,
                showImage ? 'block' : 'hidden'
              )}
              src={getAvatarPath(avatarFile)}
              onError={onErrorFunc}
              onLoad={onLoadFunc}
            />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={
        clsx(
          "border-2 rounded-full bg-cover bg-no-repeat",
          isInvalid(backgroundColor) ? 'bg-app-normal' : backgroundColor,
          showImage ? 'bg-none' : (isInvalid(backgroundImg) ? "bg-[url('/imgs/app/profile/profile.png')]" : backgroundImg),
          isInvalid(borderColor) ? "border-[#2C2C34]" : borderColor,
          isInvalid(width) ? "w-24" : width,
          isInvalid(height) ? "h-24" : height,
          isInvalid(margin) ? "" : margin,
          isInvalid(padding) ? "" : padding,
          isInvalid(zOrder) ? "z-10" : zOrder
        )}>
        <img
          className={clsx(
            "rounded-full",
            isInvalid(additionalAttr) ? "" : additionalAttr,
            isInvalid(imageWidth) ? 'w-full' : imageWidth,
            isInvalid(imageHeight) ? 'h-full' : imageHeight,
            showImage ? 'block' : 'hidden'
          )}
          src={getAvatarPath(avatarFile)}
          onError={onErrorFunc}
          onLoad={onLoadFunc}
        />
      </div >

    )
  }
}

export default AccountAvatar;