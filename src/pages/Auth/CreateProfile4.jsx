import React, { useEffect, useState } from 'react'
import BackIcon from '/icons/backicon.svg'
import RoundedButton from '/src/components/RoundedButton.jsx'
import SpecialityTagInput from '/src/components/SpecialityTagInput';
import { toast } from 'react-toastify'
import { UserType } from '../../Global';

const Presets = [
  [
    'Full stack Dev', 'Copywriter', 'Marketing', 'Beta tester', 'Gaming coach', 'VR trainer', 'Sniper'
  ],
  [
    'Art', 'Collector', 'Social goods', 'Protocol', 'Investments', 'Grants', 'Media', 'Development', 'Education', 'Metaverse', 'PTE'
  ],
  [
    'IT', 'Development', 'Media', 'Marketing', 'Real estate', 'IP management', 'Incubator', 'Game studio', 'Hospitality', 'Medical', 'Manufactures'
  ],
  [
    'E-Learning', 'Simulation', 'School', 'University', 'Courses', 'Teacher/Professor', 'Gamified learning', 'Learn and Earn', 'VR training'
  ]
]

export default function CreateProfile4(props) {

  const { isActive, nextStep, previousStep, tags, setTags, createProfile, userType } = props;

  const [curPreset, setCurPreset] = useState([]);
  const clickCreateProfile = async () => {
    if (!Array.isArray(tags)) {
      console.log('tags should be array');
      return;
    }
    if (tags.length < 3) {
      toast.warning('Please select at least 3 specialties');
      return;
    }
    await createProfile();
  }

  useEffect(() => {
    setCurPreset(Presets[userType]);
  }, [userType]);

  return (
    <div className='flex flex-row sm:h-[516px]'>
      <div className='h-full hidden sm:block mr-10 items-start'>
        <RoundedButton width={'w-[48px]'} height={'h-[48px]'} clickFunc={previousStep}>
          <span><img src={BackIcon}></img></span>
        </RoundedButton>
      </div>
      <div className='flex flex-col items-start justify-center px-5 sm:px-0 h-full'>
        <h2 className='text-primary text-[24px] font-bold flex-none'>Create your profile</h2>
        <h2 className='text-desc text-base mt-2 sm:mt-4 flex-none'>Almost done! <br/>
          One last step, what are your unique skills?
        </h2>
        <h2 className='text-desc text-base mt-2 sm:mt-4 flex-none ml-3'>Your specialties</h2>
        <h2 className='text-desc text-sm mt-2 flex-none ml-3'>Write at least 3 specialties. {userType == UserType.Gamer ? 'Your specialties will help to filter your profile.' : 'Your specialties will help to filter your profile.'}</h2>
        <SpecialityTagInput tags={tags} setTags={setTags} type="speciality" userType={userType} presets={curPreset} offsetinput={'pl-4'} setCurPreset={setCurPreset}/>
        <RoundedButton width={'w-full'} height={'h-[54px]'} attrib={'flex-none mt-8 sm:mt-4'} clickFunc={clickCreateProfile}>
          Create my profile
        </RoundedButton>
      </div>
    </div >
  )
}
