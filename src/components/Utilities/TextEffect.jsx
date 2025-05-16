"use client"

import { AiOutlineUp } from "react-icons/ai"

const TextEffect = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div
      className="bg-gray-700 p-3 cursor-pointer w-full transition-colors hover:bg-gray-600"
      onClick={scrollToTop}
      role="button"
      aria-label="Scroll to top"
    >
      <div className="text-center text-white flex items-center justify-center space-x-2">
        <span className="text-sm sm:text-base">Back to Top</span>
        <AiOutlineUp size={15} />
      </div>
    </div>
  )
}

export default TextEffect
