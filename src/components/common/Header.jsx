import { useState, Fragment, useEffect } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { Link, useNavigate } from 'react-router-dom'

import trooperLogo from '/imgs/logo/trooper_logo.svg'
import alarmImg from '/imgs/app/header/alarm.png'
import profileImg from '/imgs/app/header/profile.png'

import { Status } from '../../Global'
import { useAuth } from '../../hooks/use-auth'

const Header = () => {
  const navigate = useNavigate();

  const { isAuthenticated, account, signOut } = useAuth();

  const signIn = () => {
    navigate('/auth', { state: { target: Status.Signin } })
  }
  const signUp = () => {
    navigate('/auth', { state: { target: Status.Signup } })
  }
  return (
    <header className="z-50 sticky top-0 w-full font-['Manrope'] flex flex-row justify-between items-center bg-primary border-b-primary border-b-[0.5px] px-1 lg:px-16">
      <Link className='flex items-center py-4' onClick={() => {
        window.location.replace("/#home");
      }}
      >
        <img
          src={trooperLogo}
          className='h-6 lg:w-41 lg:h-12'
        />
      </Link>
      <div className='hidden xl:flex gap-10 py-5'>
        <ul className='flex gap-14 font-normal text-base leading-20px items-center'>
          <li className='text-menu hover:text-secondary cursor-pointer hover:text-accent'>
            <Link onClick={() => {
              window.location.replace("/#home");
            }}>
              <span>Home</span>
            </Link>
          </li>
          <li className='text-menu hover:text-secondary cursor-pointer hover:text-accent'>
            <Link onClick={() => {
              window.location.replace("/#features");
            }}>
              <span>Features</span>
            </Link>
          </li>
          <li className='text-menu hover:text-secondary cursor-pointer hover:text-accent'>
            <Link onClick={() => {
              window.location.replace("/#roadmap");
            }}>
              <span>Roadmap</span>
            </Link>
          </li>
          <li className='text-menu hover:text-secondary cursor-pointer hover:text-accent'>
            <Link onClick={() => {
              window.location.replace("/#team");
            }}>
              <span>The Team</span>
            </Link>
          </li>
          <li className='text-menu hover:text-secondary cursor-pointer hover:text-accent'>
            <a href='https://linktr.ee/trooperjobs' target='_blank'>
              <span>Documentation</span>
            </a>
          </li>
        </ul>
      </div>
      {
        isAuthenticated == false ? (
          <section className='flex flex-row items-center justify-between gap-1 lg:gap-3'>
            <button className='text-center hover:bg-button-primary text-xs lg:text-sm text-primary hover:border-2 hover:border-secondary hover:drop-shadow-md rounded-full w-[60px] lg:w-[107px] h-[32px] lg:h-[46px] hover:bg-hover' onClick={signIn}>
              Sign in
            </button>
            <button className='text-center hover:bg-button-primary text-xs lg:text-sm text-primary hover:border-2 hover:border-secondary rounded-full w-[60px] lg:w-[107px] h-[32px] lg:h-[46px] hover:bg-hover' onClick={signUp}>
              Sign up
            </button>
          </section>
        ) : (
          <div className='flex flex-row items-center gap-4'>
            <img className='cursor-pointer w-6 xl:w-8' src={alarmImg} />
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className='focus:outline-none focus-visible:ring-0 focus-visible:ring-white focus-visible:ring-opacity-75'
                  >
                    <img className='w-12 xl:w-16 border border-primary rounded-full cursor-pointer' src={profileImg} />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="flex flex-col gap-2 absolute right-0 z-10 py-2 bg-primary border border-primary rounded-md w-36">
                      <span className='text-base font-semibold cursor-pointer text-secondary-hover px-4'>{account.username}</span>
                      <div className='border border-primary mb-2'></div>
                      <Popover.Overlay>
                        <span className='text-base font-semibold text-normal cursor-pointer hover:text-secondary-hover px-4' onClick={() => {
                          navigate("/myprofile")
                        }}>My profile</span>
                      </Popover.Overlay>
                      <Popover.Overlay>
                        <span className='text-base font-semibold text-normal cursor-pointer hover:text-secondary-hover px-4' onClick={async () => await signOut()}>Sign out</span>
                      </Popover.Overlay>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        )
      }
      <div className='lg:hidden'>
        <Menu as="div" className="relative inline-block text-left bg-accent !z-50">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-8 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='white'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect x='2' y='4' width='14' height='2'></rect>
                <rect x='2' y='11' width='20' height='2'></rect>
                <rect x='8' y='18' width='14' height='2'></rect>
              </svg>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-primary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link to="/" className="text-menu hover:text-secondary cursor-pointer hover:text-accent group flex w-full items-center rounded-md px-2 py-2 text-sm"
                      onClick={() => {
                        window.location.replace("/#home");
                      }}
                    >
                      Home
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link className="text-menu hover:text-secondary cursor-pointer hover:text-accent group flex w-full items-center rounded-md px-2 py-2 text-sm"
                      onClick={() => {
                        window.location.replace("/#features");
                      }}
                    >
                      Features
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link className="text-menu hover:text-secondary cursor-pointer hover:text-accent group flex w-full items-center rounded-md px-2 py-2 text-sm"
                      onClick={() => {
                        window.location.replace("/#roadmap");
                      }}
                    >
                      Roadmap
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link className="text-menu hover:text-secondary cursor-pointer hover:text-accent group flex w-full items-center rounded-md px-2 py-2 text-sm"
                      onClick={() => {
                        window.location.replace("/#team");
                      }}
                    >
                      The Team
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a href='https://linktr.ee/trooperjobs' target='_blank' className="text-menu hover:text-secondary cursor-pointer hover:text-accent group flex w-full items-center rounded-md px-2 py-2 text-sm">
                      Documentation
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  )
}

export default Header
