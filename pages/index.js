import Head from 'next/head'

import Navbar from '../components/navbar'
import Main from '../components/main'
import Footer from '../components/footer'

export const CONTRACT_ADDRESS = '0xfA7637B96ed7e3580215504e55519feF0bC95e57'

export default function Home() {
  return (
    <div className='bg-cover bg custom-img bg-fixed'>
      <Head>
        <title>Crowdfunding</title>
      </Head>
      <div className='w-full h-screen'>
        <Navbar></Navbar>
        <Main></Main>
      </div>
        <Footer></Footer>
    </div>
  )
}
