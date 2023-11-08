import zeroFees from '/imgs/landing/zero-fees.svg'
import onChainTrackRecord from '/imgs/landing/on-chain-track-record.svg'
import improvedWeb3Experience from '/imgs/landing/improved-web3-experience.svg'
import defiEscrow from '/imgs/landing/defi-escrow.svg'
import nftAsCV from '/imgs/landing/nft-as-cv.svg'
import tokenizedData from '/imgs/landing/tokenized-data.svg'

const Introducing = () => {
  return (
    <section id="features" className="flex flex-col items-center justify-center gap-16 px-4 lg:px-[96px] py-12 lg:py-[128px] bg-mandatory">
      <div className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-base bg-clip-text text-transparent bg-gradient-to-r from-[#F36890] to-[#515fff]">Introducing Trooper</h1>
        <h1 className="text-2xl lg:text-5xl font-bold text-primary">Unlock the best job experience</h1>
        <h1 className="text-sm lg:text-xl text-normal font-medium">
          Join us in revolutionizing the VR/AR job landscape. <br/>
          Experience a range of incredible benefits that will elevate your job career to new heights
        </h1>
      </div>
      <div className="hidden lg:flex flex-row items-stretch gap-8 w-[80%]">
        <div className="flex flex-col justify-start gap-4 p-3 w-1/3 bg-primary rounded-2xl">
          <img className='p-3 w-14 border border-primary rounded-full bg-primary' src={zeroFees} />
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-bold text-primary'>ZERO fees</h1>
            <h1 className='text-base text-normal font-medium'>Trooper's solution includes zero fees while matching or engaging with other parties</h1>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-4 p-3 w-1/3 bg-primary rounded-2xl">
          <img className='p-3 w-14 border border-primary rounded-full bg-primary' src={onChainTrackRecord} />
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-bold text-primary'>On-chain track record</h1>
            <h1 className='text-base text-normal font-medium'>A window to show online track record and build reputation, secured by blockchain immutability</h1>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-4 p-3 w-1/3 bg-primary rounded-2xl">
          <img className='p-3 w-14 border border-primary rounded-full bg-primary' src={improvedWeb3Experience} />
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-bold text-primary'>Improved web3 experience</h1>
            <h1 className='text-base text-normal font-medium'>A full adapted profile in an easy and secure environment</h1>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-row items-stretch gap-8 w-[80%]">
        <div className="flex flex-col justify-start gap-4 p-3 w-1/3 bg-primary rounded-2xl">
          <img className='p-3 w-14 border border-primary rounded-full bg-primary' src={defiEscrow} />
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-bold text-primary'>Defi Escrow</h1>
            <h1 className='text-base text-normal font-medium'>Prizes and profits are locked into low-risk Defi protocols, such as Aave, Curve, YFI, in the form of stablecoins</h1>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-4 p-3 w-1/3 bg-primary rounded-2xl">
          <img className='p-3 w-14 border border-primary rounded-full bg-primary' src={nftAsCV} />
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-bold text-primary'>NFT as CV</h1>
            <h1 className='text-base text-normal font-medium'>NFT's hold immutable track records such as degrees, hiring rates, reviews and honorable mentions</h1>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-4 p-3 w-1/3 bg-primary rounded-2xl">
          <img className='p-3 w-14 border border-primary rounded-full bg-primary' src={tokenizedData} />
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-bold text-primary'>Tokenized DATA</h1>
            <h1 className='text-base text-normal font-medium'>Tokenized and accesisible data, a new income stream for Trooper members</h1>
          </div>
        </div>
      </div>
      <div className="flex lg:hidden flex-col items-stretch gap-8 w-[90%]">
        <div className="flex flex-col justify-start gap-4 p-3 mx-auto bg-primary rounded-2xl">
          <img className='p-3 w-16 border border-primary rounded-full bg-primary' src={zeroFees} />
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-bold text-primary'>ZERO fees</h1>
            <h1 className='text-base text-normal font-medium'>Trooper's solution includes zero fees while matching or engaging with other parties</h1>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-4 p-3 mx-auto bg-primary rounded-2xl">
          <img className='p-3 w-16 border border-primary rounded-full bg-primary' src={onChainTrackRecord} />
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-bold text-primary'>On-chain track record</h1>
            <h1 className='text-base text-normal font-medium'>A window to show online track record and build reputation, secured by blockchain immutability</h1>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-4 p-3 mx-auto bg-primary rounded-2xl">
          <img className='p-3 w-16 border border-primary rounded-full bg-primary' src={improvedWeb3Experience} />
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-bold text-primary'>Improved web3 experience</h1>
            <h1 className='text-base text-normal font-medium'>A full adapted profile in an easy and secure environment</h1>
          </div>
        </div>
      </div>
      <div className="flex lg:hidden flex-col items-stretch gap-8 w-[90%]">
        <div className="flex flex-col justify-start gap-4 p-3 mx-auto bg-primary rounded-2xl">
          <img className='p-3 w-16 border border-primary rounded-full bg-primary' src={defiEscrow} />
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-bold text-primary'>Defi Escrow</h1>
            <h1 className='text-base text-normal font-medium'>Prizes and profits are locked into low-risk Defi protocols, such as Aave, Curve, YFI, in the form of stablecoins</h1>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-4 p-3 mx-auto bg-primary rounded-2xl">
          <img className='p-3 w-16 border border-primary rounded-full bg-primary' src={nftAsCV} />
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-bold text-primary'>NFT as CV</h1>
            <h1 className='text-base text-normal font-medium'>NFT's hold immutable track records such as degrees, hiring rates, reviews and honorable mentions</h1>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-4 p-3 mx-auto bg-primary rounded-2xl">
          <img className='p-3 w-16 border border-primary rounded-full bg-primary' src={tokenizedData} />
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-bold text-primary'>Tokenized DATA</h1>
            <h1 className='text-base text-normal font-medium'>Tokenized and accesisible data, a new income stream for Trooper members</h1>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Introducing