import React from "react";
import { routePaths } from "../../Assets/Data/Routes";
import { Link } from "react-router-dom";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Tag } from "antd";

const RequisitionSentView = () => {
  const add = 0;
  const edit = 1;
  return (
    <section className="bg-white dark:bg-[#001529] p-3 sm:p-5 w-full">
      <div className="mx-auto w-full px-1">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col bg-[#22543d] dark:bg-[#22543d] md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-full ">
              <form className="flex items-center">
                <h2 className="text-sm text-nowrap font-bold text-white dark:text-white sm:block hidden mx-5">
                  Requisitions Sent
                </h2>
                <label for="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border rounded-full border-gray-300 text-gray-900 text-sm focus:ring-gray-600 focus:border-gray-600 block w-full pl-10 p-2 dark:bg-gray-800 focus:border-1 duration-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search"
                    required=""
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              {/* <Link to={`/home/mastersComp/users/useraddform/${add}`}> */}
              <Link
                to={`${routePaths.REQUISITIONSENDFORM}${add}`}
                className="flex items-center justify-center text-gray-600 bg-white hover:bg-primary-800 focus:ring-green-900 font-medium rounded-full hover:scale-110 text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none  transition duration-0 hover:duration-500 hover:shadow-lg dark:focus:ring-primary-800 dark:bg-gray-800 dark:text-white "
              >
                <PlusOutlined />
                Add Requisition
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-green-900  w-1/4 dark:text-gray-300"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-green-900  w-1/4 dark:text-gray-300"
                  >
                    Project Manager
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-green-900  w-1/4 dark:text-gray-300"
                  >
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-green-900  w-1/4 dark:text-gray-300"
                  >
                    Project Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-green-900  w-1/4 dark:text-gray-300"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-green-900  w-1/4 dark:text-gray-300"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="px-4 py-3 w-1/4">abc</td>
                  <td className="px-4 py-3 w-1/4">xyz</td>
                  <td className="px-4 py-3 w-1/4">xyz</td>
                  <td className="px-4 py-3 w-1/4">
                    {" "}
                    <Tag bordered={true} color="error">
                      On Hold
                    </Tag>
                  </td>
                  <td className="px-4 py-3 w-1/4">
                    <Link to={`${routePaths.ORDERFORM}1`}>
                      <EditOutlined className="text-green-900" />
                    </Link>
                  </td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    2
                  </th>
                  <td className="px-4 py-3">abc</td>
                  <td className="px-4 py-3">xyz</td>
                  <td className="px-4 py-3 w-1/4">xyz</td>
                  <td className="px-4 py-3">
                    {" "}
                    <Tag bordered={true} color="success">
                      Cost Waived
                    </Tag>
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`${routePaths.ORDERFORM}1`}>
                      <EditOutlined className="text-green-900" />
                    </Link>
                  </td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    3
                  </th>
                  <td className="px-4 py-3">abc</td>
                  <td className="px-4 py-3">xyz</td>
                  <td className="px-4 py-3 w-1/4">xyz</td>
                  <td className="px-4 py-3">
                    {" "}
                    <Tag bordered={true} color="processing">
                      Waiver initiated
                    </Tag>
                  </td>
                  <td className="px-4 py-3">
                    <EditOutlined className="text-green-900" />
                  </td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    4
                  </th>
                  <td className="px-4 py-3">abc</td>
                  <td className="px-4 py-3">xyz</td>
                  <td className="px-4 py-3 w-1/4">xyz</td>
                  <td className="px-4 py-3">
                    {" "}
                    <Tag bordered={true} color="error">
                      On hold
                    </Tag>
                  </td>
                  <td className="px-4 py-3">
                    <EditOutlined className="text-green-900" />
                  </td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    5
                  </th>
                  <td className="px-4 py-3">abc</td>
                  <td className="px-4 py-3">xyz</td>
                  <td className="px-4 py-3 w-1/4">xyz</td>
                  <td className="px-4 py-3">
                    {" "}
                    <Tag bordered={true} color="success">
                      Cost Waived
                    </Tag>
                  </td>
                  <td className="px-4 py-3">
                    <EditOutlined className="text-green-900" />
                  </td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    6
                  </th>
                  <td className="px-4 py-3">abc</td>
                  <td className="px-4 py-3">xyz</td>
                  <td className="px-4 py-3 w-1/4">xyz</td>
                  <td className="px-4 py-3">
                    {" "}
                    <Tag bordered={true} color="success">
                      Cost Waived
                    </Tag>
                  </td>
                  <td className="px-4 py-3">
                    <EditOutlined className="text-green-900" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span className="font-semibold text-gray-900 dark:text-white">
                1-10
              </span>
              of
              <span className="font-semibold text-gray-900 dark:text-white">
                1000
              </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  ...
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  100
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default RequisitionSentView;
