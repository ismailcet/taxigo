"use client";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import React, {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const session_token = "5ccce4a4-ab0a-4a7c-943d-580e55542363";
const MAPBOX_RETRIVE_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve/";

function AutoComplateAddress() {
  const { sourceCorinates, setSourceCordinates } =
    useContext(SourceCordiContext);
  const { destinationCorinates, setDestinationCorinates } = useContext(
    DestinationCordiContext
  );

  const [source, setSource] = useState<any>("");
  const [sourceChange, setSourceChange] = useState<any>(false);
  const [destinationChange, setDestinationChange] = useState<any>(false);

  const [destination, setDestination] = useState<any>("");

  const [addressList, setAddressList] = useState<any>([]);

  useEffect(() => {
    if (source.length > 0) {
      const delay = setTimeout(() => {
        getAddressList();
      }, 1000);
      return () => clearTimeout(delay);
    }
  }, [source]);
  useEffect(() => {
    if (destination.length > 0) {
      const delay = setTimeout(() => {
        getAddressList();
      }, 1000);
      return () => clearTimeout(delay);
    }
  }, [destination]);

  const getAddressList = async () => {
    const query: String = sourceChange ? source : destination;
    const res = await fetch("/api/search-address?q=" + query, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    setAddressList(result);
  };

  const onSourceAddressClick = async (item: any) => {
    setSource(item.full_address);
    setSourceChange(false);
    setAddressList([]);

    const res = await fetch(
      MAPBOX_RETRIVE_URL +
        item.mapbox_id +
        "?session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );

    const result = await res.json();
    setSourceCordinates({
      lat: result?.features[0].geometry.coordinates[0],
      lng: result?.features[0].geometry.coordinates[1],
    });
    console.log(result?.features[0].geometry.coordinates);
  };
  const onDestinationAddressClick = async (item: any) => {
    setDestination(item.full_address);
    setDestinationChange(false);
    setAddressList([]);

    const res = await fetch(
      MAPBOX_RETRIVE_URL +
        item.mapbox_id +
        "?session_token=" +
        session_token +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    );

    const result = await res.json();
    setDestinationCorinates({
      lat: result?.features[0].geometry.coordinates[0],
      lng: result?.features[0].geometry.coordinates[1],
    });
    console.log(result?.features[0].geometry.coordinates);
  };

  return (
    <div className="mt-5">
      <div className="relative">
        <label className="text-gray-400">Where From ?</label>
        <input
          type="text"
          className="
            bg-white p-1 
            border-[1px] w-full rounded-md outline-none
            focus:border-yellow-300
            "
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            setSourceChange(true);
          }}
        />
        <div>
          {addressList?.suggestions && sourceChange ? (
            <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
              {addressList.suggestions.map((item: any, index: number) => {
                return (
                  <h2
                    key={index}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => onSourceAddressClick(item)}
                  >
                    {item.full_address}
                  </h2>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
      <div className="mt-3">
        <label className="text-gray-400">Where To ?</label>
        <input
          type="text"
          className="
            bg-white p-1 
            border-[1px] w-full rounded-md outline-none
            focus:border-yellow-300
            "
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
            setDestinationChange(true);
          }}
        />
        <div className="relative">
          {addressList?.suggestions && destinationChange ? (
            <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
              {addressList.suggestions.map((item: any, index: number) => {
                return (
                  <h2
                    key={index}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => onDestinationAddressClick(item)}
                  >
                    {item.full_address}
                  </h2>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AutoComplateAddress;
