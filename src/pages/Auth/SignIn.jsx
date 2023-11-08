import React, { useState, useCallback, useEffect } from 'react'
import GoogleIcon from '/icons/google.svg'
import FacebookIcon from '/icons/facebook.svg'
import InstagramIcon from '/icons/instagram.svg'
import LinkedinIcon from '/icons/linkedin.svg'
import RoundedButton from '/src/components/RoundedButton.jsx'
import RoundedDiv from '/src/components/RoundedDiv.jsx'
import { Status, UserType } from '/src/Global'
import { useGoogleLogin } from '@react-oauth/google'
import { accountApi } from '/src/api/account'
import { toast } from 'react-toastify'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link, useNavigate } from 'react-router-dom'
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAuth } from '../../hooks/use-auth'

export default function SignIn(props) {
  const { setLoadingView, authStatus, goToStep, isActive, userBasicInfo } = props;

  const [activeConnector, setActiveConnector] = useState();
  const { signIn } = useAuth();

  const navigate = useNavigate();

  const onDisconnect = async () => {
    if (isActive) {
      console.log('onDisconnect >>> ');
    }
  };

  const onConnect = async ({ address, isReconnected, connector }) => {
    if (isActive) {
      console.log('onConnect >>> ', address, connector);
      setActiveConnector(connector);
    }
  }

  const { address, isConnected, connector, isConnecting, isReconnecting } = useAccount({ onConnect, onDisconnect });

  useEffect(() => {
    if (isActive) {
      console.log('activeConnector >>> ', activeConnector);
      if (authStatus == 'authenticated') {
        signinWithWallet();
      }
    }

  }, [authStatus])

  const signupWithLinkedin = () => {
    toast.info('Coming soon');
  }

  const signinWithEmail = () => {
    goToStep(Status.LoginWithEmail);
  }

  const signInWithGoogle = useGoogleLogin({
    onSuccess: async codeResponse => {
      console.log('codeResponse >>> ', codeResponse)
      setLoadingView(true);
      try {
        const response = await accountApi.processWithGoogle(codeResponse.access_token);
        if (response.processResult.status == 'success') {
          await signIn(response.processResult.token);
          navigate('/jobs');
        } else if (response.processResult.status == 'token_info') {
          toast.info('No freelancer or company for this google. Please sign up first');
          // // No user, so return token info
          // setUserBasicInfo({
          //   name: response.processResult.token_info.name,
          //   email: response.processResult.token_info.email,
          //   picture: response.processResult.token_info.picture
          // })
          // goToStep(Status.CreateProfile1);
        }
      } catch (err) {
        console.log('Error >>>', err);
        toast.error('Continue with Google Failed');
      }
      setLoadingView(false);
    },
    onError: () => {
      console.log('Login failed');
    },
  });

  const signinWithWallet = useCallback(async () => {
    setLoadingView(true);
    try {
      const response = await accountApi.processWithWallet(address, activeConnector.name);
      console.log('signinWithWallet >>> ', response);
      if (response.processResult.status == 'success') {
        navigate('/jobs');
        await signIn(response.processResult.token);
      } else {
        toast.info('No freelancer or company for this wallet. Please sign up first');
      }
    } catch (err) {
      console.log('Error >>>', err);
      toast.error('Continue with Wallet Failed');
    }
    setLoadingView(false);
  }, [activeConnector]);

  const { openConnectModal } = useConnectModal();

  const clickContinueWithWallet = () => {
    if (authStatus == 'authenticated' && isActive) {
      signinWithWallet();
      return;
    }
    openConnectModal();
  }

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-primary text-[40px] font-bold'>Hello again</h2>
      <h2 className='text-primary text-base text-center mt-6 sm:mt-10 mx-2 sm:mx-auto'>
        Join a passionate community and <br/>
        turn your hobby into a lucrative activity.
      </h2>
      <div className='flex flex-col mt-6 w-full px-3 sm:px-0 justify-center items-center'>
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            return (
              <RoundedButton width={'w-full sm:w-[384px]'} height={'h-[54px]'} clickFunc={clickContinueWithWallet}>
                Continue with Wallet
              </RoundedButton>
            )
          }}
        </ConnectButton.Custom>
        <RoundedButton margin={'mt-1'} width={'w-full sm:w-[384px]'} height={'h-[54px]'} clickFunc={signinWithEmail}>
          Continue with Email
        </RoundedButton>
        <RoundedButton margin={'mt-1'} width={'w-full sm:w-[384px]'} height={'h-[54px]'} clickFunc={signInWithGoogle}>
          <span><img src={GoogleIcon}></img></span>
          Continue with Google
        </RoundedButton>
      </div>
      <h2 className='text-primary text-base font-bold mt-2 mb-2'>or</h2>
      <div className='flex flex-row gap-2'>
        <RoundedButton padding={'p-3'} clickFunc={signupWithLinkedin}>
          <span><img src={LinkedinIcon}></img></span>
        </RoundedButton>
        {/* <RoundedButton padding={'p-3'}>
          <span><img src={InstagramIcon}></img></span>
        </RoundedButton>
        <RoundedButton padding={'p-3'}>
          <span><img src={FacebookIcon}></img></span>
        </RoundedButton> */}
      </div>
      <div className='flex flex-row mt-8 ml-3 mr-3 sm:mr-0 sm:ml-12'>
        <p className='text-primary text-center w-full sm:w-[348px] sm:mr-10'>
          By signing in, you agree to the&nbsp;
          <Link to="/privacy-policy">
            <span className='text-small underline underline-offset-1'>Terms of Service</span>
          </Link>
          &nbsp;and Data Processing Agreement.
        </p>
        <RoundedButton width={'w-[85px]'} height={'h-[38px]'} attrib={'hidden sm:block'} clickFunc={() => goToStep(Status.Signup)}>
          Sign up
        </RoundedButton>
      </div>
    </div>
  )
}
