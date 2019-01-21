import React from "react";
import { GlobalError } from '@components';
import { ProviderLogin } from "solid-react-components";

const HomeContainer = props => {
  return (
    <div className="wrap">
      <h1 className="text-roboto">Solid App</h1>
      <ProviderLogin />
      <GlobalError
        error="Error"
        info={{
          componentStack:
            "Nullam non turpis bibendum, iaculis urna non, ultricies mi. Cras imperdiet eget mauris vel sagittis. Fusce mollis, lacus et eleifend scelerisque, mi libero pharetra lorem, id fermentum nisl purus in sapien. Sed vulputate pulvinar massa vel dictum."
        }}
      />
    </div>
  );
};

export default HomeContainer;
