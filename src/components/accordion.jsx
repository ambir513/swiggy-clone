export default function AccordionCard({ item, name, open }) {
  return (
    <div
      className={`${name === open?.name && open?.isOpen ? "block " : "hidden"}`}
    >
      <div
        className={`shadow-lg mt-3 border rounded-lg p-4 mb-4  flex justify-between items-center ${
          item?.card?.info?.itemAttribute?.vegClassifier === "VEG"
            ? "border-green-500"
            : "border-red-500"
        }`}
      >
        <div className="flex flex-col gap-2">
          {item?.card?.info?.itemAttribute?.vegClassifier === "VEG" ? (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/120px-Veg_symbol.svg.png?20131205102827"
              alt="veg"
              className="md:size-10 size-6"
            />
          ) : (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/120px-Non_veg_symbol.svg.png?20131205102929"
              alt="non-veg"
              className="md:size-10 size-6"
            />
          )}
          <h2 className="md:text-xl text-sm font-bold">
            {item?.card?.info?.name}
          </h2>
          {item?.card?.info?.defaultPrice ? (
            <p className="font-semibold text-lg">
              Rs. {item?.card?.info?.defaultPrice / 100}
            </p>
          ) : (
            <p className="font-semibold">Rs. {item?.card?.info?.price / 100}</p>
          )}

          <p className="text-xs text-gray-500">
            {item?.card?.info?.description?.split(".")[0]}
          </p>
        </div>
        <div className="flex items-center">
          <figure className="overflow-hidden relative md:size-45 size-30 ml-5 rounded-lg">
            <img
              draggable={false}
              src={
                item?.card?.info?.imageId
                  ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item?.card?.info?.imageId}`
                  : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              }
              alt="Food"
              className="select-none object-cover w-full h-full"
            />
            <button className="absolute bottom-2 btn  left-0 right-0 border text-orange-500 border-orange-500 mx-3 md:btn-sm btn-xs">
              Add to Cart
            </button>
          </figure>
        </div>
      </div>
    </div>
  );
}
