import React from "react"

export default function TimelineComp({items}) {
	return (
		<Timeline
			// mode="alternate"
			items={rejectReasonsArray?.map((item, i) => ({
				key: i,
				color: "green",
				children: (
					<>
						<p>{new Date(item?.forwarded_dt).toLocaleString("en-GB")}</p>
						<p>{item?.fwd_name}</p>
						<p>{item?.reject_remarks}</p>
					</>
				),
			}))}
		/>
	)
}
