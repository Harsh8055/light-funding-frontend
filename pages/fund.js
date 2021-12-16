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
				  newArr.push(p);
				  totalContri = totalContri + contri;
   
			  }
		   }  ) 
		  setTimeout(() => {
			  setMyProjects(newArr);
		  console.log(newArr);
		  
		  console.log(allMyProjects);
		  setTotalContributions(totalContri);
			  
		  }, 100); 
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
		<div>
			<Head>
				<title>Fund - Crowdfunding</title>
			</Head>
			<div className="w-full h-full">
				<Navbar />
				<div className="bg h-full w-full flex flex-col justify-center items-center">
					<div className="mt-20 w-full h-full flex justify-center items-start gap-20">
						<p className='cursor-pointer'>DAO</p>
						<p className='cursor-pointer'>NFT</p>
						<p className='cursor-pointer'>DeFi</p>
					</div>
					<div className="w-full h-full">
						<div class="w-full grid grid-rows-3 md:grid-rows-none md:grid-cols-3 m-5">
							{allProjects.map(project => (
								<Link href={`/project/${Number(project.projectId)}`} key={project.projectId}>
									<div class="relative w-5/6 h-full flex justify-center rounded-xl hover:scale-105 duration-500 transform transition cursor-pointer">
										<div class="top-0 left-0 mt-3 rounded-lg absolute py-2 px-3 z-30 bg-green-500 text-gray-100 text-xs md:text-sm font-medium md:block">
											{project.state == 0 && "Raising"}
											{project.state == 1 && "Canceled"}
											{project.state == 2 && "Successful"}
										</div>
										<div class="w-full bg-white rounded-xl shadow-xl z-10">
											<div class="">
												<img src={project.img} class="max-h-60 w-full object-cover rounded-t-xl" alt="" />
												<div class="bottom-0 right-0 mb-2 mr-2 rounded-lg absolute bg-yellow-500 py-2 px-3 text-gray-100 text-xs font-medium">{project.category}</div>
											</div>
											<div class="flex flex-col justify-center items-start gap-5 p-5">
												<div class="text-sm md:text-base font-bold">{project.title}</div>
												<div class="flex">
													<div class="flex justify-between item-center">
															<div class="flex items-center gap-10">
																<p>Raised {utils.formatEther(project.currentBalance)}</p>
																<p>Goal {utils.formatEther(project.amountGoal)}</p>
																{Number(project.amountGoal) > (Number(project.currentBalance)) && <p>Needed {(Number(project.amountGoal)/1000000000000000000 - Number(project.currentBalance)/1000000000000000000).toFixed(3)}</p> }
																{Number(project.amountGoal) < (Number(project.currentBalance)) && <p> 0 MATIC Needed</p>}
															</div>
													</div>
												</div>
												<p class="text-ellipsis overflow-hidden max-h-20 text-xs md:text-sm text-gray-500">
													{project.description}
												</p>
												<a class="flex justify-center bg-blue-500 hover:bg-white text-sm md:text-base border hover:border-2 hover:border-blue-500 rounded-xl w-14 md:w-1/2 p-1 text-gray-100 hover:text-blue-900" href="#">Fund this Project</a>
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
