import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'

import BaseLayout from './components/common/BaseLayout'
import AppBaseLayout from './components/app/AppBaseLayout'
import AuthPage from './pages/Auth'
import MyProfilePage from './pages/Profile/MyProfilePage'
import EditMyProfilePage from './pages/Profile/EditMyProfilePage'
import GamerProfilePage from './pages/Profile/GamerProfilePage'
import GamerPage from './pages/GamerPage'
import GuildsPage from './pages/GuildPage'
import GuildProfilePage from './pages/Profile/GuildProfilePage'
import JobPage from './pages/JobPage'
import JobPostPage from './pages/JobPage/JobPostPage'
import JobDashboardPage from './pages/JobPage/JobDashboardPage'
import JobApplicationPage from './pages/JobPage/JobApplicationPage'
import ReviewApplicantsPage from './pages/JobPage/ReviewApplicantsPage'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import ResetRoute from './routes/ResetRoute'

function App() {
  const [loadingView, setLoadingView] = useState(false);
  return (
    <div>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path='/' element={<LandingPage />} />
          <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
        </Route>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/reset' element={<ResetRoute />} />
        <Route element={<AppBaseLayout loadingView={loadingView}/>}>
          <Route path='/myprofile' element={<MyProfilePage setLoadingView={setLoadingView}/>} />
          <Route path='/myprofile/edit' element={<EditMyProfilePage setLoadingView={setLoadingView} />} />
          <Route path='/gamers' element={<GamerPage setLoadingView={setLoadingView} />} />
          <Route path='/gamers/:name' element={<GamerProfilePage setLoadingView={setLoadingView}/>} />
          <Route path='/guilds' element={<GuildsPage setLoadingView={setLoadingView}/>} />
          <Route path='/guilds/:name' element={<GuildProfilePage setLoadingView={setLoadingView}/>} />
          <Route path='/jobs' element={<JobPage setLoadingView={setLoadingView}/>} />
          <Route path='/jobs/proposals' element={<JobApplicationPage setLoadingView={setLoadingView}/>} />
          <Route path='/jobs/review_applicants' element={<ReviewApplicantsPage setLoadingView={setLoadingView}/>} />
          <Route path='/jobs/dashboard' element={<JobDashboardPage setLoadingView={setLoadingView}/>} />
          <Route path='/new-job/create' element={<JobPostPage setLoadingView={setLoadingView}/>} />
        </Route>
      </Routes>
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme='dark'
      />
    </div>
  )
}

export default App
