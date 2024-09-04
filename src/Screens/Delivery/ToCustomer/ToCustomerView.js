import React from 'react'
import { routePaths } from '../../../Assets/Data/Routes'
import { PrinterOutlined, TruckOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { Tooltip } from '@mui/material'
import { Link } from 'react-router-dom'
function ToCustomerView() {
  return (
    <div>
        <div className="flex items-center  justify-end h-14 -mt-[72px] w-auto dark:bg-[#22543d] md:flex-row space-y-3 md:space-y-0 rounded-lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, type: "just" }}
          className="w-full hidden md:block  md:w-auto sm:flex sm:flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
        >
          <Tooltip title={"Enter Delivery Details"}>
            <Link
              to={routePaths.DELIVERYCUSTOMERFORM + 0}
              type="submit"
              className="flex items-center justify-center border-2 border-white border-r-0 text-white bg-green-900 hover:bg-primary-800 text-nowrap rounded-l-md transition ease-in-out  active:scale-90 text-sm p-1 px-2 dark:bg-gray-800 dark:text-white dark:hover:bg-primary-700 focus:outline-none shadow-lg  hover:duration-500 hover:shadow-lg dark:focus:ring-primary-800 ml-2 capitalize"
            >
              <TruckOutlined className="text-sm mx-1" /> {"Enter Delivery Details"}
            </Link>
          </Tooltip>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, type: "just" }}
          className={
            "bg-white border-2 border-l-0 text-green-900 font-semibold text-lg rounded-r-full p-0.5 shadow-lg"
          }
        >
          <Tooltip title="Print this table" arrow>
            <PrinterOutlined />
          </Tooltip>
        </motion.button>
      </div>
    </div>
  )
}

export default ToCustomerView
