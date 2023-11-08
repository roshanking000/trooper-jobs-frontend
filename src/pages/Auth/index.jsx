import React, { useState, useRef, useEffect } from 'react'
import trooperLogo from '/imgs/logo/trooper_logo.svg'
import profile from '/imgs/logo/profile.svg'
import RoundProfile from '/imgs/logo/round_profile.svg'
import MaskGroup from '/imgs/common/mask_group.svg'
import RoundedButton from '../../components/RoundedButton'
import Signup from './Signup'
import SignIn from './SignIn'
import ConnectWallet from './ConnectWallet'
import ConfirmWallet from './ConfirmWallet'
import LoginWithEmail from './LoginWithEmail'
import AccountCreated from './AccountCreated'
import CreateProfile1 from './CreateProfile1'
import CreateProfile2 from './CreateProfile2'
import CreateProfile3 from './CreateProfile3'
import CreateProfile4 from './CreateProfile4'
import CreateWithEmail from './CreateWithEmail'
import { Status, UserType, WalletType } from '/src/Global'
import BackIcon from '/icons/backicon.svg'
import StepWizard from 'react-step-wizard'
import './animate.custom.css';
import { useLocation, useNavigate } from 'react-router-dom'
import LoadingLayout from '/src/components/LoadingLayout'
import { accountApi } from '../../api/account'
import { commonApi } from '../../api/common'
import { generateEIP4361MessageBody, getProfileTypeString } from '../../utils'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
  connectorsForWallets
} from '@rainbow-me/rainbowkit';

import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  trustWallet,
  coinbaseWallet,
  phantomWallet
} from '@rainbow-me/rainbowkit/wallets';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
// import { SiweMessage } from 'siwe';
import { SERVER_API_URL } from '/src/api/config'
import { toast } from 'react-toastify'
import { useAuth } from '../../hooks/use-auth'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'

const AuthPage = () => {

  const { signIn } = useAuth();
  const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID
  const { chains, publicClient } = configureChains(
    [polygon],
    [
      alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_ID }),
      publicProvider()
    ]
  );

  // const { connectors } = getDefaultWallets({
  //   appName: import.meta.env.VITE_WALLETCONNECT_PROJECT_NAME,
  //   projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  //   chains
  // });

  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet({ projectId, chains }),
        walletConnectWallet({ projectId, chains }),
        rainbowWallet({ projectId, chains }),
        trustWallet({ projectId, chains })
      ],
    },
    {
      groupName: 'Others',
      wallets: [
        coinbaseWallet({ chains, appName: import.meta.env.VITE_WALLETCONNECT_PROJECT_NAME }),
        phantomWallet({ chains })
      ]
    }
  ]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })

  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      // setAuthStatus('loading');
      const response = await fetch(`${SERVER_API_URL}/nonce`);
      return await response.text();
    },

    createMessage: ({ nonce, address, chainId }) => {
      // const msg = new SiweMessage({
      //   domain: window.location.host,
      //   address,
      //   statement: 'Only sign this message if you fully understand the content and trust the requesting site',
      //   uri: window.location.origin,
      //   version: '1',
      //   chainId,
      //   nonce,
      // });
      const msg = {
        domain: window.location.host,
        address,
        statement: 'Only sign this message if you fully understand the content and trust the requesting site',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      };
      return msg;
    },

    getMessageBody: ({ message }) => {
      const msgBody = generateEIP4361MessageBody(message);
      return msgBody;
    },

    verify: async ({ message, signature }) => {
      const verifyRes = await fetch(`${SERVER_API_URL}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, signature }),
      });
      setAuthStatus(verifyRes.ok == true ? 'authenticated' : 'unauthenticated');
      return Boolean(verifyRes.ok);
    },

    signOut: async () => {
      setAuthStatus('unauthenticated');
      await fetch(`${SERVER_API_URL}/logout`);
    },
  });

  const [selectedFile, setSelectedFile] = useState(undefined);
  const [authStatus, setAuthStatus] = useState('unauthenticated');
  const [curStep, setCurStep] = useState(Status.Signup);
  const [lastSavedStep, setlastSavedStep] = useState(Status.Signup);
  const [accountCreated, setAccountCreated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [loadingView, setLoadingView] = useState(false);
  const [userBasicInfo, setUserBasicInfo] = useState({
    email: '',
    name: '',
    picture: '',
    wallet: '',
    injector: '',
    password: '',
  });
  const [walletAddress, setWalletAddress] = useState('');
  const [userType, setUserType] = useState(UserType.Gamer);
  const [userInfo, setUserInfo] = useState({
    username: '',
    avatar: ''
  });
  const [userDetail, setUserDetail] = useState({
    name: '',
    surname: '',
    desc: '',
  });
  const [userSpecialities, setUserSpeciality] = useState([]);
  const [walletType, setWalletType] = useState(WalletType.Unknown);

  const [state, updateState] = useState({
    form: {},
    transitions: {
      enterRight: 'animated fadeInRight',
      enterLeft: 'animated fadeInLeft',
      exitRight: 'animated fadeOutRight',
      exitLeft: 'animated fadeOutLeft',
    },
  });

  const [resetToken, setResetToken] = useState(null);

  const onStepChange = (stats) => {
    if (stats.previousStep == Status.Signin || stats.previousStep == Status.Signup)
      setlastSavedStep(stats.previousStep);
    setCurStep(stats.activeStep);
  }

  const setInstance = SW => updateState({
    ...state,
    SW,
  });

  const { SW } = state;

  const onSetStatus = (status) => {
    SW.goToStep(status);
  }

  useEffect(() => {
    if (SW !== undefined) {
      if (location.state && location.state.target) {
        const target = location.state.target;
        if (target == Status.ResetPassword) {
          setResetToken(location.state.token);
          SW.goToStep(target);
        } else {
          SW.goToStep(target);
        }
      } else {
        SW.goToStep(Status.Signup);
      }
    }
  }, [location, SW]);

  const createProfile = async () => {
    setLoadingView(true);
    try {
      let avatarURL = "";
      if (selectedFile != undefined) {
        try {
          const formData = new FormData();
          formData.append("avatar", selectedFile);
          const payload = await commonApi.uploadFile(formData);
          console.log('payload >>> ', payload);
          avatarURL = payload.filename;
        } catch (err) {
          console.log("Error >>> ", err);
          avatarURL = "";
        }
      } else {
        if (userBasicInfo.picture != "") {
          avatarURL = userBasicInfo.picture;
        } else {
          avatarURL = "";
        }
      }

      const response = await accountApi.createAccount({
        username: userInfo.username,
        profile_type: getProfileTypeString(userType),
        email: userBasicInfo.email,
        password: userBasicInfo.password,
        avatar_file: avatarURL,
        wallet: userBasicInfo.wallet,
        injector: userBasicInfo.injector,
        name: userDetail.name,
        surname: userDetail.surname,
        short_description: userDetail.desc,
        roles: userSpecialities.map(obj => obj.text).join(",")
      });
      if (response.status == 'success') {
        //console.log('account_id >>> ', response.account_id);
        await signIn(response.token);
        onSetStatus(Status.AccountCreated);
      }
    } catch (err) {
      console.log('CreateProfile Error >>>', err);
      toast.error(err);
    }
    setLoadingView(false);
  }

  const clickBackButton = () => {
    switch (curStep) {
      case Status.ConnectWallet:
        onSetStatus(lastSavedStep);
        break;
      case Status.ConfirmWallet:
        break;
      case Status.CreateWithEmail:
        onSetStatus(Status.Signup);
        break;
      case Status.LoginWithEmail:
        onSetStatus(Status.Signin);
        break;
      case Status.ForgotPassword:
      case Status.ResetPassword:
        onSetStatus(Status.LoginWithEmail);
        break;
    }
  }

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitAuthenticationProvider
        adapter={authenticationAdapter}
        status={authStatus}>
        <RainbowKitProvider chains={chains} modalSize='compact' theme={darkTheme()}>
          <div className='bg-gradient-to-b from-[#1C1C27] to-[#0D0D12] h-screen w-screen relative'>
            {loadingView && <LoadingLayout />}
            <div className='w-full h-full inset-0 justify-center absolute z-0'>
              <div className='w-4/6 h-70 left-0 right-0 mx-auto absolute mt-12 hidden sm:block'>
                <img
                  src={MaskGroup}
                />
              </div>
              <img
                src={MaskGroup}
                className='w-full h-full sm:hidden absolute object-cover'
              />
            </div>

            <img
              src={trooperLogo}
              className='w-41 h-12 left-2 top-4 sm:top-2 absolute cursor-pointer'
              onClick={() => navigate('/')}
            />

            {curStep == Status.Signup && (
              <RoundedButton width={'w-[85px]'} height={'h-[38px]'} attrib={'right-2 top-4 absolute sm:hidden'} clickFunc={() => onSetStatus(Status.Signin)}>
                Sign in
              </RoundedButton>
            )}

            {curStep == Status.Signin && (
              <RoundedButton width={'w-[85px]'} height={'h-[38px]'} attrib={'right-2 top-4 absolute sm:hidden'} clickFunc={() => onSetStatus(Status.Signup)}>
                Sign up
              </RoundedButton>
            )}

            {SW != undefined && (
              curStep == Status.ConnectWallet || 
              curStep == Status.ConfirmWallet || 
              curStep == Status.CreateWithEmail || 
              curStep == Status.LoginWithEmail || 
              curStep == Status.ForgotPassword ||
              curStep == Status.ResetPassword) && (
              <RoundedButton padding={'p-3 sm:p-4'} attrib={'right-2 top-4 absolute sm:hidden'} clickFunc={clickBackButton}>
                <span><img src={BackIcon} className='w-[16px]'></img></span>
              </RoundedButton>
            )}

            <div className='min-minus-5rem h-fit sm:min-h-[560px] sm:h-[560px] inset-0 flex sm:items-center sm:justify-center absolute w-full sm:w-auto px-2 sm:px-0 mt-20 sm:mt-0 sm:top-1/2 sm:transform sm:-translate-y-1/2'>
              <div className='rounded-3xl bg-[#1A1A23] flex flex-col sm:flex-row sm:h-full w-full sm:w-auto'>
                <div className='sm:items-end flex w-full sm:w-auto items-center justify-center sm:justify-start'>
                  <img
                    src={profile}
                    className='w-[500px] h-auto hidden sm:block aspect-square'
                  />
                  <img
                    src={RoundProfile}
                    className='w-[240px] h-[240px] block sm:hidden aspect-square'
                  />
                </div>
                <div className='w-full sm:w-[500px] pt-5 mr-10 mb-6 h-full sm:h-auto'>
                  <StepWizard
                    onStepChange={onStepChange}
                    transitions={state.transitions}
                    instance={setInstance}
                  >
                    <Signup setLoadingView={setLoadingView} userBasicInfo={userBasicInfo} setUserBasicInfo={setUserBasicInfo} authStatus={authStatus} />
                    <SignIn setLoadingView={setLoadingView} userBasicInfo={userBasicInfo} setUserBasicInfo={setUserBasicInfo} authStatus={authStatus} />
                    <CreateWithEmail setLoadingView={setLoadingView} userBasicInfo={userBasicInfo} setUserBasicInfo={setUserBasicInfo} />
                    <LoginWithEmail setLoadingView={setLoadingView} userBasicInfo={userBasicInfo} setUserBasicInfo={setUserBasicInfo} />
                    <ConnectWallet lastSavedStep={lastSavedStep} setLoadingView={setLoadingView} setWalletType={setWalletType} />
                    <ConfirmWallet setLoadingView={setLoadingView} setWalletAddress={setWalletAddress} />
                    <ForgotPassword setLoadingView={setLoadingView} />
                    <ResetPassword setLoadingView={setLoadingView} resetToken={resetToken}/>
                    <CreateProfile1 setLoadingView={setLoadingView} userType={userType} setUserType={setUserType} />
                    <CreateProfile2 setLoadingView={setLoadingView} userBasicInfo={userBasicInfo} setUserInfo={setUserInfo} setSelectedFile={setSelectedFile} />
                    <CreateProfile3 setLoadingView={setLoadingView} userDetail={userDetail} setUserDetail={setUserDetail} userBasicInfo={userBasicInfo} />
                    <CreateProfile4 setLoadingView={setLoadingView} userType={userType} setUserSpeciality={setUserSpeciality} createProfile={createProfile} tags={userSpecialities} setTags={setUserSpeciality} />
                    <AccountCreated setLoadingView={setLoadingView} />
                  </StepWizard>
                </div>
              </div>
            </div>
          </div>
        </RainbowKitProvider>
      </RainbowKitAuthenticationProvider>
    </WagmiConfig>
  )
}

export default AuthPage