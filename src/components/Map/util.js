import * as L from 'leaflet';
import './Map.css';

export const defaultIcon = new L.Icon({
    iconUrl: '/assets/pin-red.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

export function CustomIcon(data) {
    const userInitials = data?.text?.split(' ').length ? data.text.split(' ').map(name => name[0]).join('') : data?.text?.chatAt(0);
    return new L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="customPin">
            ${data.image ? `<img src="${data.image}" alt="image" />` : `<div class="text">${userInitials}</div>`
            }
        </div>`,
    });
}

export default function CustomPopup({ driver }) {
    return (
        <div className='customPopup'>
            <div className='header'>
                {
                    driver.driverImage ? (
                        <div className='image-wrapper'>
                            <img src={driver.driverImage} alt='img' />
                        </div>
                    ) : ''
                }
                <div className='content'>Driver Name: <h3>{driver.driverName}</h3></div>
            </div>
            <div className='content'>Car Model: <h3>{driver.carModel}</h3></div>
            <div className='content'>Driver Location: <h3>[{driver.location.lat}, {driver.location.lng}]</h3></div>
        </div>
    )
}