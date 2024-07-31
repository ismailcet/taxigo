"use client";

import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext, useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl";
import Markers from "./Markers";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";

function MapBoxMap() {
  const mapRef = useRef<any>();

  const { userLocation } = useContext(UserLocationContext);
  const { sourceCorinates, setSourceCordinates } =
    useContext(SourceCordiContext);
  const { destinationCorinates, setDestinationCorinates } = useContext(
      DestinationCordiContext)

  useEffect(() => {
    if (sourceCorinates) {
      mapRef.current?.flyTo({
        center: [sourceCorinates.lng, sourceCorinates.lat],
        duration: 2500,
      });
    }
  }, [sourceCorinates]);


  useEffect(() => {
    if (destinationCorinates) {
      mapRef.current?.flyTo({
        center: [destinationCorinates.lng, destinationCorinates.lat],
        duration: 2500,
      });
    }

    // if (soruceCordinates && destinationCordinates) {
    //   getDirectionRoute();
    // }
  }, [destinationCorinates]);

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 450, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            {" "}
            <Markers />
          </Map>
        ) : null}
      </div>
    </div>
  );
}

export default MapBoxMap;
