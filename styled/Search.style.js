import styled from 'styled-components';

export const SearchOptions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
`;

export const GameSearch = styled.input`
    margin: 15px;
    width: 214px;
    font-size: 14px;
    border-radius: 5px;
    height: 30px;
    color: white;
    background: rgba(0,0,0,0.2);
    text-align: center;

    border: solid 1px #767676;
`;

export const SortSelector = styled.select`
    margin: 15px;
    width: 220px;
    padding: 5px 5px 5px 5px;
    font-size: 14px;
    border-radius: 5px;
    height: 34px;
    color: white;
    background: #253645;
    text-align: center;
`;

export const PlatformSelector = styled.div`
    margin: 15px;
    width: 208px;
    padding: 5px 5px 5px 5px;
    font-size: 14px;
    border-radius: 5px;
    height: 150px;
    color: white;
    background: #253645;
    text-align: center;

    overflow-y: scroll;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    border: solid 1px #767676;
`;

export const Checkbox = styled.input`
    content: "\2713";
    text-shadow: 1px 1px 1px rgba(0, 0, 0, .2);
    font-size: 15px;
    color: #f3f3f3;
    text-align: center;
    line-height: 15px;
`;
