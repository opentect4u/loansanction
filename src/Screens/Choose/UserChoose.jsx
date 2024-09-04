import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import IMG from "../../Assets/Images/puri_flyer.jpg"
import LOGO from "../../Assets/Images/purdcs.png"
import { motion } from "framer-motion"
import { routePaths } from "../../Assets/Data/Routes"
import {
	SaveOutlined,
	DeleteOutlined,
	ReloadOutlined,
	DollarOutlined,
	UserOutlined,
} from "@ant-design/icons"

function UserChoose() {
	const navigate = useNavigate()

	return (
		<div
			className="bg-red-800 p-20 flex justify-center min-h-screen min-w-screen"
			style={{
				backgroundImage: `url(${IMG})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
		>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, type: "spring" }}
				className="grid grid-cols-2 gap-0 h-auto w-4/5"
			>
				{/* <div className="sm:p-5 sm:block rounded-l-3xl bg-gradient-to-r from-white from-60% via-sky-500 via-30% to-[#ffffff8c] to-10%"> */}
				<div className="sm:p-5 sm:block rounded-l-3xl border-white border--0 bg-gradient-to-r from-yellow-50 from-10% via-gray-50 via-70% to-[#ffffff8c] to-90%">
					<div className="h-auto w-auto mx-auto bg-transparent rounded-lg p-1">
						<img src={LOGO} className="h-40 w-40" />
					</div>
				</div>
				<div
					className={`sm:p-5 sm:rounded-r-3xl border-white border-l-0 border-2 w-auto h-auto`}
					style={{
						backgroundColor: "rgba(255, 255, 255, 0.55)",
						backdropFilter: "blur(8px)",
						display: "flex",
						justifyContent: "space-evenly",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<div>
						<Link to={routePaths.LOAN_FORM}>
							<div
								className="h-48 w-48 self-center bg-[#6457A6] rounded-full p-1 text-white text-xl"
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "column",
									gap: 10,
								}}
							>
								<DollarOutlined className="text-3xl" />
								<div>Loan Form</div>
							</div>
						</Link>
					</div>
					<div>
						<Link>
							<div
								className="h-48 w-48 self-center bg-[#586BA4] rounded-full p-1 text-white text-xl"
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "column",
									gap: 10,
								}}
							>
								<UserOutlined className="text-3xl" />
								<div>Admin Login</div>
							</div>
						</Link>
					</div>
				</div>
			</motion.div>

			{/* Mobile View */}
			{/* <div className={`block w-80 sm:hidden h-auto space-y-5 rounded-3xl`}>
				<div className={`flex-col items-center justify-center mt-7 p-10`}>
					<div className="flex-col items-center justify-center">
						<motion.h2
							className="text-red-800 text-4xl mt-14 mx-24 font-bold"
							initial={{ opacity: 1 }}
							animate={{ opacity: 0, y: -20 }}
							transition={{ delay: 4, type: "tween" }}
						>
							Welcome
						</motion.h2>
						<motion.img
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 4, type: "spring" }}
							src={LOGO}
							className="h-20 -mt-16 -ml-4 sm:ml-9 2xl:ml-7 2xl:h-24"
							alt="Flowbite Logo"
						/>
					</div>

					<div>Login form template mobile was here...</div>
				</div>
			</div> */}
		</div>
	)
}

export default UserChoose
