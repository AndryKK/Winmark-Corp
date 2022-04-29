import { Photo } from "../Types/Photo";

export type Props = {
  deleting: boolean;
  setDeleting: (a: boolean) => void;
  ids: number[];
  photos: Photo[];
  setPhotos: (a: Photo[]) => void;
  photosCopy: Photo[];
  setActualPage: (num: number) => void;

};
