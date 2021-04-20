import styled from 'styled-components';

export default styled.a`
    color: white;
    cursor: pointer;
    text-align: center;

    font-size: 24px;
    font-weight: 700;

    padding: 15px;

    margin: 15px 0px;

    height: 30px;
    
    background: rgba(0,0,0,0.2);
    border-radius: 5px;
    border: solid 1px #767676;

    line-height: 30px;

    text-decoration: none;

    &:hover {
        color: lightblue;
        transition: 0.15s;
    }
`;
