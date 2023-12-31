import React, { useState, useEffect, useCallback, Suspense } from "react";
import {
  Layout,
  Pagination,
  Input,
  Form,
  Button,
  Select,
  Progress as AntProgress,
  AutoComplete,
} from "antd";
import { getDistance } from "geolib";
import axios from "axios";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Result from "./Result";
import ResultsMap from "./ResultsMap";
import Sort from "./Sort";
import getData from "./getData";
import { terms, MAPBOX_TOKEN } from "../config";
import geocodeCity from "../functions/geoCodeCity";

const StyledForm = styled(Form)`
  width: 40%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const AutocompleteContainer = styled.div`
  position: relative;
  width: 13rem;
  margin-right: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .location-search-input {
    width: 100%;
  }

  .autocomplete-dropdown-container {
    position: absolute;
    top: 100%;
    width: 100%;
    max-height: 10rem;
    overflow-y: auto;
    background-color: #ffffff;
    border: 1px solid #cccccc;
    z-index: 10;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-right: auto;
    margin-left: auto;

    .location-search-input {
      width: 100%;
      min-width: 15rem; /* Adjust the max-width value as needed */
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  button {
    margin: 0 5px 5px 0;
  }
`;
const { Option } = Select;
const PAGE_SIZE = 5;

const Results = () => {
  
  const [sortOrder, setSortOrder] = useState("distance");
  const { state } = useLocation();
  const [radius, setRadius] = useState(25);
  const [results, setResults] = useState([]);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(-1);
  const [currentResults, setCurrentResults] = useState([]);
  const [sortedResults, setSortedResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [checkboxOptions, setCheckboxOptions] = useState(
    state?.checkedOptions ?? [
      { label: "PRP", value: "PRP", checked: false },
      { label: "Stem Cell Therapy", value: "Stem", checked: false },
      { label: "Prolotherapy", value: "Prolotherapy", checked: false },
    ]
  );
  const [page, setPage] = useState(1);
  const [filterTerm, setFilterTerm] = useState(state?.searchTerm ?? "");
  const [storedValues, setStoredValues] = useState({
    filterTerm: "",
    address: "",
    checkboxOptions: [],
    radius: "",
  });

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(state?.location ?? "");
  const [addressss,setAddressss]=useState(state?.location ?? "");
  const [userLocation, setUserLocation] = useState(null);
  const [filterCoordinates, setFilterCoordinates] = useState(null);
  const [percent, setPercent] = useState(0);

  const [showSuggestions, setShowSuggestions] = useState(false);
  

// modify sakib
  const handleSuggestionClick = (suggestion, event) => {
    event.stopPropagation(); // Stop event propagation

    const filterTerm = suggestion.value.toString(); // Convert to string
    setSearchTerm(filterTerm.toLowerCase());
    console.log(`search term: ${searchTerm}`);
  };

  const handleUseCurrentLocationChange = (event) => {
    setUseCurrentLocation(event.target.checked);
  };

  const handleSearch = (value) => {
    setFilterTerm(value);
    setOptions(getFilteredOptions(value));
  };

  const handleAddressChange = async (value) => {
    setAddress(value);
  
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          value
        )}.json?access_token=${MAPBOX_TOKEN}`
      );

      console.log('API response:', response.data);

  
      // Filter suggestions for US cities
      const usCities = response.data.features.filter(
        (suggestion) =>
          suggestion.context &&
          suggestion.context.find(
            (context) => context.id.startsWith("country") && context.short_code === "us"
          )
      );
  
      setSuggestions(usCities);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleRadiusChange = (value) => {
    setRadius(value);
    console.log(`radius: ${radius}`);
  };
//modify sakib
  const handleCheckChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    const updatedOptions = checkboxOptions.map((option) =>
      option.value === value ? { ...option, checked } : option
    );

    setCheckboxOptions(updatedOptions);
  };

  const handleChangePage = useCallback((page, pageSize) => {
    setPage(page);
   // setPageSize(pageSize);
  }, []);

  const handleProfileClick = (result) => {
    console.log("Clicked result:", result);
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      } catch (error) {
        console.log("Error retrieving user location:", error);
        setUserLocation(null); // Set userLocation to null in case of error or denial
      }
    };

    const handleLocationError = (error) => {
      console.log("Error retrieving user location:", error);
      setUserLocation(null); // Set userLocation to null in case of error or denial
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        fetchUserLocation,
        handleLocationError
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setUserLocation(null); // Set userLocation to null if geolocation is not supported
    }
  }, []);

  useEffect(() => {
    const storedValuesJSON = localStorage.getItem("storedValues");
    if (storedValuesJSON) {
      const storedValuesData = JSON.parse(storedValuesJSON);
      setStoredValues(storedValuesData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("storedValues", JSON.stringify(storedValues));
  }, [storedValues]);

  const handleButtonClick = (value) => {
    const updatedOptions = checkboxOptions.map((option) =>
      option.value === value ? { ...option, checked: !option.checked } : option
    );
    setCheckboxOptions(updatedOptions);
    localStorage.setItem("checkboxOptions", JSON.stringify(updatedOptions));
  };

  const handleInputChange = useCallback((e) => {
    const searchTerm = e.target.value;
    setFilterTerm(searchTerm);
  }, []);

  const updateResults = (filteredResults) => {
    if (filteredResults.length === 0) {
      setResults([]);
      setCurrentResults([]);
      setSortedResults([]);
    } else {
      setResults(filteredResults);
      setCurrentResults(filteredResults);
      setSortedResults(filteredResults);
      setPage(1);
    }
  };

  const getFilteredOptions = (value) => {
    const filterTerm = value.trim().toLowerCase();
    const filteredOptions = terms.filter((term) =>
      term.toLowerCase().includes(filterTerm)
    );
    return filteredOptions.map((label) => ({ value: label }));
  };

  

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);

      if (!address || address.length === 0) {
        setLoading(false);
        return;
      }

      const [city, state, country] = address.split(",");
      const trimmedCity = city?.trim();
      const trimmedState = state?.trim();
      const trimmedCountry = country?.trim() || "United States";

      if (address.split(",").length < 3) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await getData(
          filterTerm,
          checkboxOptions,
          trimmedCity,
          trimmedState,
          trimmedCountry,
          radius,
          setPercent
        );

        if (error) {
          console.log("Error retrieving search results:", error);
          setLoading(false);
          return;
        }

        updateResults(data);
      } catch (error) {
        console.log("Error retrieving search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [filterTerm, checkboxOptions, address, radius]);

  useEffect(() => {
    const locationArray = address.split(",");
    if (locationArray.length >= 3) {
      const city = locationArray[0]?.trim();
      const state = locationArray[1]?.trim();
      const country = locationArray[2]?.trim();

      if (city && state && country) {
        const getGeocodedAddress = async () => {
          const geocodedAddress = await geocodeCity(city, state, country);
          console.log("geocodedAddress:", JSON.stringify(geocodedAddress));
          setFilterCoordinates(geocodedAddress);
        };

        getGeocodedAddress();
      } else {
        console.log("Invalid address format:", address);
      }
    } else {
      console.log("Invalid address:", address);
    }
  }, [address]);

  useEffect(() => {
    if (results.length > 0) {
      setLoading(false);
    }
  }, [results]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.log("Error retrieving user location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    console.log("Current sorted results:", sortedResults);

    // Update currentResults based on sortedResults
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const slicedResults = sortedResults.slice(startIndex, endIndex);
    setCurrentResults(slicedResults);
  }, [sortedResults, page]);

  useEffect(() => {
    const sortResults = () => {
      let sorted = [...results];
  
      if (sortOrder === "distance") {
        console.log("Sorting by distance...");
        sorted = results.map((result) => {
          const distance = getDistance(
            {
              latitude: filterCoordinates.latitude,
              longitude: filterCoordinates.longitude,
            },
            { latitude: result.latitude, longitude: result.longitude }
          );
          return { ...result, distance };
        });
        sorted.sort((a, b) => a.distance - b.distance);
      } else if (sortOrder === "asc") {
        console.log("Sorting in ascending order...");
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOrder === "desc") {
        console.log("Sorting in descending order...");
        sorted.sort((a, b) => b.name.localeCompare(a.name));
      }
  
      return sorted;
    };
  
    const updateSortedResults = () => {
      const sorted = sortResults();
  
      // Update sortedResults state
      setSortedResults(sorted);
  
      // Update currentResults based on sortedResults
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const slicedResults = sorted.slice(startIndex, endIndex);
      setCurrentResults(slicedResults);
    };
  
    if (userLocation === null) {
      setSortOrder("asc"); // Set sortOrder to 'asc' if userLocation is null
    } else {
      updateSortedResults();
    }
  }, [results, sortOrder, userLocation, page]);
  
  return (
    <Layout className="results">
      <h1>Results</h1>
  
      <section className="results-section">
        <section className="search">
          <h4>Search</h4>
          <AutoComplete
            style={{ width: "70%", height: "50px", margin: "0 auto" }}
            value={filterTerm}
            options={getFilteredOptions(filterTerm)}
            onChange={handleSearch}
            placeholder="Search medical conditions"
          />
  
          <StyledForm>
          <AutoComplete
  style={{ width: "40vw", maxWidth: "450px", height: "50px" }}
  value={address}
  onSelect={(value) => setAddress(value)}
  onSearch={handleAddressChange}
  placeholder="Enter a location..."
  options={suggestions.map((suggestion) => ({
    label: suggestion.place_name,
    value: suggestion.place_name,
  }))}
/>

            <Form.Item>
              <Select
                value={radius}
                onChange={handleRadiusChange}
                style={{ width: "100%", marginTop: "10px" }}
              >
                <Option value={25}>25 miles</Option>
                <Option value={50}>50 miles</Option>
                <Option value={100}>100 miles</Option>
                <Option value={500}>500 miles</Option>
              </Select>
            </Form.Item>
          </StyledForm>
  
          <Sort sortOrder={sortOrder} onSortOrderChange={setSortOrder} />
  
          <ButtonContainer>
            {checkboxOptions.map((option) => (
              <Button
                key={option.value}
                type={option.checked ? "primary" : "default"}
                onClick={() => handleButtonClick(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </ButtonContainer>
  
          <ResultsMap
            style={{ width: "20%" }}
            results={results}
            coordinates={filterCoordinates}
            address={address}
          />
        </section>
  
        <section className="results-list">
        <Suspense fallback={<div>Loading...</div>}>
  {loading ? (
    <div>
      <AntProgress percent={percent} status="active" strokeColor="#4811ab" trailColor="#ffdb58" style={{ height: "8rem" }} />
      <div>Loading results...</div>
    </div>
  ) : !address ? (
    <h2>No Address Found</h2>
  ) : currentResults.length === 0 ? (
    <h2>No Results Found</h2>
  ) : (
    <div>
      {currentResults.map((result, index) => (
        <Result
          result={result}
          key={result.id}
          resultAddress={address}
          initialSearch={filterTerm}
          resultRadius={radius}
          onProfileClick={handleProfileClick}
          isSelected={selectedMarkerIndex === index}
        />
      ))}
      <Pagination
        total={results.length}
        pageSize={PAGE_SIZE}
        current={page}
        onChange={handleChangePage}
      />
    </div>
  )}
</Suspense>

        </section>
      </section>
    </Layout>
  );
};

export default Results;