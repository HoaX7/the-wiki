import React from 'react'
import { IMenuIconProps } from './props/IMenuicon.props'

export default function MenuIcon({ toggle }: IMenuIconProps) {
  return (
        <button onClick={toggle} className="block md:hidden">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
  )
}
