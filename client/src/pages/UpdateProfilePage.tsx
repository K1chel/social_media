import * as z from "zod";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { XIcon } from "lucide-react";
import { toast } from "sonner";

import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MAX_BIO_CHARACTERS } from "@/constants";
import { usePreviewImage } from "@/hooks/usePrevieImage";
import { getIconAndLabelFromLink } from "@/lib/utils";
import { AuthContext } from "@/providers/AuthProvider";
import { Switch } from "@/components/ui/switch";

const linkSchema = z.string().url();

const validateLink = (link: string) => {
  try {
    linkSchema.parse(link);
  } catch (error) {
    toast.error("Invalid link. Please enter a valid URL.");
    return false;
  }
  return true;
};

export const UpdateProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const { imageUrl, handleImageChange, setImageUrl } = usePreviewImage();
  const { username } = useParams();

  const [bioCharCount, setBioCharCount] = useState(
    user?.bio ? user.bio.length : 0
  );
  const [newLink, setNewLink] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [values, setValues] = useState({
    username: user?.username,
    fullName: user?.fullName,
    email: user?.email,
    bio: user?.bio,
    links: user?.links,
  });
  const [isPrivate, setIsPrivate] = useState<boolean>(user?.isPrivate ?? true);

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setBioCharCount(values.bio ? values.bio.length : 0);
  }, [values.bio]);

  const handleRemoveLink = (link: string) => {
    setValues({
      ...values,
      links: values.links?.filter((l) => l !== link),
    });
  };

  if (!user) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    try {
      const res = await fetch("/api/users/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          avatar: imageUrl,
          isPrivate: isPrivate ? "true" : "false",
        }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      }

      setUser(data);
      toast.success("Profile updated successfully.");
      navigate(`/profile/${data.username}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (user.username !== username) {
    toast.info("Not allowed to see this page.");
    return <Navigate to="/" />;
  }

  console.log(isPrivate);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 w-full">
          {/* LEFT SIDE */}
          <div className="w-full flex items-center flex-col gap-y-4">
            <div>
              <div className="relative">
                <UserAvatar
                  src={imageUrl || user.avatar}
                  username={user.username}
                  className="w-28 h-28 md:w-36 md:h-36 cursor-pointer hover:opacity-80 transition"
                  onClick={() => inputRef.current?.click()}
                />
                {imageUrl && (
                  <button
                    type="button"
                    onClick={() => setImageUrl(null)}
                    className="absolute top-0 right-0 p-2 bg-destructive rounded-full hover:opacity-90 transition"
                  >
                    <XIcon className="w-4 h-4 shrink-0" />
                  </button>
                )}
              </div>
              <input
                hidden
                ref={inputRef}
                type="file"
                onChange={handleImageChange}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <Switch
                checked={isPrivate}
                onCheckedChange={() => {
                  setIsPrivate((prev) => !prev);
                }}
              />
              <span>{isPrivate ? "Private" : "Public"} account</span>
            </div>
            <div className="w-full space-y-1.5">
              <Label>Username</Label>
              <Input
                value={values.username}
                onChange={(e) =>
                  setValues({ ...values, username: e.target.value })
                }
                disabled={isLoading}
                placeholder="johndoe"
              />
            </div>
            <div className="w-full space-y-1.5">
              <Label>Full Name</Label>
              <Input
                value={values.fullName}
                onChange={(e) =>
                  setValues({ ...values, fullName: e.target.value })
                }
                disabled={isLoading}
                placeholder="John Doe"
              />
            </div>
          </div>
          {/* RIGHT SIDE */}
          <div className="space-y-5">
            <div className="w-full space-y-1.5">
              <Label>Email</Label>
              <Input
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                disabled={isLoading}
                placeholder="johndoe@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Bio</Label>
              <div className="relative">
                <Textarea
                  value={values.bio}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_BIO_CHARACTERS) {
                      setValues({ ...values, bio: e.target.value });
                    }
                  }}
                  disabled={isLoading}
                  placeholder="Tell more about yourself!"
                  className="resize-none min-h-[138px]"
                />
                <div className="absolute bottom-2 right-2">
                  <span className="text-muted-foreground text-xs">
                    {bioCharCount}/{MAX_BIO_CHARACTERS}
                  </span>
                </div>
              </div>
            </div>
            <div>
              {values.links && (
                <div className="space-y-4">
                  <Label>Links</Label>
                  {values.links.map((link) => {
                    const { icon: Icon } = getIconAndLabelFromLink(link);
                    return (
                      <Link
                        key={link}
                        to={link}
                        target="_blank"
                        className="flex items-center space-x-2"
                      >
                        <Button
                          className="w-[calc(100%-50px)] md:max-w-[610px] justify-start flex items-center gap-x-2"
                          type="button"
                          variant="outline"
                          disabled={isLoading}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {link}
                          </span>
                        </Button>
                        <Button
                          disabled={isLoading}
                          size="icon"
                          variant="destructive"
                          type="button"
                          className="shrink-0"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemoveLink(link);
                          }}
                        >
                          <XIcon className="h-5 w-5" />
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              )}
              {values.links && values.links.length < 3 && (
                <div className="flex flex-col gap-y-2 py-1.5">
                  <Input
                    type="text"
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    placeholder="Paste your link here"
                  />
                  <Button
                    disabled={isLoading || !newLink}
                    type="button"
                    onClick={() => {
                      if (newLink && validateLink(newLink)) {
                        setValues({
                          ...values,
                          links: [...(user?.links || []), newLink],
                        });
                        setNewLink("");
                      }
                    }}
                  >
                    Add Link
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            size="sm"
            type="submit"
            className="w-full md:w-auto"
            disabled={isLoading}
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};
