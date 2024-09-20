import React from 'react';
import { BoltLoader } from 'react-awesome-loaders';

const Loader = () => {
  return (
    <div className="loader">
      <BoltLoader
        className={"loaderbolt"}
        boltColor={"#0D6EFD"}
        backgroundBlurColor={"#E0E7FF"}
      />
    </div>
  );
};

export default Loader;