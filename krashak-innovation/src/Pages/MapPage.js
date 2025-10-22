import React, { useEffect, useRef, useState } from "react";
import "./MapPage.css";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { RxCross2 } from "react-icons/rx";

// Set the map’s size
const containerStyle = {
  width: "100%",
  height: "68.2vh",
};

const defaultCenter = {
  lat: 27.0238,
  lng: 74.2179,
};

function MapPage({ isMap, setIsMap, setFormData }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  });

  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);

  // Automatically geocode when address changes
  useEffect(() => {
    if (!address || !window.google) return;

    const timeoutId = setTimeout(() => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const loc = results[0].geometry.location;
          const latlng = {
            lat: loc.lat(),
            lng: loc.lng(),
          };
          setLocation(latlng);

          if (mapRef.current) {
            mapRef.current.panTo(latlng);
            mapRef.current.setZoom(10);
          }
        }
      });
    }, 800);
    return () => clearTimeout(timeoutId);
  }, [address]);

  //  Automatically fetch current location on mount
  useEffect(() => {
    if (!isLoaded || !navigator.geolocation || !window.google) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latlng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(latlng);

        // Reverse geocode
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === "OK" && results[0]) {
            const formattedAddress = results[0].formatted_address;
            const addressComponent = results[0].address_components;

            let city = "";
            let state = "";

            addressComponent.forEach((component) => {
              if (component.types.includes("locality")) {
                city = component.long_name;
              }
              if (component.types.includes("administrative_area_level_1")) {
                state = component.long_name;
              }
            });

            setAddress(formattedAddress);

            setFormData((prev) => ({
              ...prev,
              address: formattedAddress,
              city,
              state,
            }));

            if (mapRef.current) {
              mapRef.current.panTo(latlng);
              mapRef.current.setZoom(10);
            }
          }
        });
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const handleMapClick = (e) => {
    const clickedLat = e.latLng.lat();
    const clickedLng = e.latLng.lng();
    const latLng = { lat: clickedLat, lng: clickedLng };

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results[0]) {
        const formattedAddress = results[0].formatted_address;
        const addressComponent = results[0].address_components;
        let city = "";
        let state = "";

        addressComponent.forEach((component) => {
          if (component.types.includes("locality")) {
            city = component.long_name;
          }
          if (component.types.includes("administrative_area_level_1")) {
            state = component.long_name;
          }
        });
        setAddress(formattedAddress);

        setLocation(latLng);

        // Pass value to Booking Form
        setFormData((prev) => ({
          ...prev,
          address: formattedAddress,
          city,
          state,
        }));
      } else {
        console.error("Geocoder failed due to:", status);
      }
    });
  };

  return (
    <div className="map-container">
      {isMap ? (
        <div className="map">
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter Your Address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="remove-map" onClick={() => setIsMap(false)}>
              <RxCross2 />
            </div>
          </div>

          {isLoaded && (
            <div className="google-map">
              <GoogleMap
                onClick={handleMapClick}
                center={location || defaultCenter}
                zoom={location ? 10 : 5}
                mapContainerStyle={containerStyle}
                onLoad={(map) => {
                  mapRef.current = map;
                }}
              >
                {location && <Marker position={location} />}
              </GoogleMap>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default MapPage;
