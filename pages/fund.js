import Head from 'next/head'
import Link from 'next/link'
import {ethers, utils} from "ethers"
import { useState, useEffect } from 'react'
import projectContract from "../interface/projectContract.json"

import Navbar from '../components/navbar'
import MyModal from '../components/modal'
import FAQ from '../components/faq'
import Footer from '../components/footer'

// const contractAddressRinkeby = "0x6E4EC75096C050Cda0467fD9DC0D35496538b019";
const contractAddress = "0x6C9AE8B5FCAFBCaFb0404e259f72F6b143d4e69f"; // mumbai matic
export default function Home() {
	let [isOpen, setIsOpen] = useState(false)

	let mapp = [1, 2, 3, 4, 5, 6];
	let [allProjects, setAllProjects] = useState([]);
	let [account, setAccount] = useState("");
    let [allMyProjects, setMyProjects ] = useState([]);
    let [totalContribution, setTotalContributions] = useState(0);

	let [buttonState, setButtonState] = useState(0)
	useEffect( () => {  getProjectsFunc() }, []);


	async function getProjectsFunc() {
		
		let account = await ethereum.request({ method: 'eth_accounts' });
		const provider = new ethers.providers.Web3Provider(window.ethereum);

		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, projectContract.abi, signer);
        
		try {
			let getAllProjectsArray = await contract.getAllProjects(); 
			console.log(getAllProjectsArray);
			console.log(getAllProjectsArray[0].title);
			console.log(getAllProjectsArray[0][4]);
			console.log(getAllProjectsArray)
			setAllProjects(getAllProjectsArray);
            setButtonState(0);
			
		} 
		catch (e) {
			alert(e.message)
		}

	}


	async function myProjects () {
	
			let newArr = [];
			let totalContri = 0;
			allProjects.forEach(async (p) => { 
			  let contri = 	await myContribution(p.projectId);
			  if (contri > 0 ) {

				  console.log("condition met");
				  newArr.unshift(p);
				  totalContri = totalContri + contri;
   
			  }
		   }  ) 
		   setButtonState(1);
		  setTimeout(() => {
			  setAllProjects(newArr);
		  console.log(newArr);
		  
		  console.log(allMyProjects);
		  setTotalContributions(totalContri);
			  
		  }, 200); 
		}

	
			
		async function myContribution(id) {
			let provider = new ethers.providers.Web3Provider(window.ethereum);
			let signer = provider.getSigner();
			let contract = new ethers.Contract(contractAddress, projectContract.abi, provider);
			console.log(id);
			let accounts = await ethereum.request({ method: 'eth_accounts' });
			console.log("account is ", accounts[0]);
			
			
			let myFunding = await contract.myContributions(Number(id), accounts[0]);
		
			console.log(myFunding);
			console.log("returned", ethers.utils.formatEther(myFunding));

			return (Number(ethers.utils.formatEther(myFunding)));
			
		}
		 

	


    
	return (
		<div className='bg-cover bg bg-fixed'>
			<Head>
				<title>Fund - Crowdfunding</title>
			</Head>
			<div className=" w-full h-full">
				<Navbar />
				<div className="h-full w-full flex flex-col justify-center items-center mt-12">
					<div className="max-w-5xl mx-auto px-12 sm:px-6 lg:px-4 py-12 md:p-4">
						{/* todo - show funded projects*/}
					{/* <div className='mx-80 translate-x-20 mb-6'>
						{buttonState == 0 && <button class="transition mx-auto ease-in align duration-100 inline-flex items-center text-sm font-medium md:mb-0 bg-gray-700 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-700 " onClick={myProjects}>
							<span>Show Funded Projects </span>
							
							</button> }
						{buttonState == 1 && <button class="transition mx-4 mx-auto ease-in align duration-100 inline-flex items-center text-sm font-medium md:mb-0 bg-gray-700 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-700 " onClick={getProjectsFunc}>
							<span>Show All Projects </span>
							
							</button> }
							</div> */}
						<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
							{allProjects.map(project => (
								<Link  href={`/project/${Number(project.projectId)}`} key={project.projectId}>
									<div class="w-full overflow-hidden flex flex-col justify-center items-center">
										<div class="max-w-md h-full w-full glass rounded-xl p-5">
											<div class="flex flex-col">
												<div class="">
													<div class="relative h-62 w-full mb-3">
														<img src={project.img} alt="Just a flower" class=" w-full  object-fill rounded-2xl" style={{ height:"250px" }} />
													</div>
													<div class="flex-auto justify-evenly">
														<div class="flex flex-wrap ">
															<div class="flex items-center w-full justify-between min-w-0 ">
																<h2 class="text- mr-auto cursor-pointer text-gray-700 hover:text-purple-500 truncate ">{project.description}</h2>
																<div class="flex items-center bg-green-400 text-gray-900 text-xs px-2 py-1 ml-3 rounded-lg">
																	{project.state == 0 && "Raising"}
																	{project.state == 1 && "Expired"}
																	{project.state == 2 && "Successful"}
																</div>
															</div>
														</div>
														<div class="text-lg text-gray-900 font-semibold mt-1 mb-4">
															{project.title}
														</div>
														<div class="flex justify-between item-center text-gray-900 mb-4">
															<div class="flex items-center gap-10">
																<p>Raised {utils.formatEther(project.currentBalance)}</p>
																<p>Goal {utils.formatEther(project.amountGoal)}</p>
																{Number(project.amountGoal) > (Number(project.currentBalance)) && <p>Needed {(Number(project.amountGoal)/1000000000000000000 - Number(project.currentBalance)/1000000000000000000).toFixed(3)}</p> }
																{Number(project.amountGoal) < (Number(project.currentBalance)) && <p> 0 MATIC Needed</p>}
															</div>
														</div>
												
														<div class="flex space-x-2 text-sm font-medium justify-start">
															<button class="transition ease-in duration-100 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-700 ">
																<span>Fund Me</span>
															</button>
															{project.category && <button class="transition ease-in duration-100 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-green-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-green-600 ">
																<span>{project.category}</span>
															</button>}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Link>
							))}
							
						</div>
					</div>
				</div>
			</div>
			{/* <div className='bg w-full h-full'>
				<Navbar></Navbar>
				<div className="w-full h-screen flex flex-col justify-center items-center">
					<h1 className='text-4xl font-bold mb-5'>Find a Project and fund them in MATIC&nbsp;&nbsp;&nbsp;</h1>
					<Link href='#'>
						<a onClick={() => setIsOpen(true)} className='bg-gray-900 text-white px-3 py-2 rounded-md text-xl font-medium hover:bg-gray-400 hover:text-black '>Find a Project</a>
					</Link>
					<div className="w-full flex flex-col mt-20  ">
				      { allMyProjects.length !== 0  && <div className="grid grid-cols-2  gap-4">
					    <div className="flex flex-col justify-around items-center">
						<h1 className="text-3xl">{allMyProjects.length}</h1>
						<h2 className="text-xl">Projects Funded</h2>
				      	</div>
					        <div className="flex flex-col justify-center items-center">
					      	<h1 className="text-3xl">{totalContribution}</h1>
						   <h2 className="text-xl">Total Contributions</h2>
					      </div>
				       </div> }
			    </div>


				</div>
				<div className="w-full bg-gray-400 flex justify-start items-center flex-col">
				<a onClick={() => myProjects()} className='bg-gray-900 text-white px-3 py-2 rounded-md text-xl font-medium hover:bg-gray-400 hover:text-black mt-10'>Get Funded Projects</a>

				{ allMyProjects.length !== 0  && <div className="grid grid-cols-2 mt-4 gap-80">
					    <div className="flex flex-col justify-around items-center">
						<h1 className="text-3xl">{allMyProjects.length}</h1>
						<h2 className="text-xl">Projects Funded</h2>
				      	</div>
					        <div className="flex flex-col justify-center items-center">
					      	<h1 className="text-3xl">{totalContribution}</h1>
						   <h2 className="text-xl">Total Contributions</h2>
					      </div>
				       </div> }

					<div className="grid grid-cols-3 grid-rows-2 gap-10 m-10">
						{allMyProjects.map(project => (
							<div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm">
								<Link href={`/project/${Number(project.projectId)}`} id={project.projectId}>
									<img src={project.img} alt="" />
								</Link>
								<div class="p-5">
									<Link href={`/project/${project.projectId}`}>
										<h5 className='font-bold text-lg'>{project.title}</h5>
									</Link>
									{project.state == 0 && <p className=''> Current Status :- Fundrasing</p>}
									{project.state == 1 && <p className=''> Current Status :- Expired</p>}
									{project.state == 2 && <p className=''> Current Status :- Succesfull</p>}
									
									<br />
									<p>{project.description}</p>
									<div className="grid grid-cols-2 grid-rows-2 text-sm mt-5">
									    <p>{utils.formatEther(project.currentBalance)} MATIC Raised</p>
										<p>{utils.formatEther(project.amountGoal)} MATIC Goal</p>
										<p>{utils.formatEther(project.amountGoal) - ethers.utils.formatEther(project.currentBalance)} MATIC Needed</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="w-full  h-full bg-gray-400 flex justify-start items-center flex-col">
					<h1 className='text-4xl font-bold mb-10 '>All Projects</h1>
					<div className="grid grid-cols-3 grid-rows-2 gap-10 m-10">
				{allProjects.map(project => (
					<div class="bg-white customcss shadow-md border border-gray-200 rounded-lg max-w-sm">
						<Link href={`/project/${Number(project.projectId)}`} id={project.projectId}>
							<img src={project.img} alt="" />
						</Link>
						<div class="p-5">
							<Link href={`/project/${project.projectId}`}>
								<h5 className='font-bold text-lg'>{project.title}</h5>
							</Link>
							{project.state == 0 && <p className=''> Current Status :- Fundrasing</p>}
							{project.state == 1 && <p className=''> Current Status :- Expired</p>}
							{project.state == 2 && <p className=''> Current Status :- Succesfull</p>}
							
							<br />
							<p>{project.description}</p>
							<div className="grid grid-cols-2 grid-rows-2 text-sm mt-5">
								<p>{utils.formatEther(project.currentBalance)} MATIC Raised</p>
								<p>{utils.formatEther(project.amountGoal)} MATIC Goal</p>
								{Number(project.amountGoal) > (Number(project.currentBalance)) && <p>{(Number(project.amountGoal)/1000000000000000000 - Number(project.currentBalance)/1000000000000000000).toFixed(3)} MATIC Needed</p> }
					 {Number(project.amountGoal) < (Number(project.currentBalance)) && <p> 0 MATIC Needed</p> }
							</div>
						</div>
					</div>
						))}
					</div>
				</div>
				<FAQ></FAQ>
				<Footer></Footer>
			</div> */}
			<MyModal isOpen={isOpen} setIsOpen={setIsOpen} title='Find a Project'>
				<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<div class="w-full px-3 mb-6 md:mb-0">
						<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
							Category
						</label>
						<div class="relative">
							<select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
								<option>DAO</option>
								<option>NFT</option>
								<option>DeFi</option>
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
						<label class="block text-gray-700 text-sm font-bold mb-2" for="fundamount">
							From Project ID
						</label>
						<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fundamount" type="number" placeholder="Enter Project ID" />
						</div>
					</div>
					<div class="w-full px-3 mb-6 md:mb-0">
						
						 <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
							From Project Creator Address
						  </label>
						<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Project Creator Address" />
						
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
