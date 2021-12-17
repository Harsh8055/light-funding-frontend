import Head from 'next/head'

import Navbar from '../components/navbar'
import Main from '../components/main'

export const CONTRACT_ADDRESS = '0x6E4EC75096C050Cda0467fD9DC0D35496538b019'

export default function Home() {
  return (
    <div className=' bg-cover bg custom-img bg-fixed'>
      <Head>
        <title>Crowdfunding</title>
      </Head>
      <div className='w-full h-screen'>
        <Navbar></Navbar>
        <Main></Main>
      </div>
    </div>
  )
}
