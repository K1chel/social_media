import { useState } from "react";
import { toast } from "sonner";

export const usePreviewImage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      toast.error("Please select an image file.");
    }
  };

  return { imageUrl, handleImageChange, setImageUrl };
};
