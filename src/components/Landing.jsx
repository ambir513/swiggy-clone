import { useNavigate } from "react-router-dom";

export function Landing() {
  const navigate = useNavigate();

  const handleSelect = (e) => {
    const selectOption = e.target.options[e.target.selectedIndex];
    if (selectOption.value === "select") return;
    const href = e.target.value.split(";").join("/");
    navigate(`/collection/${href}`);
  };

  return (
    <div className="bg-orange-500 min-h-screen flex flex-col">
      <div className="mx-auto w-full max-w-6xl flex flex-col flex-grow">
        {/* Header */}
        <header className="py-5 px-5">
          <nav className="flex justify-between items-center flex-wrap gap-3">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/static-assets/images/swiggy_logo_white.png"
              alt="Swiggy"
              className="w-28 md:w-36"
            />
            <div className="text-white bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg text-sm md:text-base shadow-sm transition">
              Welcome to Swiggy
            </div>
          </nav>
        </header>

        {/* Main Section */}
        <main className="flex flex-col justify-center items-center flex-grow px-5 text-center">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white max-w-2xl leading-snug md:leading-tight">
            Order food & groceries. Discover best restaurants. Swiggy it!
          </h1>

          <div className="mt-8 w-full max-w-sm">
            <h2 className="text-base md:text-lg py-2 text-white font-medium">
              Select your location
            </h2>
            <select
              defaultValue="select"
              onChange={handleSelect}
              className="w-full rounded-lg border border-orange-200 bg-white px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            >
              <option className="text-gray-500" value="select">
                Select a city
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
        </main>

        {/* Disclaimer Card */}
        <footer className="p-5">
          <div className="max-w-sm mx-auto p-4 rounded-2xl border border-orange-200 bg-orange-50 shadow-sm transition hover:shadow-md hover:bg-orange-100">
            <h2 className="text-lg font-semibold text-orange-700 mb-1">
              Disclaimer
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              This project is{" "}
              <span className="font-medium text-orange-600">
                not affiliated with Swiggy
              </span>
              . It’s a small frontend demo that uses Swiggy’s production APIs
              for learning purposes only.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
