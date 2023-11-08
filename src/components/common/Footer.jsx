import { Link } from 'react-router-dom'

import trooperLogo from '/imgs/logo/trooper_logo.svg'

const Footer = () => {
  return (
    <>
      <section className="flex flex-row justify-between items-center px-2 lg:px-16 gap-8 h-[80px] bg-secondary">
        <Link className='flex items-center' onClick={() => {
          window.location.replace("/#home");
        }}>
          <img
            src={trooperLogo}
            className='h-6 lg:w-41 lg:h-12'
          />
        </Link>
        <h1 className='text-sm lg:text-base font-normal text-normal'>© {new Date().getFullYear()} Trooper. All rights reserved.</h1>
      </section>
    </>
  )
}

export default Footer