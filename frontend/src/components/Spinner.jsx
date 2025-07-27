import React from 'react'

const Spinner = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default Spinner
