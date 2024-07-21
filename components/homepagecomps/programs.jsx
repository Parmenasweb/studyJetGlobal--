import { DestinationCard } from "../dynamicComps/destinationCards";
import PageTitle from "../pageTitle";
import { countries } from "@/lib/countrydetails";

export default function Programs() {
  return (
    <main className="  ">
      <h2 className="flex text-center items-center text-2xl font-bold my-4  justify-center">
        Our Top Study Destinations and Programs
      </h2>
      <div>
        <h2 className="flex flex-col items-center my-2 font-semibold text-lg justify-center w-[90%] mx-auto">
          Explore your dream destination
        </h2>
        <p className="flex flex-col items-center font-semibold text-md my-3 justify-center w-[90%] mx-auto">
          explore our top study abroad destinations and find the perfect fit for
          your academic and cultural goals
        </p>
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3 items-center  justify-around w-[90%] mx-auto p-8 ">
          {countries.map((country, ind) => (
            <DestinationCard
              key={ind}
              name={country.name}
              flagUrl={country.flagUrl}
              backgroundUrl={country.backgroundUrl}
              studyCost={country.studyCost}
              livingCost={country.livingCost}
              description={country.description}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
