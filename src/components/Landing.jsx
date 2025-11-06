import { useNavigate } from "react-router-dom";

export function Landing() {
  const navigate = useNavigate();

  const handleSelect = (e) => {
    const selectOption = e.target.options[e.target.selectedIndex];

    if (selectOption.value === "select") return null;

    let href = e.target.value.split(";").join("/");
    navigate(`/collection/${href}`);
  };

  return (
    <div className="bg-orange-500 h-screen">
      <div className="mx-auto max-w-6xl">
        <header className=" py-5 px-5">
          <nav className="flex justify-between items-center flex-wrap gap-2">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/static-assets/images/swiggy_logo_white.png"
              alt="Swiggy"
              className="md:w-30 w-25"
            />
            <div className="btn lg:btn-md btn-sm">Welcome to Swiggy</div>
          </nav>
        </header>
        <main className="mx-5 flex justify-center items-center h-50">
          <h1 className="lg:text-5xl font-semibold tracking-tight lg:w-2xl lg:leading-14 md:w-full text-3xl text-white">
            Order food & groceries. Discover best restaurants. Swiggy it!
          </h1>
        </main>
        <div className="mx-5 flex flex-col justify-center items-center">
          <div className="lg:w-md w-full">
            <h1 className="text-md py-2 text-black ">Select the location</h1>
            <select
              defaultValue="select"
              onChange={handleSelect}
              className="select"
            >
              <option className="text-black/50" value="select">
                Select
              </option>
              <option value="mumbai;lat=19.0759837&lng=72.8776559">
                Mumbai
              </option>
              <option value="pune;lat=18.5204&lng=73.8567">Pune</option>
              <option value="chennai;lat=13.0827&lng=80.2707">Chennai</option>
              <option value="kolkata;lat=22.5726&lng=88.3639">Kolkata</option>
              <option value="bengaluru;lat=12.9716&lng=77.5946">
                Bengaluru
              </option>
              <option value="hyderabad;lat=17.3850&lng=78.4867">
                Hyderabad
              </option>
              <option value="delhi;lat=28.6139&lng=77.2090">Delhi</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
