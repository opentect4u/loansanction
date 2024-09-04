import React, { useEffect, useState, useRef } from "react"
import "./LoanForm.css"
import { useParams, useLocation } from "react-router"
import BtnComp from "../../Components/BtnComp"
import HeadingTemplate from "../../Components/HeadingTemplate"
import VError from "../../Components/VError"
import TDInputTemplate from "../../Components/TDInputTemplate"

import { useNavigate } from "react-router-dom"
import { Formik, FieldArray } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { Message } from "../../Components/Message"
import { url } from "../../Address/BaseUrl"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Radio } from "antd"
import AuditTrail from "../../Components/AuditTrail"
import FormHeader from "../../Components/FormHeader"
// import { Button } from 'primereact/button';
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import IMG from "../../Assets/Images/puri_flyer.jpg"
import logo from "../../Assets/Images/purdcs.png"

function LoanView() {
	const params = useParams()
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const location = useLocation()
	const { loanFormValues } = location.state || {}

	const [count, setCount] = useState(0)

	console.log(params, "params")
	console.log(location.state, "location.state")

	useEffect(() => {
		console.log("Calls when onSubmit api axios success changes...")
	}, [count])

	// const data = {
	// 	appNo: 1,
	// 	date: "04/09/2024",
	// 	memId: 28,
	// 	memName: "Soumya",
	// 	loanType: "CarLoan",
	// }

	const data = [
		{ name: "Date", value: new Date().toLocaleDateString("en-GB") },
		{ name: "Application Number", value: "543654" },
		{ name: "Member ID", value: loanFormValues?.l_member_id },
		{ name: "Member Name", value: loanFormValues?.l_name },
		{ name: "Loan Type", value: loanFormValues?.l_applied_for },
	]

	const generatePDF = () => {
		const input = document.getElementById("tableDiv")

		html2canvas(input).then((canvas) => {
			const imgData = canvas.toDataURL("image/png")
			const pdf = new jsPDF("p", "mm", "a4")
			const imgWidth = 210
			const imgHeight = (canvas.height * imgWidth) / canvas.width

			pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
			pdf.save("loan_aapplication_form.pdf")
		})
	}

	return (
		<section
			className="bg-red-50 dark:bg-[#001529] flex justify-center align-middle p-5"
			style={{
				backgroundImage: `url(${IMG})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
		>
			{/* {params.id>0 && data && <PrintComp toPrint={data} title={'Department'}/>} */}
			{/* <HeadingTemplate
				text={params.id > 0 ? "Update vendor" : "Add vendor"}
				mode={params.id > 0 ? 1 : 0}
				title={"Vendor"}
				data={params.id && data ? data : ""}
			/> */}
			<div
				className=" bg-white p-5 w-4/5 min-h-screen rounded-3xl"
				style={{
					backgroundColor: "rgba(255, 250, 250, 0.35)",
					backdropFilter: "blur(9px)",
				}}
			>
				<div className="w-auto mx-14 my-4">
					<FormHeader text="Loan Application Download" />
				</div>
				<Spin
					indicator={<LoadingOutlined spin />}
					size="large"
					className="text-red-800 dark:text-gray-400"
					spinning={loading}
				>
					{/* <div>Application ID: {JSON.stringify(loanFormValues)}</div>
					<div>-------------------------------------</div>
					<div>Loan Form Values: {JSON.stringify(loanFormValues)}</div> */}
					<div
						className="bg-white flex flex-col justify-center align-middle w-5/6 mx-auto p-5 rounded-3xl"
						id="tableDiv"
					>
						<img src={logo} className="w-40 h-40 mx-auto" />
						<div className="mx-auto text-[#6457A6] text-center text-3xl mt-5 font-semibold">
							PURDCS Loan Application Form
						</div>
						<div className="relative overflow-x-auto shadow-md sm:rounded-2xl w-5/6 mx-auto mt-8">
							<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
								{/* <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
								<tr>
									<th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
										ID
									</th>
									<th scope="col" className="px-6 py-3">
										Name
									</th>
									<th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
										Age
									</th>
									<th scope="col" className="px-6 py-3">
										Job
									</th>
								</tr>
							</thead> */}
								<tbody>
									{data?.map((item) => (
										<tr className="border-b border-gray-200 dark:border-gray-700">
											<th
												scope="row"
												className="px-6 py-4 w-1/4 font-bold text-nowrap text-red-950 whitespace-nowrap bg-red-50 dark:text-white dark:bg-gray-800"
											>
												{item?.name}
											</th>
											<th
												scope="row"
												className="px-6 py-4 font-medium w-3/4 text-gray-900 whitespace-nowrap bg-white dark:text-white dark:bg-gray-800"
											>
												{item?.value}
											</th>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{/* Footer */}
						<div className="grid grid-cols-2 place-items-center gap-5 mt-10">
							<div>About Us</div>
							<div>Find Us</div>
						</div>
					</div>
				</Spin>

				<div className="flex justify-end mr-12 mt-8">
					<button
						type="button"
						className="text-gray-900 bg-yellow-300 hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
						onClick={generatePDF}
					>
						<svg
							className="w-4 h-4 me-2 -ms-1"
							aria-hidden="true"
							focusable="false"
							data-prefix="fab"
							data-icon="paypal"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 384 512"
						>
							<path
								fill="currentColor"
								d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"
							></path>
						</svg>
						Download PDF
					</button>
				</div>
			</div>
		</section>
	)
}

export default LoanView
