
import { Button } from "@/components/ui/button"
import React from "react"

interface ImageUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  onUpload: (url: string) => void
  children?: React.ReactNode
}

export function ImageUpload({ onUpload, children, ...props }: ImageUploadProps) {
  const handleClick = () => {
    // This is a mock upload that uses a placeholder image
    // In a real application, you would implement actual file upload functionality
    const mockImageUrl = "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
    onUpload(mockImageUrl)
  }

  return (
    <div
      className="w-full h-full p-0 cursor-pointer"
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  )
}
