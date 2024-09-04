import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import Backbtn from "../../Components/Backbtn"
import { Switch } from "antd"
import BtnComp from "../../Components/BtnComp"
import { Select } from "antd"
import HeadingTemplate from "../../Components/HeadingTemplate"

function OrderForm() {
	const params = useParams()
	console.log(params, "params")
	const [waiver, setWaiver] = useState(false)
	return (
		<section className="bg-white dark:bg-[#001529]">
			<div className="py-8 mx-auto w-5/6 lg:py-16">
				<HeadingTemplate text={params.id > 0 ? "Update order" : "Add order"} />

				<form action="#">
					<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
						<div className="sm:col-span-2">
							<label
								for="name"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Client Name
							</label>
							<Select
								showSearch
								className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
								//   style={{ width: 520 }}
								placeholder="Select a client"
								optionFilterProp="label"
								//   onChange={onChange}
								//   onSearch={onSearch}
								size={"large"}
								options={[
									{
										value: "1",
										label: "L&T",
									},
									{
										value: "AL",
										label: "Ashok Leyland",
									},
								]}
							/>
						</div>
						<div className="sm:col-span-2">
							<label
								for="name"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Project Name
							</label>
							<Select
								showSearch
								className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
								//   style={{ width: 520 }}
								placeholder="Select a project"
								optionFilterProp="label"
								//   onChange={onChange}
								//   onSearch={onSearch}
								size={"large"}
								options={[
									{
										value: "",
										label: "Select Project",
									},
									{
										value: "D",
										label: "DOLVI",
									},
									{
										value: "PM",
										label: "A/C BEUMER_JPPL",
									},
								]}
							/>
						</div>
						<div className="sm:col-span-2">
							<label
								for="brand"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Client Order No.
							</label>
							<input
								type="text"
								name="brand"
								id="brand"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-green-900 active:border-green-900 focus:ring-green-900 focus:border-1 duration-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-900 dark:focus:border-green-900"
								placeholder="0000000"
								required=""
							/>
						</div>
						{/* <div className='flex items-center justify-between'> */}
						<div className="sm:col-span-1 flex justify-start">
							<label
								for="brand"
								className="block mb-2 mr-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Cost waiver?
							</label>
							<Switch
								size="large"
								value={waiver}
								onChange={(waiver) => setWaiver(waiver)}
								defaultChecked
							/>
						</div>
						{!waiver && (
							<div className="sm:col-span-2 ">
								<label
									for="name"
									className="block mb-2 mr- 4 text-sm font-medium text-gray-900 dark:text-white"
								>
									Cost to be negotiated by
								</label>
								<Select
									showSearch
									className="w-full"
									//   style={{ width: 520 }}
									// placeholder="Select a project"
									optionFilterProp="label"
									//   onChange={onChange}
									//   onSearch={onSearch}
									size={"large"}
									options={[
										{
											value: "AD",
											label: "Admin",
										},
										{
											value: "PM",
											label: "Project Manager",
										},

										{
											value: "WM",
											label: "Warehouse Manager",
										},
										{
											value: "GU",
											label: "General User",
										},
									]}
								/>
							</div>
						)}
						{/* </div> */}
					</div>
					<BtnComp />
				</form>
			</div>
		</section>
	)
}

export default OrderForm
