import React from "react"
import "./Menus.css"
import {
	BarChartOutlined,
	DatabaseOutlined,
	ProjectOutlined,
	BlockOutlined,
	ToolOutlined,
	UserAddOutlined,
	UserSwitchOutlined,
	ShopOutlined,
	PicRightOutlined,
	HddOutlined,
	BarsOutlined,
	ArrowRightOutlined,
	ArrowLeftOutlined,
	SwapOutlined,
	NodeExpandOutlined,
	NodeCollapseOutlined,
	AuditOutlined,
	UserOutlined,
	SolutionOutlined,
	ReconciliationOutlined,
	PayCircleOutlined,
	IdcardOutlined,
	BankOutlined,
	MailOutlined,
	PercentageOutlined,
	DropboxOutlined,
	CheckCircleOutlined,
	IssuesCloseOutlined,
	SignatureOutlined,
	CloseCircleOutlined,
	TruckOutlined,
} from "@ant-design/icons"
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
		// {
		// 	label: "Loan",
		// 	key: "sub2",
		// 	icon: <DatabaseOutlined />,
		// 	children: [
		// 		{
		// 			key: "masters:dept",
		// 			icon: <BankOutlined />,
		// 			label: <Link to={routePaths.DEPARTMENTS}>Department</Link>,
		// 		},
		// 		// {
		// 		//   key: "masters:desig",
		// 		//   icon: <IdcardOutlined />,
		// 		//   label: <Link to={routePaths.DESIGNATIONS}>Designation</Link>,
		// 		// },
		// 		{
		// 			key: "masters:cat",
		// 			icon: <BlockOutlined />,
		// 			label: <Link to={routePaths.CATEGORIES}>Product Category</Link>,
		// 		},
		// 		// {
		// 		//   key: "masters:3",
		// 		//   icon: <ProjectOutlined />,
		// 		//   label: <Link to={routePaths.PROJECTS}>Projects</Link>,
		// 		// },

		// 		{
		// 			key: "masters:unit",
		// 			icon: <PayCircleOutlined />,
		// 			label: <Link to={routePaths.UNITS}>Unit</Link>,
		// 		},
		// 		{
		// 			key: "masters:product",
		// 			icon: <ToolOutlined />,
		// 			label: <Link to={routePaths.PRODUCTS}>Product</Link>,
		// 		},
		// 		{
		// 			key: "masters:vendor",
		// 			icon: <ShopOutlined />,
		// 			label: <Link to={routePaths.VENDORS}>Vendor</Link>,
		// 		},
		// 		{
		// 			key: "masters:client",
		// 			icon: <UserSwitchOutlined />,
		// 			label: <Link to={routePaths.CLIENTS}>Client </Link>,
		// 		},
		// 		{
		// 			key: "masters:gst",
		// 			icon: <PercentageOutlined />,
		// 			label: <Link to={routePaths.GST}>GST </Link>,
		// 		},
		// 		// {
		// 		//   key: "masters:user",
		// 		//   icon: <UserAddOutlined />,
		// 		//   label: <Link to={routePaths.USERS}>Company User </Link>,
		// 		// },
		// 	],
		// },

		// {
		// 	label: "Orders",
		// 	key: "sub4",
		// 	icon: <AuditOutlined />,
		// 	children: [
		// 		{
		// 			// key: "client-order",
		// 			// icon: <UserOutlined />,
		// 			// label: <Link to={routePaths.CLIENTORDER}>Client Orders</Link>,
		// 			key: "master:projects",
		// 			icon: <UserSwitchOutlined />,
		// 			label: <Link to={routePaths.PROJECTS}>Client Orders</Link>,
		// 		},
		// 		{
		// 			label: (
		// 				<Link to={routePaths.PURCHASEORDER + "/P"}>Vendor Orders</Link>
		// 			),
		// 			key: "purchase-order",
		// 			icon: <SolutionOutlined />,
		// 		},

		// 		{
		// 			label: (
		// 				<Link to={routePaths.EXISTINGORDER}>Existing Purchase Orders</Link>
		// 			),
		// 			key: "existing-order",
		// 			icon: <CheckCircleOutlined />,
		// 		},
		// 		{
		// 			label: <Link to={routePaths.AMENDORDER}>Amend Purchase Orders</Link>,
		// 			key: "amend-order",
		// 			icon: <SignatureOutlined />,
		// 		},
		// 		{
		// 			// label: <Link to={routePaths.PURCHASEORDER+'/A'}>Approve Vendor Orders</Link>,
		// 			label: (
		// 				<Link to={routePaths.APPROVEORDER}>Approve Vendor Orders</Link>
		// 			),
		// 			key: "approve-purchase-order",
		// 			icon: <CheckOutlined />,
		// 		},

		// 		// {
		// 		//   label: <Link to={routePaths.CANCELHOME}>Cancel Purchase Orders</Link>,
		// 		//   key: "cancel-purchase-order",
		// 		//   icon: <CloseCircleOutlined />,
		// 		// }
		// 	],
		// },
		// {
		// 	label: <Link to={routePaths.TESTCERTHOME}>Upload Test Certificate</Link>,
		// 	key: "uploadtc-purchase-order",
		// 	icon: <UploadFileOutlined />,
		// },
		// {
		// 	label: <Link to={routePaths.MDCCHOME}>Upload MDCC</Link>,
		// 	key: "mdcc-purchase-order",
		// 	icon: <UploadFileOutlined />,
		// },
		// {
		// 	label: "Delivery",
		// 	key: "material-delivery",
		// 	icon: <TruckOutlined />,
		// 	children: [
		// 		{
		// 			label: <Link to={routePaths.DELIVERYCUSTOMERVIEW}>To Customer</Link>,
		// 			key: "to-cus",
		// 			icon: <UserOutlined />,
		// 		},

		// 		{
		// 			label: <Link to={routePaths.STOCKASSIGNVIEW}>To Warehouse</Link>,
		// 			key: "to-ware",
		// 			icon: <ShopOutlined />,
		// 		},
		// 	],
		// },
		// {
		// 	label: "Stock",
		// 	key: "sub5",
		// 	icon: <DropboxOutlined />,
		// 	children: [
		// 		{
		// 			label: <Link to={routePaths.STOCKUPDATE}>Open/Update Stock</Link>,
		// 			key: "stock-update",
		// 			icon: <DropboxOutlined />,
		// 		},

		// 		{
		// 			label: <Link to={routePaths.STOCKASSIGNVIEW}>Assign</Link>,
		// 			key: "stock-assign",
		// 			icon: <ReconciliationOutlined />,
		// 		},
		// 		{
		// 			label: <Link to={routePaths.STOCKINVIEW}>Stock In</Link>,
		// 			key: "stock-in",
		// 			icon: <ArrowRightOutlined />,
		// 		},
		// 		{
		// 			label: <Link to={routePaths.STOCKOUTVIEW}>Stock Out</Link>,
		// 			key: "stock-out",
		// 			icon: <ArrowLeftOutlined />,
		// 		},
		// 		{
		// 			label: "Transfer",
		// 			key: "stock-trans",
		// 			icon: <SwapOutlined />,
		// 			children: [
		// 				{
		// 					label: (
		// 						<Link to={routePaths.REQUISITIONSENTVIEW}>
		// 							Requisitions sent
		// 						</Link>
		// 					),
		// 					key: "req-mk",
		// 					icon: <NodeExpandOutlined />,
		// 				},
		// 				{
		// 					label: (
		// 						<Link to={routePaths.REQUISITIONRCVDVIEW}>
		// 							Requisitions received
		// 						</Link>
		// 					),
		// 					key: "req-rec",
		// 					icon: <NodeCollapseOutlined />,
		// 				},
		// 			],
		// 		},
		// 	],
		// },

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
