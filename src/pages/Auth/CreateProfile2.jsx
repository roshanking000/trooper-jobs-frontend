import React, { useState, useEffect } from 'react'
import BackIcon from '/icons/backicon.svg'
import UploadIcon from '/icons/upload.svg'
import SwordIcon from '/icons/sword.svg'
import DefaultAvatarBlack from '/imgs/common/default_avatar_black.png'
import GreenCheckIcon from '/icons/green_check.svg'
import RedWarningIcon from '/icons/red_warning.svg'
import RoundedButton from '/src/components/RoundedButton.jsx'
import RoundedInput from '../../components/RoundedInput'
import { useFilePicker } from 'use-file-picker'
import { toast } from 'react-toastify'
import { accountApi } from '../../api/account'
import IntermediateProgress from '/imgs/common/intermediate.svg'
import { debounce } from 'lodash'

export default function CreateProfile2(props) {

  const { nextStep, previousStep, userBasicInfo, setUserInfo, setSelectedFile } = props;
  const [userName, setUserName] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(0);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const onChangeUserName = e => {
    setUserName(e.target.value);
    setIsCheckingUsername(true);
  }

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await accountApi.checkUsername(username);
      setIsUsernameAvailable(1);
    } catch (err) {
      console.log('err >>> ', err);
      setIsUsernameAvailable(2);
    }
    setIsCheckingUsername(false);
  }
  
  useEffect(() => {
    const debouncedCheckUsername = debounce(() => {
      checkUsernameAvailability(userName);
    }, 1000);
    if (userName) {
      debouncedCheckUsername();
    } else {
      setIsCheckingUsername(false);
      setIsUsernameAvailable(0);
    }
    return debouncedCheckUsername.cancel;
  }, [userName])

  const clickNext = async () => {
    if (userName == '') {
      toast.warn('Please input username');
      return;
    }
    if (isUsernameAvailable != 1) {
      toast.warn('Please input valid username');
      return;
    }
    setUserInfo({
      username: userName
    })
    nextStep();

    // if (selectedFile != undefined) {
    //   try {
    //     const formData = new FormData();
    //     formData.append("avatar", selectedFile);
    //     const payload = await commonApi.uploadFile(formData);
    //     console.log('payload >>> ', payload);
    //   } catch (err) {
    //     console.log("Error >>> ", err);
    //   }
    // }
  }

  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: false,
    onFilesSelected: ({ plainFiles, filesContent, errors }) => {
      // this callback is always called, even if there are errors
      console.log('onFilesSelected', plainFiles, filesContent, errors);
    },
    onFilesRejected: ({ errors }) => {
      // this callback is called when there were validation errors
      console.log('onFilesRejected', errors);
    },
    onFilesSuccessfulySelected: ({ plainFiles, filesContent }) => {
      // this callback is called when there were no validation errors
      console.log('onFilesSuccessfulySelected', plainFiles, filesContent);
      setSelectedFile(plainFiles[0]);
    },
  });

  return (
    <div className='flex flex-row sm:h-[516px]'>
      <div className='h-full hidden sm:block mr-10 items-start'>
        <RoundedButton width={'w-[48px]'} height={'h-[48px]'} clickFunc={previousStep}>
          <span><img src={BackIcon}></img></span>
        </RoundedButton>
      </div>
      <div className='flex flex-col items-start justify-center px-5 sm:px-0'>
        <h2 className='text-primary text-[24px] font-bold grow-0'>Create your profile</h2>
        <h2 className='text-desc text-base mt-2 sm:mt-4 grow-0'>We need some information about you to be able to create your Trooper profile.</h2>
        <div className='flex flex-col justify-center items-center w-full grow-0 mt-5 sm:mt-10'>
          <div className='border-[1px] rounded-full border-[#F4F4F7]/[0.08] w-fit h-fit'>
            {(filesContent != undefined && filesContent.length > 0) ? (
              filesContent.map((file, index) => (
                <img key={index} alt={file.name} src={file.content} className='w-[160px] h-[160px] rounded-full'></img>
              ))
            ) : (
              (userBasicInfo == undefined || userBasicInfo.picture == undefined || userBasicInfo.picture == '') ? (
                <img src={DefaultAvatarBlack} className='w-[160px] h-[160px] rounded-full'></img>
              ) : (
                <img src={userBasicInfo.picture} className='w-[160px] h-[160px] rounded-full'></img>
              )
            )}
          </div>
          <RoundedButton padding={'px-4 py-1'} attrib={'!text-sm bg-primary'} margin={'!-mt-4'} clickFunc={() => openFileSelector()}>
            <span><img src={UploadIcon}></img></span>
            Upload avatar
          </RoundedButton>
        </div>
        <h2 className='text-desc text-base font-semibold mt-5 sm:mt-4 grow-0 ml-5'>Choose your username</h2>
        <RoundedInput margin={'mt-2'} width={'w-full'} padding={'px-5 py-3'} attrib={'text-md bg-transparent text-desc placeholder-gray-300 placeholder-opacity-25 outline-0 pl-2 border-none focus:outline-none focus:ring-0'} icon={SwordIcon} placeholder={'username'} onChangeInput={onChangeUserName} inputValue={userName}>
          {isCheckingUsername ? (<img src={IntermediateProgress} className='w-[24px] h-[24px] animate-spin'></img>) : (
            (isUsernameAvailable == 1) ? (<img src={GreenCheckIcon} className='w-[24px] h-[24px]'></img>) : (
              (isUsernameAvailable == 2) ? (<img src={RedWarningIcon} className='w-[24px] h-[24px]'></img>) : ('')
            )
          )}
        </RoundedInput>
        <div className='grow hidden sm:block'></div>
        <RoundedButton width={'w-full'} height={'h-[54px]'} attrib={'grow-0 mt-8 sm:mt-0'} clickFunc={clickNext}>
          {'Next >'}
        </RoundedButton>
      </div>
    </div >
  )
}
