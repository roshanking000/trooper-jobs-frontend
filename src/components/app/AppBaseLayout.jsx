import { Outlet, useNavigate } from 'react-router-dom'

import Header from './Header'
import { useAuth } from '../../hooks/use-auth'
import { useEffect } from 'react';
import { withAuthGuard } from '../../hocs/with-auth-guard';
import LoadingLayout from '/src/components/LoadingLayout'

const AppBaseLayout = (props) => {
  const { loadingView } = props;
  return (
    <>
      {loadingView && <LoadingLayout />}
      <section className="min-h-screen bg-gradient-to-t from-[#1C1C27] to-[#0D0D12]">
        <section className="flex flex-col items-start p-3 xl:px-20 xl:py-8 gap-28 xl:gap-16 font-['Manrope']">
          <Header />
          <main className='w-full'>
            <Outlet />
          </main>
        </section>
      </section>
    </>
  )
}

export default withAuthGuard(AppBaseLayout);
