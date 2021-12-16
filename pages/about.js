import Head from "next/head"
import { useState } from "react"
import Navbar from "../components/navbar"
import MyModal from "../components/modal"
import FAQ from "../components/faq"
// How it works
// How to Start a Project
// How to fund a project
// How to withdraw

export default function About() {
	const [isWorksOpen, setIsWorksOpen] = useState(false)
	const [isStartOpen, setIsStartOpen] = useState(false)
	const [isFundOpen, setIsFundOpen] = useState(false)
	const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)

	return (
		<div className="bg">
			<Head>
				<title>About - Light</title>
			</Head>
			<Navbar />
			<section class=" relative pt-16 bg-blueGray-50">
				<div class="container mx-auto">
				<div class="flex flex-wrap items-center">
					<div class="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-78">
					<div class="relative flex flex-col min-w-0 break-words glass w-full mb-6 shadow-lg rounded-xl">
						<img alt="..." src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=700&amp;q=80" class="w-full align-middle rounded-t-lg" />
						<blockquote class="relative p-8 mb-4">
							<h4 class="text-xl font-bold">
								Light
							</h4>
							<p class="text-md font-normal mt-2">
								A Secure Crowdfunding platform build on polygon blockchain, add projects, fund to projects and earn NFTs for contributing
							</p>
						</blockquote>
					</div>
					</div>

					<div class="w-full md:w-6/12 px-4">
					<div class="flex flex-wrap">
						<div class="w-full md:w-6/12 px-4">
						<div class="relative glass rounded-xl flex flex-col mt-4 cursor-pointer" onClick={() => setIsWorksOpen(true)}>
							<div class="px-4 py-5 flex-auto">
								<div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
									</svg>
								</div>
								<h6 class="text-xl mb-1 font-semibold">How it Works</h6>
								<p class="mb-4 text-blueGray-500">
									Light is a decentralized crowdfunding app which works on Polygon Blockchain.
									<br />
									Read More
								</p>
							</div>
						</div>
						<div class="relative mt-4  flex rounded-xl glass flex-col min-w-0 cursor-pointer" onClick={() => setIsFundOpen(true)}>
							<div class="px-4 py-5 flex-auto">
							<div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="none">
									<circle cx="512" cy="512" r="512" fill="#000"/>
									<path d="M681.469 402.456C669.189 395.312 653.224 395.312 639.716 402.456L543.928 457.228L478.842 492.949L383.055 547.721C370.774 554.865 354.81 554.865 341.301 547.721L265.162 504.856C252.882 497.712 244.286 484.614 244.286 470.325V385.786C244.286 371.498 251.654 358.4 265.162 351.256L340.073 309.581C352.353 302.437 368.318 302.437 381.827 309.581L456.737 351.256C469.018 358.4 477.614 371.498 477.614 385.786V440.558L542.7 403.646V348.874C542.7 334.586 535.332 321.488 521.824 314.344L383.055 235.758C370.774 228.614 354.81 228.614 341.301 235.758L200.076 314.344C186.567 321.488 179.199 334.586 179.199 348.874V507.237C179.199 521.525 186.567 534.623 200.076 541.767L341.301 620.353C353.582 627.498 369.546 627.498 383.055 620.353L478.842 566.772L543.928 529.86L639.716 476.279C651.996 469.135 667.961 469.135 681.469 476.279L756.38 517.953C768.66 525.098 777.257 538.195 777.257 552.484V637.023C777.257 651.312 769.888 664.409 756.38 671.553L681.469 714.419C669.189 721.563 653.224 721.563 639.716 714.419L564.805 672.744C552.525 665.6 543.928 652.502 543.928 638.214V583.442L478.842 620.353V675.125C478.842 689.414 486.21 702.512 499.719 709.656L640.944 788.242C653.224 795.386 669.189 795.386 682.697 788.242L823.922 709.656C836.203 702.512 844.799 689.414 844.799 675.125V516.763C844.799 502.474 837.431 489.377 823.922 482.232L681.469 402.456Z" fill="white"/>
								</svg>
							</div>
							<h6 class="text-xl mb-1 font-semibold">
								How to fund a project
							</h6>
							<p class="mb-4 text-blueGray-500">
								Connect a Metamask Wallet and you are ready to invest in the next big thing
								<br />
								Read More
							</p>
							</div>
						</div>
						</div>
						<div class="w-full  md:w-6/12 px-4 cursor-pointer" onClick={() => setIsStartOpen(true)}>
						<div class="relative rounded-xl glass flex flex-col min-w-0 mt-4">
							<div class="px-4 py-5 flex-auto">
							<div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
								</svg>
							</div>
							<h6 class="text-xl mb-1 font-semibold">How to Start a Project</h6>
							<p class="mb-4 text-blueGray-500">
								Connect a Metamask Wallet, Add the details of your projects with some...
								<br />
								Read More
							</p>
							</div>
						</div>
						<div class="relative mt-4  rounded-xl glass flex flex-col min-w-0 cursor-pointer" onClick={() => setIsWithdrawOpen(true)}>
							<div class="px-4 py-5 flex-auto">
							<div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
									<path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
									<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
								</svg>
							</div>
							<h6 class="text-xl mb-1 font-semibold">How to withdraw</h6>
							<p class="mb-4 text-blueGray-500">
								You can click on "Request Funds" in project's page and enter the...
								<br />
								Read More
							</p>
							</div>
						</div>
						</div>
					</div>
					</div>
				</div>
				</div>
			</section>

			<FAQ></FAQ>

			<MyModal isOpen={isWorksOpen} setIsOpen={setIsWorksOpen} title='How Light Works'>
				You can connect your metamask wallet and can fund any project you like in MATIC or ETH, if you have a great idea then you can start a project and collect funding and start working on the next great thing
			</MyModal>

			<MyModal isOpen={isFundOpen} setIsOpen={setIsFundOpen} title='How to fund a project'>
			Connect a Metamask Wallet and you are ready to invest in the next big thing. Head to <code>/funds</code> and choose a project that you like and invest in it using MATIC or ETH
			</MyModal>

			<MyModal isOpen={isStartOpen} setIsOpen={setIsStartOpen} title='How to start a project'>
			Connect a Metamask Wallet, Add the details of your projects with some images and you are ready to recieve funding in MATIC or ETH.
			</MyModal>

			<MyModal isOpen={isWithdrawOpen} setIsOpen={setIsWithdrawOpen} title='How to Withdraw funds'>
			You can click on "Request Funds" in project's page and enter the amount and a voting will be conducted where investors could on whether or not you can use that amount
			</MyModal>
			</div>
	)
}