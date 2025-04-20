import { useState, useRef } from "react";
import { Image } from "lucide-react";

export const ImageUpload = ({ onUpload, className, children }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      // Here you would normally upload the file to your storage service
      // For example with Firebase Storage or another cloud storage
      
      // For demonstration, let's create a local URL to preview the image
      const imageUrl = URL.createObjectURL(file);
      
      // Call the parent component's upload handler with the image URL
      onUpload(imageUrl);
      
      // In a real implementation, you would upload to Firebase and get back a URL:
      // const storageRef = ref(storage, `listings/${Date.now()}-${file.name}`);
      // const uploadTask = await uploadBytes(storageRef, file);
      // const downloadUrl = await getDownloadURL(uploadTask.ref);
      // onUpload(downloadUrl);
      
    } catch (error) {
      console.error("Error uploading image:", error);
      // You could add error handling/notification here
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className={`cursor-pointer ${className}`} 
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {isUploading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-sm text-muted-foreground">Uploading...</p>
        </div>
      ) : children ? (
        children
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-2">
          <Image className="w-8 h-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Click to upload</p>
        </div>
      )}
    </div>
  );
};