import React, { useEffect, useState } from "react"
import "../LoanForm/LoanForm.css"
import { useParams } from "react-router"
import BtnComp from "../../Components/BtnComp"
import VError from "../../Components/VError"
import TDInputTemplate from "../../Components/TDInputTemplate"
import { useNavigate } from "react-router-dom"
import { FieldArray, Formik, useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { Message } from "../../Components/Message"
import { url } from "../../Address/BaseUrl"
import { Spin, Button } from "antd"
import {
	LoadingOutlined,
	DeleteOutlined,
	PlusOutlined,
	MinusOutlined,
} from "@ant-design/icons"
import FormHeader from "../../Components/FormHeader"
import { routePaths } from "../../Assets/Data/Routes"
import { useLocation } from "react-router"
import Sidebar from "../../Components/Sidebar"

const MAX_FILE_SIZE = 200000

function EditLoanForm() {
	const params = useParams()
	const [loading, setLoading] = useState(false)

	const location = useLocation()
	const { loanAppData } = location.state || {}
	const navigate = useNavigate()

	const [count, setCount] = useState(() => 0)
	const [branches, setBranches] = useState(() => [])
	const [loanTypes, setLoanTypes] = useState(() => [])
	const [applicationId, setApplicationId] = useState(() => "")
	const [pdfFiles, setPdfFiles] = useState(() => [])
	const [singlePdfFile, setSinglePdfFile] = useState(() => null)

	console.log(params, "params")
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
		l_documents: [{ sl_no: 0, l_file_name: "", l_file: "" }],
	}
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
		l_documents: [{ sl_no: 0, l_file_name: "", l_file: "" }],
	})

	

	const getExtension = (fileName) => {
		if (!fileName) return ""
		const lastDotIndex = fileName.lastIndexOf(".")
		return lastDotIndex !== -1
			? fileName.slice(lastDotIndex + 1).toLowerCase()
			: ""
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
		l_email: Yup.string().email("Enter valid email").optional(),
		l_mobile_no: Yup.string()
			.matches(/^[0-9]+$/, "Must be only digits")
			.min(10, "Number should exactly be 10 digits")
			.max(10, "Number should exactly be 10 digits")
			.required("Mobile Numeber is required"),
		l_address: Yup.string()
			.max(500, "Address length should always be less than 500 characters")
			.required("Address is required"),
		l_loan_through_branch: Yup.string().required(
			"Loan Through Branch is required"
		),
		l_applied_for: Yup.string().required("Applied For is required"),
		l_loan_amount: Yup.number()
			.integer("Only integers are allowed")
			.min(1, "Loan Amount should always be greater than 0")
			.max(1000000000, "Max loan amount is 1000000000")
			.required("Loan Amount is required"),
		l_duration: Yup.number()
			.min(0, "Duration should always be greater than equal 0")
			.required("Duration is required"),
		// l_documents: Yup.mixed(),

		l_documents: Yup.array().of(
			Yup.object().shape({
				l_file_name: Yup.string(),
				l_file: Yup.mixed(),
			})
		),
		// .test("fileSize", "File too large", (files) =>
		// 	files ? Array.from(files).every((file) => file.size <= 200000000) : true
		// )
		// .test("fileType", "Unsupported File Format", (files) =>
		// 	files
		// 		? Array.from(files).every((file) => file.type === "application/pdf")
		// 		: true
		// ),
		// .test(
		// 	"fileSize",
		// 	"Only documents up to 2MB are permitted.",
		// 	(files) =>
		// 		!files || // Check if `files` is defined
		// 		files.length === 0 || // Check if `files` is not an empty list
		// 		Array.from(files).every((file) => file.size <= 2_000_000_00)
		// )
	})

	const handleFilesChange = (event) => {
		formik.handleChange(event)
		console.log(event)
		const files = event.currentTarget.files

		const pdfFilteredFiles = Array.from(files)?.filter(
			(file) => getExtension(file?.name) === "pdf"
		)

		console.log("iurhgbvfvfrr", event.currentTarget.files)
		console.log("iurhgbvfvfrr================", pdfFilteredFiles)

		setSinglePdfFile(event.currentTarget.files[0])
		// const newFiles = Array.from(pdfFilteredFiles)
		// setPdfFiles([...pdfFiles, ...newFiles])
		setPdfFiles(pdfFilteredFiles) // Store the selected files in state
		// setFieldValue("files", files) // Set Formik value
	}

	const handleRemove = (index, setFieldValue) => {
		const updatedFiles = pdfFiles.filter((_, i) => i !== index) // Remove file by index
		setPdfFiles(updatedFiles)
		// setFieldValue('files', updatedFiles);  // Update Formik field value after removal
	}

	useEffect(() => {
		console.log("Calls when onSubmit api axios success changes...")
	}, [count])

	const fetchBranches = async () => {
		await axios
			.get(`${url}/sql/branch_dtls`)
			.then((res) => {
				if (res?.data?.suc === 1) {
					setBranches(res?.data?.msg)
				} else {
					Message("error", "Data not found!")
				}
			})
			.catch((err) => {
				Message("error", "Some error occurred while fetching Branches.")
			})
	}

	const fetchLoanTypes = async () => {
		await axios
			.get(`${url}/sql/loan_type_dtls`)
			.then((res) => {
				if (res?.data?.suc === 1) {
					setLoanTypes(res?.data?.msg)
				} else {
					Message("error", "Data not found!")
				}
			})
			.catch((err) => {
				Message("error", "Some error occurred while fetching Loan Types.")
			})
	}

	useEffect(() => {
		fetchBranches()
		fetchLoanTypes()
	}, [])

	const handleReset = () => {
		setPdfFiles(() => [])
		setValues(initialValues)
	}

	const onSubmit = async (values) => {
		console.log("onsubmit called")
		console.log(values, "onsubmit vendor")
		setLoading(true)

		var data = new FormData()

		data.append("member_id", +values?.l_member_id)
		data.append("member_name", values?.l_name)
		data.append("father_name", values?.l_father_husband_name)
		data.append("gender", values?.l_gender)
		data.append("dob", values?.l_dob)
		data.append("member_dt", values?.l_membership_date)
		data.append("email", values?.l_email)
		data.append("mobile_no", values?.l_mobile_no)
		data.append("memb_address", values?.l_address)
		data.append("branch_code", values?.l_loan_through_branch)
		data.append("loan_type", values?.l_applied_for)
		data.append("loan_amt", values?.l_loan_amount)
		data.append("loan_period", values?.l_duration)
		data.append("created_by", values?.l_name)

		// data.append("application_no", params.id)
		// data.append("member_id", values?.l_member_id)

		pdfFiles?.forEach((pdf, i) => {
			let file = new File([pdf], `File_Application_${i}` + ".pdf")
			data.append("file_path", file)
		})
		// data.append("file_path", file)

		console.log("FORM DATA", data)

		await axios
			.post(`${url}/sql/insert_loan_dtls`, data)
			.then((res) => {
				console.log("API RESPONSE", res)

				if (res?.data?.suc === 1) {
					Message("success", res?.data?.msg)
					navigate(routePaths.HOME_SCREEN)
				}
			})
			.catch((err) => {
				console.log("EERRRRRRRRRR", err)
			})

		setLoading(false)
	}

	const fetchApplicationDetails = async () => {
		setLoading(true)
		await axios
			.get(`${url}/sql/fetch_loan_dtls?application_no=${params?.id}`)
			.then((res) => {
				if (res?.data?.suc === 1) {
					setValues({
						l_member_id: res?.data?.msg[0]?.member_id,
						l_membership_date:
							new Date(res?.data?.msg[0]?.member_dt)
								?.toISOString()
								?.split("T")[0] || "",
						l_name: res?.data?.msg[0]?.member_name,
						l_father_husband_name: res?.data?.msg[0]?.father_name,
						l_gender: res?.data?.msg[0]?.gender,
						l_dob:
							new Date(res?.data?.msg[0]?.dob)?.toISOString()?.split("T")[0] ||
							"",
						l_email: res?.data?.msg[0]?.email,
						l_mobile_no: res?.data?.msg[0]?.mobile_no,
						l_address: res?.data?.msg[0]?.memb_address,
						l_loan_through_branch: res?.data?.msg[0]?.branch_code,
						l_applied_for: res?.data?.msg[0]?.loan_type,
						l_loan_amount: res?.data?.msg[0]?.loan_amt,
						l_duration: res?.data?.msg[0]?.loan_period,
						l_documents: [{ sl_no: 0, l_file_name: "", l_file: "" }],

					})
				} else {
					Message("warning", "No data found!")
				}
			})
			.catch((err) => {
				console.log("Error loan", err)
				Message("error", "Some error occurred while fetching loan details.")
			})
		setLoading(false)
	}

	useEffect(() => {
		fetchApplicationDetails()
	}, [])

	const formik = useFormik({
		initialValues: formValues,
		onSubmit,
		validationSchema,
		validateOnChange: true,
		validateOnBlur: true,
		enableReinitialize: true,
		validateOnMount: true,
	})

	return (
		<>
			<Sidebar />
			<section className="bg-red-50 dark:bg-[#001529] flex justify-center align-middle p-5">
				{/* {params.id>0 && data && <PrintComp toPrint={data} title={'Department'}/>} */}
				{/* <HeadingTemplate
				text={params.id > 0 ? "Update vendor" : "Add vendor"}
				mode={params.id > 0 ? 1 : 0}
				title={"Vendor"}
				data={params.id && data ? data : ""}
			/> */}
				{/* {JSON.stringify(loanAppData)} */}
				<div className=" bg-white p-5 w-4/5 min-h-screen rounded-3xl">
					<div className="w-auto mx-14 my-4">
						<FormHeader text="Loan Application Preview & Edit" />
					</div>
					<Spin
						indicator={<LoadingOutlined spin />}
						size="large"
						className="text-red-800 dark:text-gray-400"
						spinning={loading}
					>
						<Formik
							initialValues={formValues}
							validationSchema={validationSchema}
							onSubmit={onSubmit}
							validateOnMount={true}
							enableReinitialize={true}
						>
							{({
								values,
								handleReset,
								handleChange,
								handleBlur,
								handleSubmit,
								errors,
								touched,
							}) => (
								<form>
									<div className="card flex flex-col justify-center px-16 py-5">
										<div className="mb-4">
											<TDInputTemplate
												placeholder="Application Number"
												type="text"
												label="Application Number"
												name="app_no"
												formControlName={params.id}
												mode={1}
												disabled
											/>
										</div>
										<div className="grid gap-4 sm:grid-cols-6 sm:gap-6">
											<div className="sm:col-span-2">
												<TDInputTemplate
													placeholder="Type Member ID..."
													type="text"
													label="Member ID"
													name="l_member_id"
													formControlName={values.l_member_id}
													handleChange={handleChange}
													handleBlur={handleBlur}
													mode={1}
												/>
												{errors.l_member_id && touched.l_member_id ? (
													<VError title={errors.l_member_id} />
												) : null}
											</div>
											<div className="sm:col-span-2">
												<TDInputTemplate
													placeholder="Type Membership Date..."
													type="date"
													label="Membership Date"
													name="l_membership_date"
													formControlName={values.l_membership_date}
													handleChange={handleChange}
													handleBlur={handleBlur}
													min={"1900-12-31"}
													mode={1}
												/>
												{errors.l_membership_date &&
												touched.l_membership_date ? (
													<VError title={errors.l_membership_date} />
												) : null}
											</div>
											<div className="sm:col-span-2">
												<TDInputTemplate
													placeholder="Type name..."
													type="text"
													label="Name"
													name="l_name"
													formControlName={values.l_name}
													handleChange={handleChange}
													handleBlur={handleBlur}
													mode={1}
												/>
												{errors.l_name && touched.l_name ? (
													<VError title={errors.l_name} />
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
													formControlName={values.l_father_husband_name}
													handleChange={handleChange}
													handleBlur={handleBlur}
													mode={1}
												/>
												{errors.l_father_husband_name &&
												touched.l_father_husband_name ? (
													<VError title={errors.l_father_husband_name} />
												) : null}
											</div>
											<div>
												<TDInputTemplate
													placeholder="Select Gender..."
													type="text"
													label="Gender"
													name="l_gender"
													formControlName={values.l_gender}
													handleChange={handleChange}
													handleBlur={handleBlur}
													data={[
														{ code: "M", name: "Male" },
														{ code: "F", name: "Female" },
														{ code: "L", name: "LGBTQA+" },
													]}
													mode={2}
												/>
												{errors.l_gender && touched.l_gender ? (
													<VError title={errors.l_gender} />
												) : null}
											</div>
											<div>
												<TDInputTemplate
													placeholder="Type DOB..."
													type="date"
													label="Date of Birth (DOB)"
													name="l_dob"
													formControlName={values.l_dob}
													handleChange={handleChange}
													handleBlur={handleBlur}
													max={values.l_membership_date}
													mode={1}
												/>
												{errors.l_dob && touched.l_dob ? (
													<VError title={errors.l_dob} />
												) : null}
											</div>
											<div>
												<TDInputTemplate
													placeholder="Type Email..."
													type="email"
													label="Email"
													name="l_email"
													formControlName={values.l_email}
													handleChange={handleChange}
													handleBlur={handleBlur}
													mode={1}
												/>
												{errors.l_email && touched.l_email ? (
													<VError title={errors.l_email} />
												) : null}
											</div>
											<div>
												<TDInputTemplate
													placeholder="Type Address..."
													type="text"
													label={`Address`}
													name="l_address"
													formControlName={values.l_address}
													handleChange={handleChange}
													handleBlur={handleBlur}
													mode={3}
												/>
												{errors.l_address && touched.l_address ? (
													<VError title={errors.l_address} />
												) : null}
											</div>
											<div>
												<TDInputTemplate
													placeholder="Type Mobile Number..."
													type="number"
													label="Mobile Number"
													name="l_mobile_no"
													formControlName={values.l_mobile_no}
													handleChange={handleChange}
													handleBlur={handleBlur}
													mode={1}
												/>
												{errors.l_mobile_no && touched.l_mobile_no ? (
													<VError title={errors.l_mobile_no} />
												) : null}
											</div>
											<div>
												<TDInputTemplate
													placeholder="Type Loan Through Branch..."
													type="text"
													label="Loan Through Branch"
													name="l_loan_through_branch"
													formControlName={values.l_loan_through_branch}
													handleChange={handleChange}
													handleBlur={handleBlur}
													data={branches?.map((branch) => ({
														code: branch?.sl_no,
														name: branch?.branch_name,
													}))}
													mode={2}
												/>
												{errors.l_loan_through_branch &&
												touched.l_loan_through_branch ? (
													<VError title={errors.l_loan_through_branch} />
												) : null}
											</div>
											<div>
												<TDInputTemplate
													placeholder="Type Applied For..."
													type="text"
													label="Applied For"
													name="l_applied_for"
													formControlName={values.l_applied_for}
													handleChange={handleChange}
													handleBlur={handleBlur}
													data={loanTypes?.map((loan) => ({
														code: loan?.sl_no,
														name: loan?.loan_type,
													}))}
													mode={2}
												/>
												{errors.l_applied_for && touched.l_applied_for ? (
													<VError title={errors.l_applied_for} />
												) : null}
											</div>
											<div>
												<TDInputTemplate
													placeholder="Type Loan Amount..."
													type="number"
													label="Loan Amount"
													name="l_loan_amount"
													formControlName={values.l_loan_amount}
													handleChange={handleChange}
													handleBlur={handleBlur}
													mode={1}
												/>
												{errors.l_loan_amount && touched.l_loan_amount ? (
													<VError title={errors.l_loan_amount} />
												) : null}
											</div>
											<div>
												<TDInputTemplate
													placeholder="Type Duration..."
													type="number"
													label="Duration (In Months)"
													name="l_duration"
													formControlName={values.l_duration}
													handleChange={handleChange}
													handleBlur={handleBlur}
													mode={1}
												/>
												{errors.l_duration && touched.l_duration ? (
													<VError title={errors.l_duration} />
												) : null}
											</div>
										</div>
                                        
										<FieldArray name="l_documents">
											{({ push, remove, insert, unshift }) => (
												<>

													{values.l_documents?.map((item, index) => (
														<React.Fragment key={index}>
																<div>
																	<TDInputTemplate
																		placeholder="Type File Name..."
																		type="text"
																		label="File Name"
																		name={`l_documents[${index}].l_file_name`}
																		formControlName={item.l_file_name}
																		handleChange={handleChange}
																		handleBlur={handleBlur}
																		mode={1}
																	/>
																	{/* {errors.l_file_name &&
															touched.l_file_name ? (
																<VError title={errors.l_file_name} />
															) : null} */}
																</div>
																<div>
																	<TDInputTemplate
																		placeholder="Upload Documents"
																		type="file"
																		multiple={true}
																		accept="application/pdf"
																		label="Upload Documents"
																		name={`l_documents[${index}].l_file`}
																		formControlName={item.l_file}
																		// handleChange={(e) => {
																		// 	console.log("SINGLE FILE", e.target.files)
																		// 	setSelectedFile(e.target.files[0])
																		// }}
																		handleChange={handleFilesChange}
																		handleBlur={handleBlur}
																		mode={1}
																	/>
																	{/* {errors.l_file && touched.l_file ? (
																<VError title={errors.l_file} />
															) : null} */}
																</div>
																<div>
																	<Button
																		className="rounded-full text-white bg-red-800 border-red-800"
																		onClick={() => remove(index)}
																		icon={<MinusOutlined />}
																	></Button>
																</div>
														</React.Fragment>
													))}

													<div className="sm:col-span-1"></div>
													<div className="sm:col-span-1 flex gap-2 justify-end item-center mt-5">
														{/* {values.l_documents?.length > 1 && (
														<Button
															className="rounded-full text-white bg-red-800 border-red-800"
																										<>oooooooooooooooooooooooooooooooooooooooooooooo
			onClick={() => arrayHelpers.remove(index)}
															icon={<MinusOutlined />}
														></Button>
													)} */}

														<Button
															className="rounded-full bg-yellow-400 text-white"
															onClick={() =>
																push({
																	sl_no: 0,
																	l_file_name: "",
																	l_file: "",
																})
															}
															icon={<PlusOutlined />}
														></Button>
													</div>
												</>
											)}
										</FieldArray>

										<div className="grid gap-4 sm:grid-cols-2 sm:gap-6 place-items-center p-5">
											{pdfFiles &&
												Array.from(pdfFiles).map((file, index) => (
													<div key={index}>
														{/* <p>{file.name}</p>
													<a
														href={URL.createObjectURL(file)}
														download={file.name}
													>
														Download PDF
													</a> */}
														<embed
															src={URL.createObjectURL(file)}
															className="rounded-lg"
															width="400"
															height="500"
															type="application/pdf"
														/>
														<button
															type="button"
															onClick={() => handleRemove(index)}
															className="w-8 h-2 p-5 bg-red-800 text-white text-lg mt-3 flex justify-center items-center rounded-lg"
														>
															<DeleteOutlined />
														</button>
													</div>
												))}
										</div>

										<div className="mt-10">
											<BtnComp
												mode="A"
												rejectBtn={true}
												onReject={() =>
													Message("error", "Rejected Application!")
												}
												onReset={handleReset}
											/>
										</div>
									</div>
								</form>
							)}
						</Formik>

						{/* </form> */}
					</Spin>
				</div>
			</section>
		</>
	)
}

export default EditLoanForm
