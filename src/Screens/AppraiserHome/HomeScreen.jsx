import React, { useEffect, useState } from "react"
import { Chart } from "primereact/chart"

import { motion } from "framer-motion"
import { Segmented } from "antd"
import {
	InfoCircleOutlined,
	SettingOutlined,
	CloseOutlined,
	SolutionOutlined,
	ProjectOutlined,
	BellOutlined,
	UserAddOutlined,
	SwapOutlined,
	InboxOutlined,
	UserSwitchOutlined,
	FileSearchOutlined,
	BarChartOutlined,
	ExceptionOutlined,
} from "@ant-design/icons"
import { Flex, Progress } from "antd"
import { WidthFull } from "@mui/icons-material"
import DialogBox from "../../Components/DialogBox"
import { routePaths } from "../../Assets/Data/Routes"
import { Link } from "react-router-dom"
import Sidebar from "../../Components/Sidebar"
import LoanApplicationsTableView from "../../Components/LoanApplicationsTableView"
import axios from "axios"
import { url } from "../../Address/BaseUrl"
import { Message } from "../../Components/Message"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

function HomeScreen() {
	const [loading, setLoading] = useState(false)
	const [loanApplications, setLoanApplications] = useState(() => [])
	const [copyLoanApplications, setCopyLoanApplications] = useState(() => [])

	const fetchLoanApplications = async () => {
		setLoading(true)
		await axios
			.get(`${url}/sql/fetch_loan_dtls`)
			.then((res) => {
				if (res?.data?.suc === 1) {
					setLoanApplications(res?.data?.msg)
					setCopyLoanApplications(res?.data?.msg)
				} else {
					Message("error", "No incoming loan applications found.")
				}
			})
			.catch((err) => {
				Message("error", "Some error occurred while fetching loans!")
			})
		setLoading(false)
	}

	useEffect(() => {
		fetchLoanApplications()
	}, [])

	const setSearch = (word) => {
		setLoanApplications(
			copyLoanApplications?.filter(
				(e) =>
					e?.sl_no?.toString()?.toLowerCase().includes(word?.toLowerCase()) ||
					e?.application_no
						?.toString()
						?.toLowerCase()
						?.includes(word?.toLowerCase()) ||
					e?.member_name
						?.toString()
						?.toLowerCase()
						?.includes(word?.toLowerCase()) ||
					e?.branch_name
						?.toString()
						?.toLowerCase()
						?.includes(word?.toLowerCase()) ||
					e?.loan_type_name
						?.toString()
						?.toLowerCase()
						?.includes(word?.toLowerCase())
			)
		)
	}

	return (
		<div>
			<Sidebar />
			<Spin
				indicator={<LoadingOutlined spin />}
				size="large"
				className="text-red-800 dark:text-gray-400"
				spinning={loading}
			>
				<main className="px-4 h-auto my-10 mx-32">
					<LoanApplicationsTableView
						loanAppData={loanApplications}
						title="Loan Applications"
						setSearch={(data) => setSearch(data)}
					/>
					{/* <DialogBox
					visible={visible}
					flag={flag}
					onPress={() => setVisible(false)}
				/> */}
				</main>
			</Spin>
		</div>
	)
}

export default HomeScreen
