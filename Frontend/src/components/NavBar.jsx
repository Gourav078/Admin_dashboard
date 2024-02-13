import React from 'react';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400 shadow-lg h-32 flex w-full items-center">
            <div className=" w-full flex items-center justify-between px-4 py-2 ">
                <div className="flex justify-between items-center mx-8  w-full">
                    <div className="text-white text-3xl font-bold">Admin Dashboard</div>
                    <ul className="flex  space-x-6">
                        <li><a href="#" className="text-white text-2xl hover:text-gray-300 transition duration-300">Dashboard</a></li>
                        <li><a href="#" className="text-white text-2xl hover:text-gray-300 transition duration-300">Users</a></li>
                        <li><a href="#" className="text-white text-2xl hover:text-gray-300 transition duration-300">Settings</a></li>
                        <li>
                            <button className="flex items-center text-white text-2xl hover:text-gray-300 transition duration-300">
                                <FaUserCircle className="w-9 h-9 mr-2" />
                                
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
