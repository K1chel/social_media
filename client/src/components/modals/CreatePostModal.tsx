import { ImageIcon, TrashIcon } from "lucide-react";
import { useContext, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useMedia } from "react-use";

import { postAtom } from "@/atoms/postAtom";
import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useOpenCreatePostStore } from "@/hooks/store/useOpenCreatePostStore";
import { usePreviewImage } from "@/hooks/usePrevieImage";
import { AuthContext } from "@/providers/AuthProvider";
import { IPost } from "@/types";
import { useRecoilState } from "recoil";
import { toast } from "sonner";

export const CreatePostModal = () => {
  const [posts, setPosts] = useRecoilState<IPost[]>(postAtom);
  const { user } = useContext(AuthContext);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { handleImageChange, imageUrl, setImageUrl } = usePreviewImage();
  const { isOpen, onClose } = useOpenCreatePostStore();
  const isMobile = useMedia("(max-width: 640px)");

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, imageSrc: imageUrl }),
      });

      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Post created successfully.");
      setPosts((prev) => [data, ...prev]);
      onClose();
      setImageUrl(null);
      setInputText("");
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full h-full sm:h-auto max-h-screen">
        <div className="absolute top-6 left-6">
          <UserAvatar
            src={user.avatar}
            username={user.username}
            className="size-9"
          />
        </div>
        <form className="pl-11" onSubmit={handleSubmit}>
          <span className="pl-1 text-base font-medium">{user.username}</span>
          <div>
            <TextareaAutosize
              placeholder="Start a post..."
              className="border-none resize-none active:outline-none focus-visible:ring-transparent p-0 w-full bg-transparent outline-none overflow-y-auto placeholder:text-sm placeholder:text-muted-foreground placeholder:font-light text-sm font-light py-1"
              maxRows={isMobile ? 30 : 15}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-x-2">
            {!imageUrl && (
              <Button
                size="icon"
                variant="ghost"
                className="size-7 text-muted-foreground"
                onClick={() => imageInputRef.current?.click()}
                type="button"
                disabled={isLoading}
              >
                <ImageIcon className="size-4" />
                <input
                  hidden
                  type="file"
                  ref={imageInputRef}
                  onChange={handleImageChange}
                />
              </Button>
            )}
          </div>
          {imageUrl && (
            <div className="flex flex-col gap-y-2">
              <img
                src={imageUrl}
                alt="preview"
                className="sm:w-full w-1/2 object-cover rounded max-h-[250px]"
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setImageUrl(null)}
                type="button"
                disabled={isLoading}
              >
                <TrashIcon className="size-4 mr-2" />
                Delete Image
              </Button>
            </div>
          )}
          <div className="flex justify-end w-full mt-2">
            <Button
              className="rounded-full w-[100px]"
              size="sm"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Creating..." : "Post"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
