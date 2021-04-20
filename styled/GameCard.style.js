import styled from 'styled-components';

export const GameCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    width: 250px;
    height: 300px;
    border-radius: 15px;
    background: rgba(0,0,0,0.2);
    padding: 0px;
    margin: 10px;
    color: white;
    overflow: hidden;
    box-shadow: 0px 0px 4px 4px rgba(0,0,0, 0.1);
    transition: 0.5s;

    :hover {
        box-sizing: border-box;
        border: 1px solid;
        transition: 0.5s;
    }

    :hover img {
        transform: scale(1.2);
        transition: 0.5s;
    }
`;

export const GameDescription = styled.div`
    padding: 10px;
    width: calc(100% - 30px);
    font-weight: 700;
`;

export const GameHeaderImage = styled.img`
    object-fit: cover;
    width: 100%;
    height: 150px;
    transition: 0.5s;
`;

export const GameHeaderLink = styled.a`
    color: white;
    cursor: pointer;
    display: block;
    text-align: center;

    font-size: 24px;
    font-weight: 700;

    text-decoration: none;

    &:hover {
        color: lightblue;
        transition: 0.15s;
    }
`;
