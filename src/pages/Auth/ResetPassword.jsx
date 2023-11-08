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

export default function ResetPassword(props) {

  const { isActive, goToStep, setLoadingView, resetToken } = props;
  console.log('resetToken >>> ', resetToken);

  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (isActive) {
      setPasswordError('');
      setConfirmPasswordError('');
    }
  }, [isActive])

  const onChangePassword = e => {
    setPassword(e.target.value);
  }

  const onChangeConfirmPassword = e => {
    setConfirmPassword(e.target.value);
  }

  const clickChangePassword = async () => {
    if (password == '') {
      setPasswordError('Password is required');
      return;
    }

    if (confirmPassword == '') {
      setConfirmPasswordError('Please confirm password');
      return;
    }

    if (password != confirmPassword) {
      toast.warning('Password does not match');
      return;
    }

    setLoadingView(true);
    try {
      const resp = await accountApi.updatePassword(resetToken, password);
      if (resp.status == 'success') {
        setPasswordUpdated(true);
      } else {
        toast.error(resp.message);
      }
    } catch (err) {
      toast.info(err.message);
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
        {passwordUpdated == false && (
          <h2 className='text-primary text-[24px] font-bold grow-0'>Modify your password</h2>
        )}
        {passwordUpdated == false && (
          <h2 className='text-desc text-base mt-2 sm:mt-4 grow-0 px-4 w-full sm:px-12 text-center'>Use a strong password</h2>
        )}

        {passwordUpdated == false && (
          <div className='flex flex-col w-full grow justify-center items-center'>
            <div className='flex flex-col justify-center items-start w-full mt-4 gap-1 sm:px-10 px-2'>
              {/* <h2 className='text-desc text-base mt-2 sm:mt-4 grow-0 px-4 w-full sm:px-12 text-center'>Use a strong password</h2> */}
              <h2 className='text-desc text-base mt-1 px-7'>Password</h2>
              <RoundedInput
                margin={'mt-1'}
                width={'w-full'}
                padding={'px-5 py-2'}
                attrib={'text-sm text-primary bg-transparent text-desc placeholder-gray-300 placeholder-opacity-25 outline-0 pl-2 border-none focus:outline-none focus:ring-0'}
                placeholder={'Password'}
                inputValue={password}
                onChangeInput={onChangePassword}
                type={'password'}>
              </RoundedInput>
              {passwordError != "" && (<h2 className='text-red-500 text-[14px] mt-1 px-7'>{passwordError}</h2>)}
            </div>
            <div className='flex flex-col justify-center items-start w-full mt-4 gap-1 sm:px-10 px-2'>
              {/* <h2 className='text-desc text-base mt-2 sm:mt-4 grow-0 px-4 w-full sm:px-12 text-center'>Use a strong password</h2> */}
              <h2 className='text-desc text-base mt-1 px-7'>Confirm Password</h2>
              <RoundedInput
                margin={'mt-1'}
                width={'w-full'}
                padding={'px-5 py-2'}
                attrib={'text-sm text-primary bg-transparent text-desc placeholder-gray-300 placeholder-opacity-25 outline-0 pl-2 border-none focus:outline-none focus:ring-0'}
                placeholder={'Password'}
                inputValue={confirmPassword}
                onChangeInput={onChangeConfirmPassword}
                type={'password'}>
              </RoundedInput>
              {confirmPasswordError != "" && (<h2 className='text-red-500 text-[14px] mt-1 px-7'>{confirmPasswordError}</h2>)}
            </div>

            <div className='w-full sm:px-10 px-2 mt-4 justify-center items-center flex flex-col gap-2'>
              <RoundedButton width={'w-full'} height={'h-[54px]'} clickFunc={clickChangePassword}>
                Change my password
              </RoundedButton>
            </div>
          </div>
        )}
        {passwordUpdated && (
          <div className='flex flex-col w-full grow justify-center items-center'>
            <RoundedButton padding={'p-2'} width={'w-[48px]'} height={'h-[48px]'} attrib={'pointer-events-none'}>
              <img src={ConfirmIcon}></img>
            </RoundedButton>
            <h2 className='text-primary text-lg text-center mt-4 sm:mt-6 mx-4 sm:mx-12'>Password modified successfully!</h2>
            <div className='w-full sm:px-16 px-8 mt-4 justify-center items-center flex flex-col gap-2'>
              <RoundedButton width={'w-full'} height={'h-[54px]'} clickFunc={() => goToStep(Status.LoginWithEmail)}>
                Sign in
              </RoundedButton>
            </div>
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
