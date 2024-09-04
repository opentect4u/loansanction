import React, { useState } from 'react'
import HeadingTemplate from '../../Components/HeadingTemplate';
import { DeleteFilled,EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
const data = [
    { id: 1, date: '08 May 2024', text: 'Lorem ipsum dolor sit amet. Sit velit esse a quia voluptas ut harum deleniti qui pariatur officiis et dolorem maiores.....' },
    { id: 2, date: '07 May 2024', text: 'Lorem ipsum dolor sit amet. Sit velit esse a quia voluptas ut harum deleniti qui pariatur officiis et dolorem maiores.....' },
    { id: 3, date: '05 May 2024', text: 'Lorem ipsum dolor sit amet. Sit velit esse a quia voluptas ut harum deleniti qui pariatur officiis et dolorem maiores.....' },
    { id: 4, date: '02 May 2024', text: 'Lorem ipsum dolor sit amet. Sit velit esse a quia voluptas ut harum deleniti qui pariatur officiis et dolorem maiores.....' },
    { id: 5, date: '01 May 2024', text: 'Lorem ipsum dolor sit amet. Sit velit esse a quia voluptas ut harum deleniti qui pariatur officiis et dolorem maiores.....' },
];
function NotificationView() {
    const [checkedState, setCheckedState] = useState(new Array(data.length).fill(false));
    const [allChecked, setAllChecked] = useState(false);

    const handleCheckboxChange = (index) => {
        const updatedCheckedState = checkedState.map((item, idx) =>
            idx === index ? !item : item
        );
        setCheckedState(updatedCheckedState);
        setAllChecked(updatedCheckedState.every((item) => item));
    };

    const handleSelectAllChange = () => {
        const newCheckedState = !allChecked;
        setCheckedState(new Array(data.length).fill(newCheckedState));
        setAllChecked(newCheckedState);
    };

    const handleDeleteAll = () => {
        // Handle delete all action
    };

    const anyChecked = checkedState.some((item) => item);
    return (

        <section className="bg-transparent dark:bg-[#001529]">
            <HeadingTemplate
                text={"Notifications"}
            // title={'Project'}
            />
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="text-xs text-gray-700 uppercase flex items-center bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                {/* <tr> */}
                    <div className="p-4">
                        {/* {anyChecked && ( */}
                            <div className="flex items-center w-full">
                                <input
                                    id="checkbox-select-all"
                                    type="checkbox"
                                    className="w-4 h-4 text-green-900 bg-gray-100 border-gray-300 rounded focus:ring-green-900 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    checked={allChecked}
                                    onChange={handleSelectAllChange}
                                />
                                <label htmlFor="checkbox-select-all" className="sr-only">Select All</label>
                            </div>
                        {/* )} */}
                    </div>
                    {anyChecked && (<div className='p-2'>
                        <Button
                                className="text-red-800 ml-2"
                                icon={<EyeOutlined />}
                                onClick={handleDeleteAll}
                            >
                                Read
                            </Button>
                        <Button
                                className="text-red-800 ml-2"
                                icon={<EyeInvisibleOutlined />}
                                onClick={handleDeleteAll}
                            >
                                Unread
                            </Button>
                            <Button
                                className="text-red-800 ml-2"
                                icon={<DeleteFilled />}
                                onClick={handleDeleteAll}
                            >
                                Delete All
                            </Button>
                     
                    </div>   
                )}
                {/* </tr> */}
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
           
            <tbody>
                {data.map((row, index) => (
                    <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input
                                    id={`checkbox-table-search-${row.id}`}
                                    type="checkbox"
                                    className="w-4 h-4 text-green-900 bg-gray-100 border-gray-300 rounded focus:ring-green-900 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    checked={checkedState[index]}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                                <label htmlFor={`checkbox-table-search-${row.id}`} className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {row.text}
                        </th>
                        <td className="px-6 py-4">
                            {row.date}
                        </td>
                        <td className="flex items-center gap-1 px-6 py-4">
                            {checkedState[index] && (
                                 <><Button className="text-green-900" icon={<EyeOutlined />}>
                                </Button>
                                <Button className="text-red-800" icon={<DeleteFilled />}>
                                    </Button></>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
            </div>






        </section>
    )
}

export default NotificationView