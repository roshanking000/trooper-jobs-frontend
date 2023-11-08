import React, { useState, useEffect } from 'react'
import BackIcon from '/icons/backicon.svg'
import TonIcon from '/icons/ton_wallet.png'
import RoundedButton from '/src/components/RoundedButton.jsx'
import { Status, UserType } from '/src/Global'
import IntermediateProgress from '/imgs/common/intermediate.svg'

export default function ConfirmWallet(props) {
  const { lastSavedStep, isActive, nextStep, previousStep } = props;

  useEffect(() => {
    if (isActive) {
      const timeout = setTimeout(() => {
        nextStep();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isActive]);

  return (
    <div className='flex flex-row h-full'>
      <div className='h-full hidden sm:block'>
        <RoundedButton width={'w-[48px]'} height={'h-[48px]'} clickFunc={previousStep}>
          <img src={BackIcon}></img>
        </RoundedButton>
      </div>
      <div className='flex flex-col items-center justify-center sm:mt-[100px] h-full'>
        <h2 className='text-primary text-[24px] font-bold'>Connect your wallet</h2>
        <h2 className='text-primary text-base text-center mt-4 sm:mt-6 mx-8 sm:mx-16'>Confirm the request that's just appeared. If you can't see a request, open your wallet extension or application. </h2>
        <div className='flex flex-col mt-6 w-full px-3 sm:px-0 justify-center items-center'>
          <img src={IntermediateProgress} className='w-[40px] h-[40px] animate-spin'></img>
        </div>
        <div className='flex flex-row mt-8 ml-5 mr-5 sm:mr-0 sm:ml-12'>
          <p className='text-primary text-center w-full sm:w-[348px] sm:mr-10'>
            We do not own your private keys and cannot access your funds without your confirmation.
          </p>
        </div>
      </div>
    </div>

  )
}
