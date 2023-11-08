import React, { useEffect, useState } from 'react'
import BackIcon from '/icons/backicon.svg'
import RoundedButton from '/src/components/RoundedButton.jsx'
import RoundedInput from '../../components/RoundedInput'
import RoundedTextArea from '../../components/RoundedTextArea'
import { toast } from 'react-toastify'

export default function CreateProfile3(props) {

  const { isActive, nextStep, previousStep, userBasicInfo, setUserDetail, userDetail } = props;

  useEffect(() => {
    if (userBasicInfo.name) {
      setUserDetail({
        name: userBasicInfo.name,
        surname: userDetail.surname,
        desc: userDetail.desc
      })
    }
  }, [userBasicInfo])

  const onChangeDesc = e => {
    setUserDetail({
      ...userDetail,
      desc: e.target.value
    });
  }

  const onChangeName = e => {
    setUserDetail({
      ...userDetail,
      name: e.target.value,
    })
  }

  const onChangeSurname = e => {
    setUserDetail({
      ...userDetail,
      surname: e.target.value
    })
  }

  const clickNext = () => {
    if (userDetail.name == '') {
      toast.warn('Please input name');
      return;
    }
    nextStep();
  }

  return (
    <div className='flex flex-row sm:h-[516px]'>
      <div className='h-full hidden sm:block mr-10 items-start'>
        <RoundedButton width={'w-[48px]'} height={'h-[48px]'} clickFunc={previousStep}>
          <span><img src={BackIcon}></img></span>
        </RoundedButton>
      </div>
      <div className='flex flex-col items-start justify-center px-5 sm:px-0'>
        <h2 className='text-primary text-[24px] font-bold grow-0'>Create your profile</h2>
        <h2 className='text-desc text-base mt-2 sm:mt-4 grow-0'>Thanks for choosing your role. <br/>
          Please enter your name and description now:
          </h2>
        <div className='flex flex-row justify-center items-center w-full grow-0 mt-2 sm:mt-5 gap-4'>
          <div className='flex flex-col w-1/2'>
            <h2 className='text-desc text-base mt-5 sm:mt-4 grow-0 ml-7'>Name</h2>
            <RoundedInput margin={'mt-2'} width={'w-full'} padding={'px-5 py-2'} attrib={'text-sm bg-transparent text-desc placeholder-gray-300 placeholder-opacity-25 outline-0 pl-2 border-none focus:outline-none focus:ring-0'} placeholder={'Name'} inputValue={userDetail.name} onChangeInput={onChangeName}>
            </RoundedInput>
          </div>
          <div className='flex flex-col w-1/2'>
            <h2 className='text-desc text-base  mt-5 sm:mt-4 grow-0 ml-7'>Surname</h2>
            <RoundedInput margin={'mt-2'} width={'w-full'} padding={'px-5 py-2'} attrib={'text-sm bg-transparent text-desc placeholder-gray-300 placeholder-opacity-25 outline-0 pl-2 border-none focus:outline-none focus:ring-0'} placeholder={'Surname'} inputValue={userDetail.surname} onChangeInput={onChangeSurname}>
            </RoundedInput>
          </div>
        </div>
        <div className='flex flex-col justify-center items-start w-full grow-0 mt-2'>
          <h2 className='text-desc text-base mt-3 grow-0 ml-7'>Description</h2>
          <RoundedTextArea width={'w-full'} height={'h-36'} padding={'px-4 py-4'} parentAttrib={'!rounded-3xl'} attrib={'border-transparent resize-none text-sm bg-transparent text-desc placeholder-gray-300 placeholder-opacity-25 outline-0'} placeholder={'Tell us more about yourself...'} textAreaValue={userDetail.desc} onChangeTextArea={onChangeDesc}>
          </RoundedTextArea>
        </div>

        <div className='grow hidden sm:block'></div>
        <RoundedButton width={'w-full'} height={'h-[54px]'} attrib={'grow-0 mt-8 sm:mt-0'} clickFunc={clickNext}>
          {'Next >'}
        </RoundedButton>
      </div>
    </div >
  )
}
