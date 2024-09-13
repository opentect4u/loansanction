import React, { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Header from "../../Components/Header"
import Sidebar from "../../Components/Sidebar"
import BreadCrumbComp from "../../Components/BreadCrumbComp"
import { ScrollTop } from "primereact/scrolltop"
import { ErrorBoundary } from "react-error-boundary"
import Error from "../../Components/Error"

function HomeBr() {
	const location = useLocation()
	const paths = location.pathname.split("/")
	// const [theme, setTheme] = useState(localStorage.getItem("col"))
	// console.log(paths)
	// useState(() => {
	// 	setTheme(localStorage.getItem("col"))
	// }, [localStorage.getItem("col")])

	return (
		<div>
			{/* <Header /> */}
			<Sidebar mode={1} />
			<div className="px-6 w-auto bg-blue-50 dark:bg-gray-800 min-h-screen ">
				<div
					className={
						"p-4 h-auto rounded-3xl bg-transparent dark:border-gray-700 dark:bg-transparent dark:text-white min-w-screen-xl"
					}
				>
					{!(paths.length == 2 && paths[1] == "home") && <BreadCrumbComp />}
					{/* <BreadCrumbComp /> */}
					<ErrorBoundary
						FallbackComponent={Error}
						onError={(error) => {
							console.error(error)
						}}
					>
						<ScrollTop style={{ backgroundColor: "#92140C" }} />

						<Outlet />
					</ErrorBoundary>
				</div>
			</div>
		</div>
	)
}

export default HomeBr
