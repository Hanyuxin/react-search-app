import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Table } from '../Table';
import { Search } from '../Search';
import { Button } from '../Button';
import { ButtonWithLoading } from '../Loading';
import {
    DEFAULT_QUERY,
    DEFAULT_HPP,
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP,    
  } from '../../constants';
import './index.css';

const updateSearchTopStoriesState = (hits, page) => (previousState) => {
  const { results, searchKey } = previousState;

  const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : [];

  const updateHits = [
    ...oldHits,
    ...hits,
  ];

  return {
    results: {
      ...results,
      [searchKey]: {hits: updateHits, page}
    },
    isLoading: false,
  };
}

class App extends Component {

  is_mounted = false;

  constructor(props) {
    super(props);

    this.state={
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: '',
      isLoading: false,
    }

    this.needSearch = this.needSearch.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  needSearch(searchKey) {
    return !this.state.results[searchKey];
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({searchKey: searchTerm});
    
    if (this.needSearch(searchTerm)) {
      this.setState({isLoading: true});
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  setSearchTopStories(result) {
    const { hits, page } = result;

    this.setState(updateSearchTopStoriesState(hits, page));
  }

  componentDidMount() {
    const {searchTerm} = this.state;
    this.setState({searchKey: searchTerm});
    this.is_mounted = true;
    this.fetchSearchTopStories(searchTerm);
  }

  ComponentWillUnmount() {
    this.is_mounted = false;
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(result => this.is_mounted && this.setSearchTopStories(result.data))
      .catch(error => this.is_mounted && this.setState({error}));
  }

  onDismiss(id) {
    const {searchKey, results } = this.state;
    const {hits, page} = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updateHits = hits.filter(isNotId);
    this.setState({
      results: {
        ...results,
        [searchKey]: {hits: updateHits, page}
      }
    });
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  render() {
    const {searchKey, searchTerm, results, error, isLoading} = this.state;

    const page = (results && results[searchKey] && results[searchKey].page) || 0;

    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    
    if (error) {
      return <p>something went wrong</p>;
    }

    return (
      <div className="page">
      <div className="interactions">
      <Search 
        value={searchTerm}
        onChange={this.onSearchChange}
        onSubmit={this.onSearchSubmit}
        >
        Search
        </Search>
      </div>
      { list && <Table 
         list={list}
         onDismiss={this.onDismiss}
      />
      }
      <ButtonWithLoading
        isLoading={isLoading}
        onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
        >
        More
        </ButtonWithLoading>
      </div>
    )
  }
}

export default App;