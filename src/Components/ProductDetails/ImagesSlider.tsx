interface ImagesSliderProps {
  imageCover: string;
  images: string[];
  activeImage: string | null;
  setActiveImage: (image: string) => void;
}

export default function ImagesSlider({ imageCover, images, activeImage, setActiveImage }: ImagesSliderProps) {
  const currentImage = activeImage || imageCover;

  return (
    <div className="flex min-w-0 flex-col gap-4 lg:col-span-1">
      <div className="flex h-80 items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-6 sm:h-[30rem]">
        <img src={currentImage} alt="Selected product" className="h-full w-full object-contain" />
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {[imageCover, ...images].map((image, index) => (
          <button key={`${image}-${index}`} type="button" onClick={() => setActiveImage(image)} aria-label={`Show product image ${index + 1}`} className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-slate-50 p-2 ${currentImage === image ? 'border-red-500' : 'border-transparent'}`}>
            <img src={image} alt="" className="h-full w-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
}
