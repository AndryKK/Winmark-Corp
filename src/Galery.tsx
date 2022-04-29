import classNames from "classnames";
import { Photo } from "./Photo";
import cross from "../src/close.png"

export function Galery(
  { photosP, 
    setOpened, 
    opened, 
    photoId, 
    setPhotoId, 
    deleting,
    OnDelete
  }: {
    photosP: Photo[];
    setOpened: (a: boolean) => void;
    opened: boolean; photoId: number;
    setPhotoId: (a: number | null) => void;
    deleting: boolean;
    photosCopy: Photo[]
    OnDelete: (id: number)=> void
  }) {

    return (
      <>
        <>
          {photosP.map((photo: { id: number | null; thumbnailUrl: string | undefined; title: string | undefined; }) => 
          <div key={photo.id}  className="App__main__photo__wrap">
            <div onClick={() => { setOpened(!opened); setPhotoId(photo.id)}} className={classNames("App__main__photo", {"App__main__photo__shake": deleting})}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
            </div>
              {deleting && 
                (<button  
                  className="App__main__photo__del"
                  onClick={() => {
                    if (photo.id) {
                      OnDelete(photo.id)
                    }
                  }}
                  >
                    X
                  </button>
                )
              }
          </div>
          )}
        </>
        {opened && (
          <>
            <div onClick={() => setOpened(false)} className="App__main__photo--background" />
              <div className="App__main__photo--cross__wrap">
              <button  onClick={() => setOpened(false)} className="App__main__photo--cross">
                <img src={cross} alt="cross" />
              </button>
              <img
                className="App__main__photo--big"
                src={photosP.filter((p: { id: number; }) => p.id === photoId)[0].url}
                alt={photosP.filter((p: { id: number; }) => p.id === photoId)[0].title}
              />
            </div>
          </>
        )}
      </>
    );
  }
  