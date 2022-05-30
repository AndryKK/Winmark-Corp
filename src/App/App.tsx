import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { getData, removeData } from "../api/api";
import './App.scss'
import { Galery } from "../Gallery/Gallery";
import { Header } from "../Header/Header";
import { Photo } from "../Types/Photo";
import { pagesFancStart, pagesFancEnd } from "../functions/functions"

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [opened, setOpened] = useState(false);
  const [photoId, setPhotoId] = useState<number | null>(1);
  const [firstLoading, setFirstLoading] = useState(false);

  const [actualPage, setActualPage] = useState(1);
  const [pages, setPages] = useState([1]);
  const [photosP, setPhotosP] = useState<Photo[]>([]);
  const [deleting, setDeleting] = useState(false);
  const [albumIds, setAlbumIds] = useState<number[]>([]);
  const [photosCopy, setPhotosCopy] = useState<Photo[]>([]);

  const pagination =(currentPage: number, maxIn: number)=> {

    const page = [...photos.slice((maxIn * currentPage) - maxIn, maxIn * currentPage)]

    setActualPage(currentPage);
    setPhotosP(page);
    setPages(Array.from(Array(Math.ceil(photos.length / maxIn)).keys()).map(x => x + 1));
  };

  async function loading() {
    let photos: Photo[] = await getData();

    photos = photos.map(x => x = 
      { ...x, 
        thumbnailUrl: "https://nextjourneys.com/wp-content/uploads/2017/07/4k-nature-wallpaper-images-Is-Cool-Wallpapers-150x150.jpg",
        url: "https://nextjourneys.com/wp-content/uploads/2017/07/4k-nature-wallpaper-images-Is-Cool-Wallpapers-1024x640.jpg"}
      )

    setPhotos(photos);
    setPhotosCopy(photos);
    setFirstLoading(true);

    const idArr: number[] = [];
    photos.map(x => {
      if (!idArr.includes(x.albumId)) {
        idArr.push(x.albumId)}; return x
      })
    setAlbumIds(idArr);
  };

  useEffect(()=> {
    loading();
    pagination(1, 24);
  },[firstLoading]);

  useEffect(()=> {
    pagination(actualPage, 24);
  },[photos]);

  const onDelete =(id: number)=> {
    setPhotos(photos.filter(x => x.id !== id));
    setPhotosCopy(photosCopy.filter(x => x.id !== id));
    pagination(actualPage, 24);
    removeData(`${id}`);
  }

  const pageOnRender =()=> {
    return pages
      .slice(actualPage - pagesFancStart(actualPage),
      actualPage + pagesFancEnd(actualPage))
  }

  const isSelectedPage =(number: number)=> {
    return ((actualPage === number) && (pages.length > 1))
  }

  return (
    <div  className="App">
        <Header 
          deleting={deleting}
          setDeleting={setDeleting}
          ids={albumIds}
          photos={photos}
          setPhotos={setPhotos}
          photosCopy={photosCopy}
          setActualPage={setActualPage}
          
        />
      <main className="App__main">
        {(photoId && firstLoading) 
          ? (<Galery 
              photosP={photosP}
              setOpened={setOpened}
              opened={opened}
              photoId={photoId}
              setPhotoId={setPhotoId}
              deleting={deleting}
              photosCopy={photosCopy}
              onDelete={onDelete}
            />)
          : (<h1>Loading...</h1>)
        }
      </main>
      <div className="App__main__pages">
      {!opened && (pageOnRender().map(number => 
        <button
          key={number}
          className={classNames(
            {"App__main__page": true},
            {"App__main__page--selected": isSelectedPage(number)}
          )}
          onClick={() => pagination(number, 24)}
        >
          {number}
        </button>))}
      </div>
    </div>
  );
}

export default App;
