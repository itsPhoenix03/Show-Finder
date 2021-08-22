import React, { useState } from 'react';
import ActorGrid from '../Components/actor/ActorGrid';
import CustomRadio from '../Components/CustomRadio';
import MainPageLayout from '../Components/MainPageLayout';
import ShowGrid from '../Components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hook';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResult] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  const isSearchShow = searchOption === 'shows';

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onRadioSearch = ev => {
    setSearchOption(ev.target.value);
  };

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result =>
      setResult(result)
    );
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) onSearch();
  };

  const renderResult = () => {
    if (results && results.length === 0) return <div>No Result Found</div>;
    if (results && results.length > 0)
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    return null;
  };

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="search..."
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="show-search"
            value="show"
            checked={isSearchShow}
            onChange={onRadioSearch}
          />
        </div>

        <div>
          <CustomRadio
            label="Actors"
            id="actor-search"
            value="people"
            checked={!isSearchShow}
            onChange={onRadioSearch}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>

      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
