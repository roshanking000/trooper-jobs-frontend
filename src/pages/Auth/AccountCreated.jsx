import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmIcon from '/icons/confirm.svg'
import RoundedButton from '/src/components/RoundedButton.jsx'
import { Status, UserType } from '/src/Global'
import IntermediateProgress from '/imgs/common/intermediate.svg'

export default function AccountCreated(props) {
  const { isActive, nextStep } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (isActive) {
      const timeout = setTimeout(() => {
        navigate('/jobs');
      }, 3000);
        return () => clearTimeout(timeout);
    }
  }, [isActive]);

  return (
    <div className='flex flex-col items-center justify-center sm:h-[516px]'>
      <RoundedButton padding={'p-2'} width={'w-[48px]'} height={'h-[48px]'} clickFunc={() => SW.previousStep()} attrib={'pointer-events-none'}>
        <img src={ConfirmIcon}></img>
      </RoundedButton>
      <h2 className='text-primary text-[20px] font-bold mt-8'>Account created successfully!</h2>
      <h2 className='text-primary text-base text-center mt-2 sm:mt-4 mx-8 sm:mx-24'>You can now access the application and start your Trooper journey.</h2>
    </div>

  )
}
