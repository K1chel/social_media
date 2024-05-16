import { IPost } from "@/types";
import { atom, selectorFamily } from "recoil";

export const postAtom = atom({
  key: "postAtom",
  default: [] as IPost[],
});

export const postByIdSelector = selectorFamily<IPost | undefined, string>({
  key: "PostById",
  get:
    (id) =>
    ({ get }) => {
      const postList = get(postAtom);
      return postList.find((post) => post._id === id);
    },
});
