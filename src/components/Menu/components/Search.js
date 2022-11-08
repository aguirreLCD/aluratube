import React from "react";
import styled from "styled-components";

const StyledSearch = styled.div`
  display: flex;
  flex-direction: row;
  /* border: 1px solid ${({ theme }) => theme.borderBase}; */
  border: 1px solid ${({ theme }) => theme.borderBase || "#660708"};

  max-width: 425px;
  width: 100%;
  border-radius: 2px;
  overflow: hidden;

  input {
    width: 80%;
    padding: 4px 6px;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.textColorBase || "#b1a7a6"};
    /* background-color: ${({ theme }) => theme.backgroundBase}; */
    background-color: ${({ theme }) => theme.backgroundLevel1 || "#161a1d"};
  }
  button {
    flex: 1;
    cursor: pointer;
    border: none;
    background-color: ${({ theme }) => theme.backgroundLevel1 || "#161a1d"};
    box-shadow: 0 1px 0 rgb(0 0 0 / 10%);
    border-left: 1px solid ${({ theme }) => theme.borderBase || "#660708"};

    width: 40px;
    height: 40px;
    @media (min-width: 600px) {
      width: 64px;
      height: 40px;
    }
  }
`;

// Home
// Menu
// Search

export default function Search({ filterValue, setFilterValue }) {
  const searchedValue = filterValue;
  const setSearchedValue = setFilterValue;

  return (
    <StyledSearch>
      <input
        type="text"
        onChange={(e) => setSearchedValue(e.target.value)}
        value={searchedValue}
      />
      <button>🔎</button>
    </StyledSearch>
  );
}
