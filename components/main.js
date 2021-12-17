import Head from 'next/head'
import Link from 'next/link'

export default function Main() {
	return (
		<div className='w-full bg  h-full flex flex-col items-center mt-60'>
			<h1 className='text-6xl text-arvo font-semibold text-center'>Creative work shows us what’s possible. <br /> Help fund it here.</h1>
			<div className="flex justify-center items-center text-white mt-12">
				<Link href='/start'>
					<a className='bg-gray-900 text-white px-3 py-2 rounded-md text-xl font-medium hover:bg-gray-400 hover:text-black mr-12'>Start a Project</a>
				</Link>
				<Link href='/fund'>
					<a className='bg-gray-900 text-white px-3 py-2 rounded-md text-xl font-medium hover:bg-gray-400 hover:text-black'>Fund a Project</a>
				</Link>
			</div>
		</div>
	)
}