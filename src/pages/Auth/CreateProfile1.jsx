import React, { useState } from 'react'
import GamerIcon from '/icons/gamer_color.svg'
import GuildIcon from '/icons/guild_color.svg'
import BrandIcon from '/icons/brand_color.svg'
import GameIcon from '/icons/game_color.svg'
import RoundedButton from '/src/components/RoundedButton.jsx'
import clsx from 'clsx'
import { UserType } from '../../Global'
import { toast } from 'react-toastify'

export default function CreateProfile1(props) {
  const { isActive, nextStep, userType, setUserType } = props;
  const clickNext = () => {
    if (userType != UserType.Gamer && userType != UserType.Guild && userType != UserType.Brand && userType != UserType.Game) {
      toast.info('Please select your role');
      return;
    }
    nextStep();
  }
  return (
    <div className='flex flex-col items-start justify-center sm:h-[516px] px-5 sm:px-0'>
      <h2 className='text-primary text-[24px] font-bold grow-0'>Create your profile</h2>
      <h2 className='text-desc text-base mt-2 sm:mt-4 grow-0'>We need some information about you to be able to create your Trooper profile.</h2>
      <h2 className='text-primary text-[18px] font-bold mt-6 grow-0'>Select your role</h2>
      <div className='grid sm:grid-cols-2 sm:grid-rows-2 grid-cols-1 grid-rows-4 gap-3 mt-3 grow mb-3 w-full'>
        <div className={clsx('relative w-full inline-flex flex-col items-start border-[1px] p-[1px] rounded-3xl border-[#F4F4F7]/[0.08] cursor-pointer', userType == UserType.Gamer ? 'selected-item' : '')} onClick={() => setUserType(UserType.Gamer)}>
          <span className={clsx("relative rounded-3xl flex flex-col items-start px-6 py-4", userType == UserType.Gamer ? 'bg-button-hover' : '')}>
            <img src={GamerIcon}></img>
            <div className='flex flex-col mt-1'>
              <p className='text-normal text-base font-semibold'>Freelancer / Gamer</p>
              <p className='text-desc text-sm mt-1'>Get hired.</p>
            </div>
          </span>
        </div>
        <div className={clsx('relative w-full inline-flex flex-col items-start border-[1px] p-[1px] rounded-3xl border-[#F4F4F7]/[0.08] cursor-pointer', userType == UserType.Guild ? 'selected-item' : '')} onClick={() => setUserType(UserType.Guild)}>
          <span className={clsx("relative rounded-3xl flex flex-col items-start px-6 py-4", userType == UserType.Guild ? 'bg-button-hover' : '')}>
            <img src={GuildIcon}></img>
            <div className='flex flex-col mt-1'>
              <p className='text-normal text-base font-semibold'>DAO / Guild</p>
              <p className='text-desc text-sm mt-1'>Hire top freelancers / gamers.</p>
            </div>
          </span>
        </div>
        <div className={clsx('relative w-full inline-flex flex-col items-start border-[1px] p-[1px] rounded-3xl border-[#F4F4F7]/[0.08] cursor-pointer', userType == UserType.Brand ? 'selected-item' : '')} onClick={() => setUserType(UserType.Brand)}>
          <span className={clsx("relative rounded-3xl flex flex-col items-start px-6 py-4", userType == UserType.Brand ? 'bg-button-hover' : '')}>
            <img src={BrandIcon}></img>
            <div className='flex flex-col mt-1'>
              <p className='text-normal text-base font-semibold'>Brand / Company</p>
              <p className='text-desc text-sm mt-1'>
                Capture attention. <br/>
                Hire top freelancers.
              </p>
            </div>
          </span>
        </div>
        <div className={clsx('relative w-full inline-flex flex-col items-start border-[1px] p-[1px] rounded-3xl border-[#F4F4F7]/[0.08] cursor-pointer', userType == UserType.Game ? 'selected-item' : '')} onClick={() => setUserType(UserType.Game)}>
          <span className={clsx("relative rounded-3xl flex flex-col items-start px-6 py-4", userType == UserType.Game ? 'bg-button-hover' : '')}>
            <img src={GameIcon}></img>
            <div className='flex flex-col mt-1'>
              <p className='text-normal text-base font-semibold'>Job training / Education</p>
              <p className='text-desc text-sm mt-1'>Train and teach.</p>
            </div>
          </span>
        </div>
      </div>
      {/* <div className={clsx('relative w-full inline-flex flex-row items-center grow-0 border-[1px] p-[1px] rounded-3xl border-[#F4F4F7]/[0.08] mt-3 cursor-pointer', userType == UserType.Gamer ? 'selected-item' : '')} onClick={() => setUserType(UserType.Gamer)}>
        <span className={clsx("relative rounded-3xl flex flex-row items-center p-4", userType == UserType.Gamer ? 'bg-button-hover' : '')}>
          <img src={Gamer} className='ml-2 mr-6'></img>
          <div className='flex flex-col sm:pr-24'>
            <p className='text-normal text-base font-semibold'>Gamer</p>
            <p className='text-desc text-sm '>Gamers are looking for job opportunities on the Trooper platform, they can be hired by guilds.</p>
          </div>
        </span>
      </div>
      <div className={clsx('relative w-full inline-flex flex-row items-center grow-0 border-[1px] p-[1px] rounded-3xl border-[#F4F4F7]/[0.08] mt-2 cursor-pointer', userType == UserType.Guild ? 'selected-item' : '')} onClick={() => setUserType(UserType.Guild)}>
        <span className={clsx("relative rounded-3xl flex flex-row items-center p-4", userType == UserType.Guild ? 'bg-button-hover' : '')}>
          <img src={Guild} className='ml-2 mr-6'></img>
          <div className='flex flex-col pr-10 sm:pr-24'>
            <p className='text-normal text-base font-semibold'>Guild</p>
            <p className='text-desc text-sm '>Guild are creating job opportunities and hiring gamers.</p>
          </div>
        </span>
      </div> */}
      {/* <div className='grow hidden sm:block'></div> */}
      <RoundedButton width={'w-full'} height={'h-[54px]'} attrib={'grow-0 mt-4 sm:mt-0'} clickFunc={clickNext}>
        {'Next >'}
      </RoundedButton>
    </div>
  )
}
