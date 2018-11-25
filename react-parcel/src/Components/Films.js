import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import films from '../DB/imdb'
import styled from 'styled-components'

const GridContainer = styled.div`
    display: flex;
    align-content: stretch;
    flex-flow: row wrap;
    height: 100px;
    > * {
        flex: 1 0 10%;
    }
`;

const GridItem = styled.div`
    width: 100px;
    height: 100%;
    margin: auto; 
    padding: 5px;
    outline: 1px solid black;
    align-self: flex-start;
    text-align: center;
    align-self: center;
    font-size: 14px;
`;

const MyComponent = props => {
    return (
        <GridContainer>
            {films.map((item, index) =>
                <GridItem key={`item-${index}`}>
                    <p key={`p-${index}`}>{item}</p>
                </GridItem>
            )}
        </GridContainer>
    );
};

MyComponent.propTypes = {

};

export default MyComponent;
