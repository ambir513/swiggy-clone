import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AccordionCard from "./accordion";

export function AddToCart() {
  const { city, locat, id, menuName, resId } = useParams();
  const [open, setOpen] = useState({ isOpen: false, name: "" });
  const [data, setData] = useState({});

  useEffect(() => {
    getRestaurantMenuData();
  }, []);

  async function getRestaurantMenuData() {
    try {
      const res = await fetch(
        `https://corsproxy.io/https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&${locat}&restaurantId=${id}&query=${menuName}&submitAction=ENTER&source=collection`,
        {
          method: "GET",
        }
      );

      const data = await res.json();
      setData({
        title: data?.data?.cards[2]?.card?.card?.info?.name,
        id: data?.data?.cards[2]?.card?.card?.info?.id,
        avgRatingString:
          data?.data?.cards[2]?.card?.card?.info?.avgRatingString,
        rating: data?.data?.cards[2]?.card?.card?.info?.totalRatings,
        imageId: data?.data?.cards[2]?.card?.card?.info?.cloudinaryImageId,
        costForTwoMessage:
          data?.data?.cards[2]?.card?.card?.info?.costForTwoMessage,
        price: (
          data?.data?.cards[2]?.card?.card?.info?.costForTwo / 100
        ).toFixed(2),
        cuisines: data?.data?.cards[2]?.card?.card?.info?.cuisines,
        offers:
          data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.map(
            (offer) => offer?.info
          ),
        cards: data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards
          ?.filter((card, index) => index !== 0 && index < 13)
          ?.map((card) => card?.card?.card)
          ?.filter((card, index) => index > 1),
      });
      console.log({
        title: data?.data?.cards[2]?.card?.card?.info?.name,
        id: data?.data?.cards[2]?.card?.card?.info?.id,
        avgRatingString:
          data?.data?.cards[2]?.card?.card?.info?.avgRatingString,
        rating: data?.data?.cards[2]?.card?.card?.info?.totalRatings,
        imageId: data?.data?.cards[2]?.card?.card?.info?.cloudinaryImageId,
        costForTwoMessage:
          data?.data?.cards[2]?.card?.card?.info?.costForTwoMessage,
        price: (
          data?.data?.cards[2]?.card?.card?.info?.costForTwo / 100
        ).toFixed(2),
        cuisines: data?.data?.cards[2]?.card?.card?.info?.cuisines,
        offers:
          data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.map(
            (offer) => offer?.info
          ),
        cards: data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards
          ?.filter((card, index) => index !== 0 && index < 13)
          ?.map((card) => card?.card?.card)
          ?.filter((card, index) => index > 1),
      });
      console.log(data?.data?.cards);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="md:mx-auto max-w-4xl mx-5 mt-10">
      {!data?.title ? (
        <div className="skeleton md:h-7 h-16 md:w-92 w-68"></div> // shimmer
      ) : (
        <div className="flex flex-wrap gap-2">
          <div className="">
            <Link
              to={"/"}
              className="text-zinc-400 text-sm hover:text-black active:text-black"
            >
              Home
            </Link>
          </div>
          <div className="">
            <span className="text-zinc-400 text-sm">{" / "}&nbsp;</span>
            <Link
              to={`/collection/${city}/${locat}`}
              className="text-zinc-400 text-sm hover:text-black active:text-black"
            >
              Food Items
            </Link>
          </div>
          <div className="">
            <span className="text-zinc-400 text-sm">{" / "}</span>
            <Link
              to={`/restaurants/${city}/${locat}/${resId}/${menuName}`}
              className="text-zinc-400 text-sm hover:text-black active:text-black"
            >
              Restaurants Menu
            </Link>
          </div>
          <div className="">
            <span className="text-zinc-400 text-sm">{" / "}</span>
            <Link className="font-semibold text-sm hover:text-black active:text-black">
              {data?.title}
            </Link>
          </div>
        </div>
      )}
      <div className={`${!data?.title ? "" : "shadow-lg"}  rounded-2xl`}>
        <div
          className={` ${
            !data?.title ? "" : "shadow-sm" // shimmer
          } card card-side bg-base-100  flex md:flex-row flex-col md:my-10 my-5`}
        >
          {!data?.title ? (
            <div className="skeleton h-[300px] w-[300px]"></div> // shimmer
          ) : (
            <figure className="overflow-hidden relative rounded-tr-xl rounded-tl-xl  shadow-[inset_0_-20px_20px_rgba(0,0,0,0.6)]">
              <img
                draggable={false}
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${data.imageId}`}
                alt="Food"
                className="select-none object-cover w-full h-full"
              />
            </figure>
          )}
          <div className="card-body gap-3">
            {!data?.title ? (
              <div className="flex flex-col gap-3">
                <div className="skeleton h-10 w-36"></div>
                <div className="skeleton h-8 w-2/4"></div>
                <div className="skeleton h-28 w-3/4"></div>
              </div> // shimmer
            ) : (
              <>
                <h2 className="card-title">{data?.title}</h2>
                <div className="flex items-center gap-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    stroke="rgba(2, 6, 12, 0.92)"
                    fill="rgba(2, 6, 12, 0.92)"
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="9"
                      fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"
                    ></circle>
                    <path
                      d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z"
                      fill="white"
                    ></path>
                    <defs>
                      <linearGradient
                        id="StoreRating20_svg__paint0_linear_32982_71567"
                        x1="10"
                        y1="1"
                        x2="10"
                        y2="19"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#21973B"></stop>
                        <stop offset="1" stopColor="#128540"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <h1>
                    {data?.avgRatingString} • {data?.rating} Ratings
                  </h1>
                </div>
                <div className="card-actions ">
                  {data?.cuisines?.map((cuisine) => {
                    return (
                      <div
                        className="badge badge-outline badge-md"
                        key={cuisine}
                      >
                        {cuisine}
                      </div>
                    );
                  })}
                </div>
                <div
                  className="
              flex items-center gap-2 flex-wrap
            "
                >
                  {data?.offers?.map((off, index) => (
                    <div
                      className="badge py-2 bg-orange-500 text-white flex flex-col gap-y-2 h-fit"
                      key={index}
                    >
                      <h1>{off?.header}</h1>
                      <p className="text-xs">{off?.couponCode}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
            <div className="card-actions justify-end my-2">
              {!data?.title ? (
                <div className="skeleton h-12 w-48"></div> // shimmer
              ) : (
                <button className="btn border text-orange-500 border-orange-500 w-[200px]">
                  Add to cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="my-10 flex flex-col gap-y-3">
        {!data?.cards?.length ? (
          <>
            <div className="skeleton h-16 w-full"></div>
            <div className="skeleton h-16 w-full"></div>
            <div className="skeleton h-16 w-full"></div>
            <div className="skeleton h-16 w-full"></div>
          </> // shimmer
        ) : (
          data?.cards?.map((section) => {
            return (
              section?.itemCards?.length > 1 && (
                <div
                  className="border border-zinc-600 px-3 py-2 rounded-lg "
                  key={section?.title}
                >
                  <div
                    id={section?.title}
                    className="flex justify-between items-center cursor-pointer"
                    onClick={(e) => {
                      if (e.currentTarget.id === section?.title) {
                        setOpen((prev) => ({
                          isOpen: prev.name === section.title ? false : true,
                          name:
                            prev.name === section.title ? "" : section.title,
                        }));
                      }
                    }}
                  >
                    <h1 className="text-2xl font-semibold">{section?.title}</h1>
                    <h1
                      className={`text-xl font-bold w-fit ${
                        open?.name === section.title
                          ? open?.isOpen && "rotate-z-270"
                          : "rotate-90"
                      }`}
                    >
                      {">"}
                    </h1>
                  </div>
                  <div className={`${open ? "flex flex-col" : "hidden"}`}>
                    {section?.itemCards?.map((item) => {
                      return (
                        <AccordionCard
                          item={item}
                          name={section.title}
                          open={open}
                          key={item?.card?.info?.id}
                        />
                      );
                    })}
                  </div>
                </div>
              )
            );
          })
        )}
      </div>
    </div>
  );
}
