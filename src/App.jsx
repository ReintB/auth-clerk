import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

function Home() {
  return (
    <>
    <NavBarHome />
    <TemplateAll page='Home'/>
    </>
  )
}

function Dashboard() {
  return (
    <>
    <div className='bg-slate-800 h-screen flex items-center justify-center text-white text-2xl'>
      <div className='absolute right-0 top-0 p-5'>
        <UserButton afterSignOutUrl='/' />
      </div>
      <h1>Hello | Dashboard</h1>
    </div>
    </>
  )
}

function TemplateAll({page}) {
  return (
    <div className='bg-slate-800 h-screen flex item-center justify-center text-white text-2xl'>
      <h1>{page}</h1>
    </div>
  )
}

function NavBarHome() {
  const navigate = useNavigate()
  return (
    <div className='bg-slate-800 flex justify-between text-white p-5'>
      <h1 className='text-2xl'>Logo</h1>
      <a href="/signin">Sign In</a>
    </div>
  )
}

function ClerkProviderWithRoutes() {
  const navigate = useNavigate()
  return(
    <ClerkProvider publishableKey='pk_test_bWF0dXJlLXF1YWlsLTU3LmNsZXJrLmFjY291bnRzLmRldiQ' navigate={(to) => navigate(to)}>
      <Routes>
      <Route path='/' element={<Home />}/>

      <Route path='/signin/*' element={
        <>
        <div className='bg-slate-800 h-screen flex items-center justify-center text-white flex-col'>
          <SignIn routing='path' path='/signin' signUpUrl='/signup' afterSignInUrl='dashboard'/>
          <a href="/" className='mt-5 bg-slate-600 p-3 rounded-md'>Back To Home</a>
        </div>
        </>
      }/>

      <Route path='/signup/*' element={
        <>
        <div className='bg-slate-800 h-screen flex items-center justify-center text-white flex-col'>
          <SignUp routing='path' path='/signup' signInUrl='/signin' afterSignUpUrl='dashboard'/>
          <a href="/" className='mt-5 bg-slate-600 p-3 rounded-md'>Back To Home</a>
        </div>
        </>
      }/>

      <Route path='/dashboard' element={
        <>
        <SignedIn>
          <Dashboard />
        </SignedIn>
        <SignedOut>
          <Navigate to='/signin'/>
        </SignedOut>
        </>
      }/>
    </Routes>
    </ClerkProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  )
}