import React, { useState } from "react"
import "./Menus.css"
import {
	BarChartOutlined,
	BarsOutlined,
	LogoutOutlined,
	ArrowRightOutlined,
	MinusCircleOutlined,
} from "@ant-design/icons"
import { Menu } from "antd"
import { Link } from "react-router-dom"
import { routePaths } from "../Assets/Data/Routes"
import { CheckOutlined, UploadFileOutlined } from "@mui/icons-material"
import IMG from "../Assets/Images/purdcs.png"
import Tooltip from "@mui/material/Tooltip"
import { useNavigate } from "react-router-dom"
import DialogBox from "./DialogBox"

function Menus({ theme }) {
	const [current, setCurrent] = React.useState("sub1")
	const [visibleModal, setVisibleModal] = useState(() => false)

	const navigate = useNavigate()

	const onClick = (e) => {
		console.log("click ", e)
		setCurrent(e.key)
	}

	const items = [
		{
			key: "sub1",
			icon: <BarChartOutlined />,
			label: <Link to={"/appraiser/home"}>Dashboard</Link>,
		},
		{
			key: "sub2",
			icon: <ArrowRightOutlined />,
			label: <Link to={"/appraiser/home/fwdapplication"}>Forward</Link>,
		},
		{
			key: "sub3",
			icon: <MinusCircleOutlined />,
			label: <Link to={"/appraiser/home/rejectapplication"}>Reject</Link>,
		},
		{
			label: "Reports",
			key: "sub6",
			icon: <BarsOutlined />,
		},
	]

	// const logOut = () => {
	// 	localStorage.clear()
	// 	navigate(routePaths.LANDING)
	// }

	return (
		<div className="bg-[#EEEEEE44] flex justify-between align-middle gap-4 rounded-full">
			<img src={IMG} className="w-14 h-14 p-2 -mr-6" alt="Flowbite Logo" />
			<Menu
				onClick={onClick}
				selectedKeys={[current]}
				items={items}
				mode="horizontal"
				style={{
					width: 1000,
					backgroundColor: "transparent",
					// boxShadow: "none",
					border: "none",
				}}
				className="rounded-full items-center justify-center"
			/>
			<Tooltip title="Log Out" placement="bottom">
				<button
					onClick={() => setVisibleModal(!visibleModal)}
					className="w-10 h-10 bg-yellow-50 flex self-center justify-center items-center rounded-full mr-2"
				>
					<LogoutOutlined className="text-yellow-800 text-lg self-center" />
				</button>
			</Tooltip>
			<DialogBox
				flag={1}
				onPress={() => setVisibleModal(!visibleModal)}
				visible={visibleModal}
				// onPressYes={logOut}
				// onPressNo={() => {
				// 	setVisibleModal(!visibleModal)
				// }}
			/>
		</div>
	)
}

export default Menus