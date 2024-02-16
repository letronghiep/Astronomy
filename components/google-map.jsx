"use client";
import React, {
  useRef,
  useEffect,
  useState,
  useTransition,
  createRef,
} from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
} from "@goongmaps/goong-map-react";
import "@goongmaps/goong-js/dist/goong-js.css";
import "@goongmaps/goong-geocoder/dist/goong-geocoder.css";
import axios from "axios";
import { FmdGood } from "@mui/icons-material";
// import '@goongmaps/goong-geocoder-react/dist/goong-geocoder.css'
// import Geocoder from "@goongmaps/goong-geocoder-react";
export default function Map({ location }) {
  const [viewport, setViewport] = useState({
    latitude: 21.03072,
    longitude: 105.85239,
    zoom: 12,
  });
  const geolocateControlStyle = {
    right: 10,
    top: 10,
  };
  const [coordinate, setCoordinate] = useState({
    lng: 0,
    lat: 0,
  });
  useEffect(() => {
    async function getCoordinate() {
      const res = await axios.get(
        `https://rsapi.goong.io/geocode?address=${encodeURIComponent(
          location
        )}`,
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_GOONG_API_KEY,
          },
        }
      );
      const geometry = await res.data.results[0].geometry;
      console.log("====================================");
      console.log(location);
      console.log("====================================");
      const coordinates = geometry?.location;
      setCoordinate({ lng: coordinates.lng, lat: coordinates.lat });
    }
    getCoordinate();
  }, [location]);
  useEffect(() => {
    setViewport({
      longitude: coordinate.lng,
      latitude: coordinate.lat,
      zoom: 16,
    });
    // setViewport(nextViewport =>nextViewport)
  }, [coordinate]);
  return (
    <>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="https://tiles.goong.io/assets/goong_map_web.json"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        goongApiAccessToken={process.env.NEXT_PUBLIC_GOONG_ACCESS_TOKEN}
      >
        <Marker
          latitude={coordinate?.lat}
          longitude={coordinate?.lng}
          offsetLeft={-20}
          offsetTop={-10}
        >
         <FmdGood />
        </Marker>
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
        />
      </ReactMapGL>
    </>
  );
}
