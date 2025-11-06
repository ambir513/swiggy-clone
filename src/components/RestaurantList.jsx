import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RestaurantListCard } from "./RestaurantListCard";
import { ShimmerRestCard } from "./ShimmerRest";

const DummyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // for shimmer ui :)

export function RestaurantList() {
  const { city, locat, id, menuName } = useParams();
  const [search, setSearch] = useState("");
  const [backUp, setBackUp] = useState({
    cards: [],
    title: "",
    description: "",
  });
  const [data, setData] = useState({
    cards: [],
    title: "",
    description: "",
  });

  useEffect(() => {
    if (backUp.cards.length === 0) {
      fetchedRestaurant();
    }

    if (search.length === 0) {
      setData((prev) => ({ ...prev, cards: backUp.cards }));
    }

    const filterByName = backUp?.cards?.filter((item) =>
      item.name.toLowerCase().split(" ").includes(search)
    ); // search from name "pizza"

    const filterByCuisines = backUp?.cards?.filter((item) =>
      item.cuisines.includes(search)
    ); // search from cuisine ["Pizza"]

    if (filterByName.length === 0) {
      if (filterByCuisines.length > 0) {
        setData((prev) => ({ ...prev, cards: filterByCuisines }));
      } else if (search.length !== 0) {
        setData((prev) => ({ ...prev, cards: [] }));
      }
    } else if (search.length !== 0) {
      setData((prev) => ({ ...prev, cards: filterByName }));
    }
  }, [search]);

  if (data.cards.length > 0) {
    console.log(data); // for debugging
  }

  async function fetchedRestaurant() {
    try {
      const res = await fetch(
        `https://corsproxy.io/https://www.swiggy.com/dapi/restaurants/list/v5?${locat}&collection=${id}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`,
        {
          method: "GET",
        }
      );
      const data = await res.json();

      const cards = data?.data?.cards
        ?.filter((d, i) => i > 2)
        .map((m) => m?.card?.card?.info);

      setBackUp({
        title: data?.data?.cards[0]?.card?.card?.title,
        description: data?.data?.cards[0]?.card?.card?.description,
        cards: cards,
      });
      setData({
        title: data?.data?.cards[0]?.card?.card?.title,
        description: data?.data?.cards[0]?.card?.card?.description,
        cards: cards,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="md:mx-auto max-w-7xl mx-5 mt-10">
      {backUp?.cards?.length === 0 ? (
        <div className="ml-5 mb-5 skeleton h-7 w-48 "></div> // shimmer
      ) : (
        <div className="pl-6 pb-5 flex flex-wrap gap-2">
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
              to={`/restaurants/${city}/${locat}/${id}/${menuName}`}
              className=" text-sm text-black font-semibold "
            >
              {menuName}
            </Link>
          </div>
        </div>
      )}
      <div className="pl-5 flex flex-wrap gap-3  justify-between items-center">
        <div className="flex flex-col gap-2 ">
          {backUp?.cards?.length === 0 && (
            <div className="flex flex-col gap-4">
              <div className="skeleton md:h-10 h-7 w-30"></div>
              <div className="skeleton md:h-7 h-10 md:w-xl w-[300px]"></div>
            </div>
          )}
          <h1 className="lg:text-3xl text-lg font-semibold">{data?.title}</h1>
          <p className="lg:text-lg text-sm text-gray-500">
            {data?.description}
          </p>
        </div>
        <div>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              className="grow"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value.trim().toLowerCase())}
            />
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 my-10 ms:mx-0 mx-5 w-fit">
        {backUp?.cards?.length === 0 &&
          DummyList.map((item, index) => {
            return <ShimmerRestCard key={item} />;
          })}
        {data?.cards?.length > 0 &&
          data?.cards?.map((card, index) => (
            <RestaurantListCard
              data={card}
              key={index}
              pages={{ card: card?.nextOffset, ...card?.widgetOffset }}
              collectionId={id}
            />
          ))}
      </div>
      {backUp?.cards?.length > 0 && data?.cards?.length === 0 && (
        <div className="card bg-orange-500 text-neutral-content flex justify-self-center items-center my-20 md:w-96 sm:w-sm">
          <div className="card-body items-center text-center gap-y-3">
            <p className="card-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search-x-icon lucide-search-x"
              >
                <path d="m13.5 8.5-5 5" />
                <path d="m8.5 8.5 5 5" />
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </p>
            <h1>Oops! no search result</h1>
            <div className="card-actions justify-end">
              <button
                className="btn btn-sm"
                onClick={() => {
                  setData((prev) => ({ ...prev, cards: backUp.cards }));
                  setSearch("");
                }}
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
