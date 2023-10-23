
import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponents";
import MovieInfoComponent from "./components/MovieInfoComponents";

export const API_KEY = "a9118a3a";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color:white;
  position:relative;
  left:1em;
`;
const Header = styled.div`
  background-color: #400080;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
  transition: background-color 0.3s;
  &:hover{
    box-shadow: 0px 0px 10px lightblue;
  }

`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 50px;
  height: 50px;
  margin: 20px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  background: transparent;
  
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;
const Placeholder = styled.div`
  width: auto;
  height: auto;
  margin: 150px;
  font-size:20pt;
  text-align:center;
  font-family:Lucida Console;
  line-height:1.6em
  
`;
const About = styled.div`
  font-family:Verdana;
  margin:30px;
  position:relative;
  bottom:2em
  
`;


function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="https://o.remove.bg/downloads/694d577f-d825-4287-ae72-c5de4c8b044d/pngtree-white-movie-icon-png-image_4618956-removebg-preview.png" />
          Film Finder
        </AppName>
        <SearchBox>
          <SearchIcon src="https://o.remove.bg/downloads/c96682c0-9518-43a3-84c5-87e4c86f09af/109-1092764_search-icon-icon-find-svg-hd-png-download-removebg-preview.png" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          
          <Placeholder> 
            <About><h1>About Film Finder</h1></About>
            On Film Finder, you can effortlessly search for any movie you desire and access comprehensive details about it. The search feature allows you to input the movie's title to instantly retrieve a list of matching results. Once you've found the movie you're interested in, you can explore a treasure trove of information. This includes the movie's title, release year, genre, director, cast, a brief synopsis, ratings. Whether you're looking for classic films, the latest releases, or hidden gems, Film Finder is a user-friendly and comprehensive platform for discovering, researching, and enjoying the world of cinema.
          </Placeholder>
          
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;