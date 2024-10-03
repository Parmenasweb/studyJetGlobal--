import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function LivingCost({
  name,
  livingCost,
  feedingCost,
  transportCost,
  miscCost,
}) {
  return (
    <div className="flex items-center flex-col justify-between w-[90%] mx-auto">
      <h1 className="text-3xl font-bold text-center my-6 text-blue-800">
        Living Cost ({name})
      </h1>
      <div className=" flex items-center my-4 justify-between w-[90%] mx-auto">
        <Card className="flex items-center justify-center w-[20%]">
          <CardContent className="flex flex-col items-center justify-center">
            <Image
              src="/rent.png"
              alt="cost"
              width={100}
              height={100}
              className="flex items-center justify-center mt-2"
            />
            <h3 className="text-3xl font-bold text-center text-blue-800">
              House Rent
            </h3>
            <p className="text-center mb-3 text-gray-600">{livingCost}</p>
          </CardContent>
        </Card>
        <Card className="flex items-center justify-center w-[20%]">
          <CardContent className="flex flex-col items-center justify-center">
            <Image
              src="/fast-food.png"
              alt="cost"
              width={100}
              height={100}
              className="flex items-center justify-center mt-2"
            />
            <h3 className="text-3xl font-bold text-center text-blue-800">
              Food
            </h3>
            <p className="text-center mb-3 text-gray-600">{feedingCost}</p>
          </CardContent>
        </Card>
        <Card className="flex items-center justify-center w-[20%]">
          <CardContent className="flex flex-col items-center justify-center">
            <Image
              src="/bus.png"
              alt="cost"
              width={100}
              height={100}
              className="flex items-center justify-center mt-2"
            />
            <h3 className="text-3xl font-bold text-center text-blue-800">
              Transport
            </h3>
            <p className="text-center mb-3 text-gray-600">{transportCost}</p>
          </CardContent>
        </Card>
        <Card className="flex items-center justify-center w-[20%]">
          <CardContent className="flex flex-col items-center justify-center">
            <Image
              src="/miscellaneous.png"
              alt="cost"
              width={100}
              height={100}
              className="flex items-center justify-center mt-2"
            />
            <h3 className="text-3xl font-bold text-center text-blue-800">
              Miscellaneous{" "}
            </h3>
            <p className="text-center mb-3 text-gray-600">{miscCost}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
