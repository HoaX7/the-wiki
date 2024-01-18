import React from 'react'
import Logo from '../components/Icons/Logo'
import clsx from 'clsx'
import { ISidebarProps } from './ISidebar.props'


export default function Sidebar({ history, search, toggleSearch, reset, toggleSideBar, setShowSearch, showSearch }: ISidebarProps) {
  return (
    <div className={clsx('sidebar h-full lg:w-[20%] md:w-[25%] close-sidebar', toggleSideBar ? "show-sidebar" : "")}>
        <div className='p-3'><Logo /></div>
        <div className='mt-5 mx-3 p-3'>
            <ul>
                <li>
                    <button onClick={reset}>Home</button>
                </li>
                <li className='mt-3'>
                    <button onClick={() => {
                        setShowSearch(!showSearch)
                    }}>Search</button>
                </li>
            </ul>
        </div>
        {history.length > 0 && (
            <div className='mt-5'>
                <span className='text-gray-500 text-lg mx-3 p-3'>History</span>
                <ul className='mt-3'>
                    {history.map((text) => {
                        return (
                            <li className={clsx('px-5 py-1 cursor-pointer mt-1 hover:bg-gray-200', search === text ? "bg-gray-200" : "")}
                                onClick={() => {
                                    toggleSearch(text)
                                }}
                                style={{
                                    wordBreak: "break-all"
                                }}
                            >
                                {text}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )}
    </div>
  )
}
