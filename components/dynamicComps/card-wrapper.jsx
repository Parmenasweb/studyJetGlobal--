"use client";

import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import Header from "./header";
import Social from "./social";
import BackButton from "./back-button";

function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}) {
  return (
    <Card className="sm:w-[90%] md:w-[40%] max-h-[100vh] mx-auto p-4 shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          href={backButtonHref}
          label={backButtonLabel}
          className="w-full "
        />
      </CardFooter>
    </Card>
  );
}

export default CardWrapper;
