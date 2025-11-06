import { Link, useParams, useSearchParams } from "react-router-dom";
import data from "../data/menu.json";
import { ShimmerMenuList } from "./ShimmerMenuList";
import { useEffect, useState } from "react";

export function MenuList() {
  const { city, locat } = useParams();

  const [load, setLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=" mt-10 px-5 sm:px-15 md:px-15 lg:px-25">
      {load ? (
        <div className="md:ml-10 mb-5 skeleton h-7 w-48"></div> // shimmer
      ) : (
        <div className="md:pl-12 pb-5 pl-4 flex flex-wrap gap-2">
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
              className="text-black text-sm "
            >
              {city}
            </Link>
          </div>
        </div>
      )}
      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 place-items-center gap-0">
        {data.menu.map((item, index) => (
          <Link
            //collection/:city/:locat/:id/:menuList
            to={`/restaurants/${city}/${locat}/${
              item.id
            }/${item.name.toLowerCase()}`}
            key={index}
          >
            <div
              className={`w-36px cursor-pointer overflow-hidden rounded-sm m-3 ${
                !load && "border-2"
              }`}
            >
              {load ? (
                <ShimmerMenuList />
              ) : (
                <img src={item.image} alt="" width={150} />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
