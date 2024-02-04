import 'leaflet/dist/leaflet.css';
import './Map.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { defaultIcon } from './util';
import CustomPopup from './util';
import data from './MOCK_DATA.json';
import { useEffect, useRef } from 'react';

export default function Map({ options, customIcon }) {
    const mapEl = useRef();

    useEffect(() => {
        const map = mapEl.current;
        if (map && options.center) {
            map.setView(options.center, options.zoom ?? 10);
        }
    }, [options]);

    return (
        <MapContainer
            id='map'
            center={options.center}
            zoom={options.zoom ?? 10}
            className="map-container"
            ref={mapEl}
        >
            <TileLayer url={options.tileLayerUrl} />
            {data.map((driver, index) => (
                <Marker
                    key={index}
                    position={[driver.location.lng, driver.location.lat]}
                    icon={customIcon ? customIcon({ text: driver.driverName, image: driver.driverImage }) : defaultIcon}
                >
                    <Popup minWidth={300}>
                        <CustomPopup driver={driver} />
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}
