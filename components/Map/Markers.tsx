import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext, useEffect } from "react";
import { Marker } from "react-map-gl";
function Markers() {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCorinates, setSourceCordinates } =
    useContext(SourceCordiContext);
  const { destinationCorinates, setDestinationCorinates } = useContext(
    DestinationCordiContext
  );

  return (
    <div>
      {/* USER CURRENT */}
      {/* <Marker
        longitude={userLocation?.lng}
        latitude={userLocation?.lat}
        anchor="bottom"
      >
        <img src="./pin.png" className="w-10 h-10" />
      </Marker> */}

      {/* SOURCE MARKER  */}
      {sourceCorinates.length != 0 ? (
        <Marker
          longitude={sourceCorinates.lng}
          latitude={sourceCorinates.lat}
          anchor="bottom"
        >
          <img src="./pin.png" className="w-12 h-12"/>
        </Marker>
      ) : null}
      {/* DESTINATION MARKER */}
      {destinationCorinates.length != 0 ? (
          <Marker
            longitude={destinationCorinates?.lng}
            latitude={destinationCorinates?.lat}
            anchor="bottom"
          >
            <img src="./pin.png" className="w-10 h-10" />
          </Marker>
      ) : null}
    </div>
  );
}

export default Markers;
