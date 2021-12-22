import React, { useCallback, useState } from 'react';
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

const renderResult = results => {
  if (results && results.length === 0)
    return (
      <div
        style={{ textAlign: 'center', color: '#2400ff', fontWeight: 'bolder' }}
      >
        Oops! No Result Found
      </div>
    );
  if (results && results.length > 0)
    return results[0].show ? (
      <ShowGrid data={results} />
    ) : (
      <ActorGrid data={results} />
    );
  return null;
};

const Home = () => {
  const [input, setInput] = useLastQuery('');
  const [results, setResult] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  const isShow = searchOption === 'shows';

  const onInputChange = useCallback(
    ev => {
      setInput(ev.target.value);
    },
    [setInput]
  );

  const onRadioSearch = useCallback(ev => {
    setSearchOption(ev.target.value);
  }, []);

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result =>
      setResult(result)
    );
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) onSearch();
  };

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="Find your desired show..."
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="show-search"
            value="shows"
            checked={isShow}
            onChange={onRadioSearch}
          />
        </div>

        <div>
          <CustomRadio
            label="Actors"
            id="actor-search"
            value="people"
            checked={!isShow}
            onChange={onRadioSearch}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={onSearch} style={{ fontWeight: '600' }}>
          Find
        </button>
      </SearchButtonWrapper>

      {renderResult(results)}
    </MainPageLayout>
  );
};

export default Home;
