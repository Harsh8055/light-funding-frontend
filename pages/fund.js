import Head from 'next/head'
import Link from 'next/link'

import { useState } from 'react'

import Navbar from '../components/navbar'
import MyModal from '../components/modal'
import FAQ from '../components/faq'
import Footer from '../components/footer'

export default function Home() {
	let [isOpen, setIsOpen] = useState(false)

	return (
		<div>
			<Head>
				<title>Fund - Crowdfunding</title>
			</Head>
			<div className='w-full h-full'>
				<Navbar></Navbar>
				<div className="w-full h-screen flex flex-col justify-center items-center">
					<h1 className='text-4xl font-bold mb-5'>Find a Project and fund them in ETH&nbsp;&nbsp;&nbsp;</h1>
					<Link href='#'>
						<a onClick={() => setIsOpen(true)} className='bg-gray-900 text-white px-3 py-2 rounded-md text-xl font-medium hover:bg-gray-400 hover:text-black mr-12'>Find a Project</a>
					</Link>
				</div>
				<div className="w-full h-full bg-gray-400 flex justify-start items-center flex-col">
					<h1 className='text-4xl font-bold mb-10 mt-10'>Projects</h1>
					<div className="grid grid-cols-3 grid-rows-2 gap-10 m-10">
						<div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm">
							<a href="#">
								<img src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
							</a>
							<div class="p-5">
								<a href="#">
									<h5 className='font-bold text-lg'>Noteworthy technology acquisitions 2021</h5>
								</a>
								<p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
								<a href="#">
									Read more
								</a>
							</div>
						</div>
						<div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm">
							<a href="#">
								<img src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
							</a>
							<div class="p-5">
								<a href="#">
									<h5 className='font-bold text-lg'>Noteworthy technology acquisitions 2021</h5>
								</a>
								<p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
								<a href="#">
									Read more
								</a>
							</div>
						</div>
						<div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm">
							<a href="#">
								<img src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
							</a>
							<div class="p-5">
								<a href="#">
									<h5 className='font-bold text-lg'>Noteworthy technology acquisitions 2021</h5>
								</a>
								<p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
								<a href="#">
									Read more
								</a>
							</div>
						</div>
						<div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm">
							<a href="#">
								<img src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
							</a>
							<div class="p-5">
								<a href="#">
									<h5 className='font-bold text-lg'>Noteworthy technology acquisitions 2021</h5>
								</a>
								<p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
								<a href="#">
									Read more
								</a>
							</div>
						</div>
						<div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm">
							<a href="#">
								<img src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
							</a>
							<div class="p-5">
								<a href="#">
									<h5 className='font-bold text-lg'>Noteworthy technology acquisitions 2021</h5>
								</a>
								<p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
								<a href="#">
									Read more
								</a>
							</div>
						</div>
						<div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm">
							<a href="#">
								<img src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
							</a>
							<div class="p-5">
								<a href="#">
									<h5 className='font-bold text-lg'>Noteworthy technology acquisitions 2021</h5>
								</a>
								<p>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
								<a href="#">
									Read more
								</a>
							</div>
						</div>
					</div>
				</div>
				<FAQ></FAQ>
				<Footer></Footer>
			</div>
			<MyModal isOpen={isOpen} setIsOpen={setIsOpen} title='Find a Project'>
				<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<div class="w-full px-3 mb-6 md:mb-0">
						<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
							Category
						</label>
						<div class="relative">
							<select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
								<option>New Mexico</option>
								<option>Missouri</option>
								<option>Texas</option>
							</select>
							<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
								<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
							</div>
						</div>
					</div>
					<div class="w-full px-3 mb-6 md:mb-0">
						<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
							Category
						</label>
						<div class="relative">
							<select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
								<option>New Mexico</option>
								<option>Missouri</option>
								<option>Texas</option>
							</select>
							<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
								<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
							</div>
						</div>
					</div>
					<div class="w-full px-3 mb-6 md:mb-0">
						<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
							Category
						</label>
						<div class="relative">
							<select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
								<option>New Mexico</option>
								<option>Missouri</option>
								<option>Texas</option>
							</select>
							<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
								<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
							</div>
						</div>
					</div>
					<div class="flex items-center justify-center mt-5">
						<button onClick={() => setIsOpen(false)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
							Discover
						</button>
					</div>
				</form>
			</MyModal>
		</div>
	)
}