import React from 'react'
import logo from '../../logo.svg';
import clsx from "clsx";

interface Props {
    size?: "large"
    className?: string
}
export default function Logo({ size, className }: Props) {
  return (
    <div className={clsx('flex items-center', className)}>
        <img src={logo} className="App-logo" alt="logo" width={size === "large" ? 120 : 50} />
        <div className={clsx(size === "large" ? "text-2xl" : "", "font-semibold relative")}>The Wiki
            <span className='absolute text-sm'>
                Search
            </span>
        </div>
    </div>
  )
}
