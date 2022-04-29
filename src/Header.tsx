import React from "react";
import { Photo } from "./Photo";

export function Header(
  { deleting, 
    setDeleting, 
    ids,
    photos,
    setPhotos,
    photosCopy,
    setActualPage
  }:
  { deleting: boolean,
    setDeleting: (a: boolean)=> void,
    ids: number[],
    photos: Photo[],
    setPhotos: (a: Photo[])=> void,
    photosCopy: Photo[],
    setActualPage: (num: number) => void;
    
  }) {


    const chosen =(event: React.ChangeEvent<HTMLSelectElement>)=> {
      setActualPage(1)
      setPhotos(photosCopy.filter(x => x.albumId === +event.target.value));
      if (event.target.value === "default") {
        setPhotos(photosCopy);
      }
    }

  return (
    <header className="App__header">
      <div className="App__header__sort">
        <span className="App__header__sort__text">Choose album</span>
        <select  
          onChange={(event) => chosen(event)} 
          className="App__header__sort__input" name="sort" id="0">
          <option value="default">all loaded</option>
          {ids.map(x =>
            <option key={x} value={x}>{x}</option>
            )}
        </select>
      </div>
      <button 
        onClick={()=> setDeleting(!deleting)}
        className="App__header__button"
      >
        Deleting
      </button>
    </header>
  );
}
