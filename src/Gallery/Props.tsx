import { Photo } from "../Types/Photo";

export type Props = {
  photosP: Photo[];
  setOpened: (a: boolean) => void;
  opened: boolean; photoId: number;
  setPhotoId: (a: number | null) => void;
  deleting: boolean;
  photosCopy: Photo[];
  onDelete: (id: number) => void;
};
