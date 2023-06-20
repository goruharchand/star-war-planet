import axios from 'axios';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PeopleList from './components/peopleList';
import SearchForm from './components/searchForm';
import Pagination from './utils/planetPagination';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [people, setPeople] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchPeople(term);
  };

  const fetchPeople = (planetName, page = 1) => {
    axios.get(`https://swapi.dev/api/people/?search=${planetName}&page=${page}`)
      .then((response) => {
        const { data } = response;
        setPeople(data.results);
        setPagination({
          previous: data.previous,
          next: data.next,
        });
        setError('');
      })
      .catch((error) => {
        console.error(error);
        setPeople([]);
        setPagination({});
        setError('An error occurred. Please try again later.');
      });
  };

  const handlePageChange = (direction) => {
    const page = direction === 'next' ? pagination.next : pagination.previous;
    fetchPeople(searchTerm, getPageNumberFromUrl(page));
  };

  const getPageNumberFromUrl = (url) => {
    const pageNumberRegex = /page=(\d+)/;
    const match = url.match(pageNumberRegex);
    return match ? parseInt(match[1]) : 1;
  };

  return (
    <Router>
      <div>
        <h1>Star Wars Planet Search</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchForm onSearch={handleSearch} />
                {error && <p>{error}</p>}
                {people && people.length ? <PeopleList people={people} /> : ''}
                <Pagination
                  onPageChange={handlePageChange}
                  hasPreviousPage={pagination && pagination.previous}
                  hasNextPage={pagination && pagination.next}
                />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
