import React, { useEffect, useState, useRef } from "react"
import "./LoanForm.css"
import { useParams } from "react-router"
import BtnComp from "../../Components/BtnComp"
import HeadingTemplate from "../../Components/HeadingTemplate"
import VError from "../../Components/VError"
import TDInputTemplate from "../../Components/TDInputTemplate"

import { useNavigate } from "react-router-dom"
import { Formik, useFormik } from "formik"
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
import { routePaths } from "../../Assets/Data/Routes"
// import { Button } from 'primereact/button';

function LoanForm() {
	const params = useParams()
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const [count, setCount] = useState(0)

	console.log(params, "params")

	const [formValues, setValues] = useState({
		l_member_id: "",
		l_membership_date: "",
		l_name: "",
		l_father_husband_name: "",
		l_gender: "",
		l_dob: "",
		l_email: "",
		l_mobile_no: "",
		l_address: "",
		l_loan_through_branch: "",
		l_applied_for: "",
		l_loan_amount: "",
		l_duration: "",
	})

	const initialValues = {
		l_member_id: "",
		l_membership_date: "",
		l_name: "",
		l_father_husband_name: "",
		l_gender: "",
		l_dob: "",
		l_email: "",
		l_mobile_no: "",
		l_address: "",
		l_loan_through_branch: "",
		l_applied_for: "",
		l_loan_amount: "",
		l_duration: "",
	}

	const validationSchema = Yup.object({
		l_member_id: Yup.string().required("Member ID is required"),
		l_membership_date: Yup.string().required("Membership Date is required"),
		l_name: Yup.string()
			.max(60, "Name should always be less than 61 characters.")
			.required("Name is required"),
		l_father_husband_name: Yup.string()
			.max(60, "Father/Husband name should always be less than 61 characters.")
			.required("Father/Husband is required"),
		l_gender: Yup.string().required("Gender is required"),
		l_dob: Yup.string().required("DOB is required"),
		l_email: Yup.string()
			.email("Enter valid email")
			.required("Email is required"),
		l_mobile_no: Yup.string()
			.matches(/^[0-9]+$/, "Must be only digits")
			.max(10, "Number should exactly be 10 digits")
			.required("Mobile Numeber is required"),
		l_address: Yup.string()
			.max(1000, "Address length should always be less than 1000 characters")
			.required("Address is required"),
		l_loan_through_branch: Yup.string().required(
			"Loan Through Branch is required"
		),
		l_applied_for: Yup.string().required("Applied For is required"),
		l_loan_amount: Yup.number()
			.integer("Only integers are allowed")
			.min(1, "Loan Amount should always be greater than 0")
			.max(100000000, "Max loan amount is 100000000")
			.required("Loan Amount is required"),
		l_duration: Yup.number()
			.min(0, "Duration should always be greater than equal 0")
			.required("Duration is required"),
	})

	useEffect(() => {
		console.log("Calls when onSubmit api axios success changes...")
	}, [count])

	const onSubmit = (values) => {
		console.log("onsubmit called")
		console.log(values, "onsubmit vendor")
		setLoading(true)

		navigate(`${routePaths.LOAN_VIEW}`, {
			state: { loanFormValues: values },
		})
		setLoading(false)
	}

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
		validateOnChange: true,
		validateOnBlur: true,
		enableReinitialize: true,
		validateOnMount: true,
	})

	const handleMemberIdBlur = (event) => {
		console.log("Member ID blurred:", event.target.value)

		formik.handleBlur(event)

		const creds = { cust_id: 1014050 }
		axios.post(`${url}/oracle/select_cust_dtls`, creds).then((res) => {
			if (res?.data?.suc === 1) {
			}
		})
	}

	// useEffect(() => {
	// 	console.log("MEM ID", formik.values.l_member_id)

	// 	// values,
	// 	// handleReset,
	// 	// handleChange,
	// 	// handleBlur,
	// 	// handleSubmit,
	// 	// errors,
	// 	// touched,
	// }, [formik.handleBlur])

	return (
		<section className="bg-red-50 dark:bg-[#001529] flex justify-center align-middle p-5">
			{/* {params.id>0 && data && <PrintComp toPrint={data} title={'Department'}/>} */}
			{/* <HeadingTemplate
				text={params.id > 0 ? "Update vendor" : "Add vendor"}
				mode={params.id > 0 ? 1 : 0}
				title={"Vendor"}
				data={params.id && data ? data : ""}
			/> */}
			<div className=" bg-white p-5 w-4/5 min-h-screen rounded-3xl">
				<div className="w-auto mx-14 my-4">
					<FormHeader text="Loan Application Form" />
				</div>
				<Spin
					indicator={<LoadingOutlined spin />}
					size="large"
					className="text-red-800 dark:text-gray-400"
					spinning={loading}
				>
					<form onSubmit={formik.handleSubmit}>
						<div className="card flex flex-col justify-center px-16 py-5">
							<div className="grid gap-4 sm:grid-cols-6 sm:gap-6">
								<div className="sm:col-span-2">
									<TDInputTemplate
										placeholder="Type Member ID..."
										type="text"
										label="Member ID"
										name="l_member_id"
										formControlName={formik.values.l_member_id}
										handleChange={formik.handleChange}
										handleBlur={handleMemberIdBlur}
										mode={1}
									/>
									{formik.errors.l_member_id && formik.touched.l_member_id ? (
										<VError title={formik.errors.l_member_id} />
									) : null}
								</div>
								<div className="sm:col-span-2">
									<TDInputTemplate
										placeholder="Type Membership Date..."
										type="date"
										label="Membership Date"
										name="l_membership_date"
										formControlName={formik.values.l_membership_date}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										min={"1850-12-31"}
										mode={1}
									/>
									{formik.errors.l_membership_date &&
									formik.touched.l_membership_date ? (
										<VError title={formik.errors.l_membership_date} />
									) : null}
								</div>
								<div className="sm:col-span-2">
									<TDInputTemplate
										placeholder="Type name..."
										type="text"
										label="Name"
										name="l_name"
										formControlName={formik.values.l_name}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
									/>
									{formik.errors.l_name && formik.touched.l_name ? (
										<VError title={formik.errors.l_name} />
									) : null}
								</div>
							</div>

							<div className="grid gap-4 sm:grid-cols-2 sm:gap-6 pt-5">
								<div>
									<TDInputTemplate
										placeholder="Type Father's/Husband's Name..."
										type="text"
										label="Father's/Husband's Name"
										name="l_father_husband_name"
										formControlName={formik.values.l_father_husband_name}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
									/>
									{formik.errors.l_father_husband_name &&
									formik.touched.l_father_husband_name ? (
										<VError title={formik.errors.l_father_husband_name} />
									) : null}
								</div>
								<div>
									<TDInputTemplate
										placeholder="Select Gender..."
										type="text"
										label="Gender"
										name="l_gender"
										formControlName={formik.values.l_gender}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										data={[
											{ code: "M", name: "Male" },
											{ code: "F", name: "Female" },
											{ code: "L", name: "LGBTQA+" },
										]}
										mode={2}
									/>
									{formik.errors.l_gender && formik.touched.l_gender ? (
										<VError title={formik.errors.l_gender} />
									) : null}
								</div>
								<div>
									<TDInputTemplate
										placeholder="Type DOB..."
										type="date"
										label="Date of Birth (DOB)"
										name="l_dob"
										formControlName={formik.values.l_dob}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
									/>
									{formik.errors.l_dob && formik.touched.l_dob ? (
										<VError title={formik.errors.l_dob} />
									) : null}
								</div>
								<div>
									<TDInputTemplate
										placeholder="Type Email..."
										type="email"
										label="Email"
										name="l_email"
										formControlName={formik.values.l_email}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
									/>
									{formik.errors.l_email && formik.touched.l_email ? (
										<VError title={formik.errors.l_email} />
									) : null}
								</div>
								<div>
									<TDInputTemplate
										placeholder="Type Address..."
										type="text"
										label="Address"
										name="l_address"
										formControlName={formik.values.l_address}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={3}
									/>
									{formik.errors.l_address && formik.touched.l_address ? (
										<VError title={formik.errors.l_address} />
									) : null}
								</div>
								<div>
									<TDInputTemplate
										placeholder="Type Mobile Number..."
										type="number"
										label="Mobile Number"
										name="l_mobile_no"
										formControlName={formik.values.l_mobile_no}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
									/>
									{formik.errors.l_mobile_no && formik.touched.l_mobile_no ? (
										<VError title={formik.errors.l_mobile_no} />
									) : null}
								</div>
								<div>
									<TDInputTemplate
										placeholder="Type Loan Through Branch..."
										type="text"
										label="Loan Through Branch"
										name="l_loan_through_branch"
										formControlName={formik.values.l_loan_through_branch}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										data={[
											{ code: "KB", name: "Kasba" },
											{ code: "NB", name: "Nabagram" },
											{ code: "KG", name: "Konnagar" },
										]}
										mode={2}
									/>
									{formik.errors.l_loan_through_branch &&
									formik.touched.l_loan_through_branch ? (
										<VError title={formik.errors.l_loan_through_branch} />
									) : null}
								</div>
								<div>
									<TDInputTemplate
										placeholder="Type Applied For..."
										type="text"
										label="Applied For"
										name="l_applied_for"
										formControlName={formik.values.l_applied_for}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										data={[
											{ code: "H", name: "Home Loan" },
											{ code: "C", name: "Car Loan" },
											{ code: "P", name: "Personal Loan" },
										]}
										mode={2}
									/>
									{formik.errors.l_applied_for &&
									formik.touched.l_applied_for ? (
										<VError title={formik.errors.l_applied_for} />
									) : null}
								</div>
								<div>
									<TDInputTemplate
										placeholder="Type Loan Amount..."
										type="number"
										label="Loan Amount"
										name="l_loan_amount"
										formControlName={formik.values.l_loan_amount}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
									/>
									{formik.errors.l_loan_amount &&
									formik.touched.l_loan_amount ? (
										<VError title={formik.errors.l_loan_amount} />
									) : null}
								</div>
								<div>
									<TDInputTemplate
										placeholder="Type Duration..."
										type="number"
										label="Duration (In Months)"
										name="l_duration"
										formControlName={formik.values.l_duration}
										handleChange={formik.handleChange}
										handleBlur={formik.handleBlur}
										mode={1}
									/>
									{formik.errors.l_duration && formik.touched.l_duration ? (
										<VError title={formik.errors.l_duration} />
									) : null}
								</div>
							</div>

							<div className="mt-20">
								<BtnComp mode="A" onReset={formik.handleReset} />
							</div>
						</div>
					</form>
				</Spin>
			</div>
		</section>
	)
}

export default LoanForm
