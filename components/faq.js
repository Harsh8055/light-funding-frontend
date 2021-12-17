import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'

export default function FAQ() {
	return (
	  <div className="w-full h-screen px-4 pt-16 flex justify-start items-center flex-col">
		<h1 className='text-4xl font-bold mb-5'>FAQ</h1>
		<div className="w-full max-w-xl p-2 mx-auto bg-white rounded-2xl">
		  <Disclosure>
			{({ open }) => (
			  <>
				<Disclosure.Button className="flex justify-between w-full px-4 py-2 text-lg font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
				  <span> I Can't Fund To A Project,  Why?</span>
				  <ChevronUpIcon
					className={`${
					  open ? 'transform rotate-180' : ''
					} w-5 h-5 text-purple-500`}
				  />
				</Disclosure.Button>
				<Disclosure.Panel className="px-4 pt-4 pb-2 text-lg text-gray-500">
				 If you are getting error while funding , then probably the project is expired. Check the deadline date, if the date is passed the project is expired, but it is not updated on the blockchain, you can update project to expired by clicking on the "update status" button
				</Disclosure.Panel>
			  </>
			)}
		  </Disclosure>
		  <Disclosure as="div" className="mt-2">
			{({ open }) => (
			  <>
				<Disclosure.Button className="flex justify-between w-full px-4 py-2 text-lg  font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
				  <span>Why i don't see the refund button even though the project is expired?</span>
				  <ChevronUpIcon
					className={`${
					  open ? 'transform rotate-180' : ''
					} w-5 h-5 text-purple-500`}
				  />
				</Disclosure.Button>
				<Disclosure.Panel className="px-4 pt-4 pb-2 text-lg text-gray-500">
				  This happens because the project is expired but the status is not update on the blockchain, so what you can do is click on the update status button and update the status from fundraising to expired, after you have done that you will be able to se the refund option
				</Disclosure.Panel>
			  </>
			)}
		  </Disclosure>
		</div>
	  </div>
	)
  }
  