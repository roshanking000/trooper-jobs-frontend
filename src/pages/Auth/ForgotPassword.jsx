import React, { useEffect, useState } from 'react'
import BackIcon from '/icons/backicon.svg'
import RoundedButton from '/src/components/RoundedButton.jsx'
import RoundedInput from '../../components/RoundedInput'
import ConfirmIcon from '/icons/confirm.svg'
import { toast } from 'react-toastify'
import { Status } from '../../Global'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils'
import { accountApi } from '../../api/account'

export default function ForgotPassword(props) {

  const { isActive, goToStep, setLoadingView } = props;

  const [emailError, setEmailError] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (isActive) {
      setEmailError('');
    }
  }, [isActive])

  const onChangeEmail = e => {
    setEmail(e.target.value);
  }

  const clickSendEmail = async () => {
    if (email == '') {
      setEmailError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Email is invalid');
      return;
    }

    setLoadingView(true);
    try {
      const resp = await accountApi.resetPassword(email);
      if (resp.status == 'success') {
        setEmailSent(true);
      } else {
        toast.warning(resp.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
    setLoadingView(false);
  }

  return (
    <div className='flex flex-row sm:h-[516px]'>
      <div className='h-full hidden sm:block mr-10 items-start'>
        <RoundedButton width={'w-[48px]'} height={'h-[48px]'} clickFunc={() => goToStep(Status.LoginWithEmail)}>
          <span><img src={BackIcon}></img></span>
        </RoundedButton>
      </div>
      <div className='flex flex-col items-center justify-center px-5 sm:px-0 w-full'>
        <h2 className='text-primary text-[24px] font-bold grow-0'>Forgotten password</h2>
        {emailSent == false && (
          <h2 className='text-desc text-base mt-2 sm:mt-4 grow-0 px-4 w-full sm:px-12 text-center'>To modify your password, we will send a link to the email linked to your Trooper account.</h2>
        )}

        {emailSent == false && (
          <div className='flex flex-col w-full grow justify-center items-center'>
            <div className='flex flex-col justify-center items-start w-full mt-4 gap-1 sm:px-10 px-2'>
              <h2 className='text-desc text-base mt-1 px-7'>Email</h2>
              <RoundedInput
                margin={'mt-1'}
                width={'w-full'}
                padding={'px-5 py-2'}
                attrib={'text-sm text-primary bg-transparent text-desc placeholder-gray-300 placeholder-opacity-25 outline-0 pl-2 border-none focus:outline-none focus:ring-0'}
                placeholder={'Enter your email'}
                inputValue={email}
                onChangeInput={onChangeEmail}
                type={'email'}>
              </RoundedInput>
              {emailError != "" && (<h2 className='text-red-500 text-[14px] mt-1 px-7'>{emailError}</h2>)}
            </div>

            <div className='w-full sm:px-10 px-2 mt-4 justify-center items-center flex flex-col gap-2'>
              <RoundedButton width={'w-full'} height={'h-[54px]'} clickFunc={clickSendEmail}>
                Send me the email
              </RoundedButton>
            </div>
          </div>
        )}
        {emailSent && (
          <div className='flex flex-col w-full grow justify-center items-center'>
            <RoundedButton padding={'p-2'} width={'w-[48px]'} height={'h-[48px]'} attrib={'pointer-events-none'}>
              <img src={ConfirmIcon}></img>
            </RoundedButton>
            <h2 className='text-primary text-[20px] font-bold mt-2'>Email sent!</h2>
            <h2 className='text-desc text-base text-center mt-2 sm:mt-4 mx-4 sm:mx-12'>{email}<br />Click on the link in your email to modify your password</h2>
          </div>
        )}
        <div className='flex flex-row mt-4 sm:ml-8 w-full items-end justify-end grow-0'>
          <RoundedButton width={'w-[110px]'} height={'h-[38px]'} attrib={'hidden sm:block'} clickFunc={() => goToStep(Status.Signup)}>
            Sign Up
          </RoundedButton>
        </div>
      </div >
    </div >
  )
}
