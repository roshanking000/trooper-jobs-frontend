import React, { useState, useEffect, useCallback } from 'react'
import BackIcon from '/icons/backicon.svg'
import TonIcon from '/icons/ton_wallet.png'
import MetaMaskIcon from '/icons/metamask.png'
import RainbowIcon from '/icons/rainbow_wallet.png'
import TrustWalletIcon from '/icons/trust_wallet.png'
import WalletConnectIcon from '/icons/wallet_connect.png'
import RoundedButton from '/src/components/RoundedButton.jsx'

export default function ConnectWallet(props) {
  const { gotoStep, lastSavedStep } = props;
  
  return (
    <div className='flex flex-row'>
      <div className='h-full hidden sm:block'>
        <RoundedButton width={'w-[48px]'} height={'h-[48px]'} clickFunc={() => gotoStep(lastSavedStep)}>
          <span><img src={BackIcon}></img></span>
        </RoundedButton>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-primary text-[24px] font-bold'>Connect your wallet</h2>
        <h2 className='text-primary text-base text-center mt-4 sm:mt-6 mx-8 sm:mx-16'>Connect with one of available wallet providers or create  a new wallet. </h2>
        <div className='flex flex-col mt-6 w-full px-3 sm:px-0 justify-center items-center'>
          {/* <RoundedButton margin={'mt-1'} width={'w-full sm:w-[320px]'} height={'h-[54px]'} justify={'justify-start'} padding={'pl-10'} clickFunc={() => connectWallet('Ton')}>
            <span><img src={TonIcon}></img></span>
            Ton Wallet
          </RoundedButton> */}
          <RoundedButton margin={'mt-1'} width={'w-full sm:w-[320px]'} height={'h-[54px]'} justify={'justify-start'} padding={'pl-10'} clickFunc={() => connectWallet('WalletConnect')}>
            <span><img src={WalletConnectIcon}></img></span>
            Wallet Wallet
          </RoundedButton>
          <RoundedButton margin={'mt-1'} width={'w-full sm:w-[320px]'} height={'h-[54px]'} justify={'justify-start'} padding={'pl-10'} clickFunc={() => connectWallet('Rainbow')}>
            <span><img src={RainbowIcon}></img></span>
            Rainbow wallet
          </RoundedButton>
          <RoundedButton margin={'mt-1'} width={'w-full sm:w-[320px]'} height={'h-[54px]'} justify={'justify-start'} padding={'pl-10'} clickFunc={() => connectWallet('Metamask')}>
            <span><img src={MetaMaskIcon}></img></span>
            Metamask
          </RoundedButton>
          <RoundedButton margin={'mt-1'} width={'w-full sm:w-[320px]'} height={'h-[54px]'} justify={'justify-start'} padding={'pl-10'} clickFunc={() => connectWallet('TrustWallet')}>
            <span><img src={TrustWalletIcon}></img></span>
            Trust wallet
          </RoundedButton>
        </div>
        <div className='flex flex-row mt-8 ml-3 mr-3 sm:mr-0 sm:ml-12'>
          <p className='text-primary text-center w-full sm:w-[348px] sm:mr-10'>
            We do not own your private keys and cannot access your funds without your confirmation.
          </p>
        </div>
      </div>
    </div>

  )
}
