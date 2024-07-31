"use client";

import Booking from "@/components/Booking/Booking";
import MapBoxMap from "@/components/Map/MapBoxMap";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useEffect, useState } from "react";

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>();
  const [sourceCorinates, setSourceCordinates] = useState<any>([]);
  const [destinationCorinates, setDestinationCorinates] = useState<any>([]);

  useEffect(() => {
    getUserLocation();
  });

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };
  return (
    <div>
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <SourceCordiContext.Provider
          value={{ sourceCorinates, setSourceCordinates }}
        >
          <DestinationCordiContext.Provider
            value={{ destinationCorinates, setDestinationCorinates }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="">
                <Booking />
              </div>
              <div className="col-span-2 ">
                <MapBoxMap />
              </div>
            </div>
          </DestinationCordiContext.Provider>
        </SourceCordiContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}
