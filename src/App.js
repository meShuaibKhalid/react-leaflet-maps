import { useEffect, useState } from 'react';
import './App.css';
import Map from './components/Map/Map';
import { CustomIcon } from './components/Map/util';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import SearchComponent from './components/Search/Search';
import 'animate.css';

function App() {
  const provider = new OpenStreetMapProvider();
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    label: '',
    value: ''
  });
  const [mapOptions, setMapOptions] = useState({
    center: [48.5239429, 37.7075811],
    zoom: 10,
    scrollwheel: false,
    tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  });

  useEffect(() => {
    if (selectedOption.value) {
      setMapOptions((prev) => {
        return {
          ...prev,
          center: selectedOption.value,
          zoom: 16
        }
      })
    }
  }, [selectedOption])


  function onSearch(value) {
    if (value?.label?.length) {
      setIsLoading(true);
      provider.search({ query: value.label }).then(res => {
        const options = res.map(r => ({ value: [r.y, r.x], label: r.label }));
        setOptions(options);
        setIsLoading(false);
      });
    }
  }

  return (
    <div className='main-container animate__fadeIn animate__animated '>
      <h2 className='animate__animated  animate__fadeInLeft'>React 18 Leaflet Maps</h2>
      <SearchComponent options={options} isLoading={isLoading} value={setSelectedOption} onSubmit={onSearch} />
      <Map options={mapOptions} customIcon={CustomIcon} />
    </div>
  );
}

export default App;
