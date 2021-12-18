import Head from 'next/head'
import Link from 'next/link'
import {ethers, utils} from "ethers"
import { useState, useEffect } from 'react'
import { create } from 'ipfs-http-client'


import Navbar from '../components/navbar'
import MyModal from '../components/modal'
import FAQ from '../components/faq'
import Footer from '../components/footer'
import projectContract from "../interface/projectContract.json"


// const contractAddressR = "0x6E4EC75096C050Cda0467fD9DC0D35496538b019";
const contractAddress = "0xfA7637B96ed7e3580215504e55519feF0bC95e57"; // mumbai matic
const client = create('https://ipfs.infura.io:5001/api/v0')
export default function Home() {
	
	let [isOpen, setIsOpen] = useState(false)
    let [selects, setSelects] = useState("");
    let [allProjects, setAllProjects] = useState([]);
	let [account, setAccount] = useState("");

	useEffect(() => {
		getProjectsFunc()
	}, []);

	async function getProjectsFunc() {
		account = await ethereum.request({ method: 'eth_accounts' })
		setAccount(account);
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, projectContract.abi, signer);

		try {
			let getAllProjectsArray = await contract.getAllProjects();
			console.log(getAllProjectsArray);
			console.log(getAllProjectsArray[0].title);
			console.log(getAllProjectsArray[0][4]);

			setAllProjects(getAllProjectsArray);
		}
		catch (e) {
			console.log(e);
		}
	}

	// let uploadImageOnIPFS = async () => {
	// 	const data = fileInput.files[0]
	// 	const file = new Moralis.File(data.name, data)
	// 	const files = await file.saveIPFS({useMasterKey: true});
	// 	return file.ipfs();
	// }
	let uploadImageOnIPFS = async () => {
		const file = fileInput.files[0]
		const added = await client.add(file);
		const url = `https://ipfs.infura.io/ipfs/${added.path}`
		return url;
	}

     async function startProject() {
		 getProjectsFunc();

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		 const contract = new ethers.Contract(contractAddress, projectContract.abi, signer);

		 try {
			 let title = document.getElementById("title").value;
			 let desc = document.getElementById("description").value;

			 let amountInEthers = document.getElementById("fundamount").value;
			 let amount = ethers.utils.parseEther(amountInEthers);


			 let time = document.getElementById("time").value;
			 let location = document.getElementById("location").value;

			 // image process upload to ipfs first
			 let img = await uploadImageOnIPFS();
			 console.log(img);

			// const object = {
			// 	"title" : "Light POC NFT",
			// 	"description": "This is a nft which is rewarded for contributing in any project on light",
			// 	"image": "https://gateway.pinata.cloud/ipfs/QmeuqW1sFYDS1nMWSKszFaM4rkEtGQ7kxsXHGpMARhci5W",
			//   }
			// const file = new Moralis.File("file.json", {base64 : btoa(JSON.stringify(object))});
			// let uri = await file.saveIPFS();
			// console.log(uri._ipfs);

	        let uri = "https://gateway.pinata.cloud/ipfs/QmUa2KQr7xmuFA9VCMLKbGFDBGwXnEroHxoFNVahs49HtQ";
			let txn = await contract.startProject(title, desc, time, amount, location, selects, img, uri);
			let txnreceipt = await txn.wait();
			console.log(txnreceipt);
			getProjectsFunc();


		 } catch (e) {

			 alert(e.message)
		   }
    }

	return (
		<div className='bg bg-cover bg custom-img bg-fixed'>
			<Head>
				<title>Start - Crowdfunding</title>
			</Head>
			<div className='w-full h-full'>
				<Navbar></Navbar>
				<div className="w-full h-screen flex flex-col justify-center items-center">
					<h1 className='text-4xl font-bold mb-5'>Start a Project and get funds in ETH&nbsp;&nbsp;&nbsp;</h1>
					<Link href='#'>
						<a onClick={() => setIsOpen(true)} className='bg-gray-900 text-white px-3 py-2 rounded-md text-xl font-medium hover:bg-gray-400 hover:text-black mr-12'>Start a Project</a>
					</Link>
				</div>
				<div className="w-full h-full flex justify-start items-center flex-col">
					<h1 className='text-4xl font-bold mb-10 mt-10'>Your Projects</h1>
					<div className="max-w-5xl mx-auto px-12 sm:px-6 lg:px-4 py-12 md:p-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
						{ allProjects.slice(0).reverse().filter((ele)=> ele.creator.toLowerCase() == account[0].toLowerCase()).map(project => (
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
				<FAQ></FAQ>
				<Footer ></Footer>
			</div>
			<MyModal isOpen={isOpen} setIsOpen={setIsOpen} title='Start a Project'>
				<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<div class="mb-4">
						<label class="block text-gray-700 text-sm font-bold mb-2" for="title">
							Project Name
						</label>
						<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title" />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700 text-sm font-bold mb-2" for="description">
							Project Description
						</label>
						<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="Description" />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700 text-sm font-bold mb-2" for="fundamount">
							Project Fund Amount
						</label>
						<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fundamount" type="number" placeholder="Fund Amount" />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700 text-sm font-bold mb-2" for="time">
							Raise Until (In days)
						</label>
						<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="time" type="number" placeholder="Raise Until" />
					</div>
					<div class="mb-4">
						<label class="block text-gray-700 text-sm font-bold mb-2" for="location">
							Location
						</label>
						<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" type="text" placeholder="Location" />
					</div>

					<div class="w-full px-3 mb-6 md:mb-0">
						<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
							Category
						</label>
						<div class="relative">
							<select value={selects} onChange={(e) => setSelects(e.target.value)} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
								<option> DAO </option>
								<option> NFT </option>
								<option> DeFi </option>
								<option> Other </option>
							</select>
							<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
								<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
							</div>
						</div>
					</div>
					<div class="mb-4">
						<label class="block text-gray-700 text-sm font-bold mb-2" for="location">
						Upload Project Cover (On IPFS)
						</label>
						<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" name="fileInput" id="fileInput" placeholder="Upload Project Cover" />
					</div>
					<div class="flex items-center justify-center mt-5">
						<button onClick={() => {setIsOpen(false);
						  startProject();  }} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
							Start
						</button>
					</div>
				</form>
			</MyModal>
		</div>
	)
}
