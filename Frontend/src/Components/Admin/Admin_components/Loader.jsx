import React from 'react'

const Loader = () => {
  return (
    <div className='flex text-blue-600 h-full items-center justify-center'>
        <svg
  width="40"
  height="40"
  viewBox="0 0 50 50"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle
    cx="25"
    cy="25"
    r="20"
    fill="none"
    stroke="currentColor"
    stroke-width="5"
    stroke-linecap="round"
    stroke-dasharray="31.4 31.4"
  >
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 25 25"
      to="360 25 25"
      dur="1s"
      repeatCount="indefinite"
    />
  </circle>
</svg>

    </div>
  )
}

export default Loader