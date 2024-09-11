import React from "react"
import "./Menus.css"
import { BarChartOutlined, BarsOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import { Link } from "react-router-dom"
import { routePaths } from "../Assets/Data/Routes"
import { CheckOutlined, UploadFileOutlined } from "@mui/icons-material"
import IMG from "../Assets/Images/purdcs.png"

function Menus({ theme }) {
	const [current, setCurrent] = React.useState("sub1")

	const onClick = (e) => {
		console.log("click ", e)
		setCurrent(e.key)
	}

	const items = [
		{
			key: "sub1",
			icon: <BarChartOutlined />,
			label: <Link to={"/appraiser/home"}>Dashboard </Link>,
		},

		{
			label: "Reports",
			key: "sub6",
			icon: <BarsOutlined />,
		},
	]

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
		</div>
	)
}

export default Menus
