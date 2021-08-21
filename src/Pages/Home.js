import React, { useState } from 'react';
import ActorGrid from '../Components/actor/ActorGrid';
import MainPageLayout from '../Components/MainPageLayout';
import ShowGrid from '../Components/show/ShowGrid';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
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
      <input
        type="text"
        placeholder="search..."
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <div>
        <label htmlFor="show-search">
          Shows
          <input
            id="show-search"
            type="radio"
            value="show"
            checked={isSearchShow}
            onChange={onRadioSearch}
          />
        </label>

        <label htmlFor="actor-search">
          Actors
          <input
            id="actor-search"
            type="radio"
            value="people"
            checked={!isSearchShow}
            onChange={onRadioSearch}
          />
        </label>
      </div>

      <button type="button" onClick={onSearch}>
        Search
      </button>

      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
