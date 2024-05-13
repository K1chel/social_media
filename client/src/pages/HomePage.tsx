import { CreatePost } from "@/components/post/CreatePost";

export const HomePage = () => {
  return (
    <div className="max-w-screen-xl mx-auto w-full space-y-5 container py-5">
      <CreatePost />
    </div>
  );
};
