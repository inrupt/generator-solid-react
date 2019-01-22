import React from "react";
import { ProviderLogin } from "@inrupt/solid-react-components";

const HomeContainer = props => {
  return (
    <div className="wrap">
      <h1 className="text-roboto">Solid App</h1>
      <ProviderLogin />
    </div>
  );
};

export default HomeContainer;
