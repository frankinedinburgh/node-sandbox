import React, {Component, Fragment} from 'react';
import styled from 'styled-components'



const Column = styled.div`
    float: left;
    width: 25%;
    padding: 10px;
    img {
        opacity: 0.8; 
        cursor: pointer;
        &:hover {
            opacity: 1;
        }
    }
`;



const Row = styled.div`
    :after {
        content: "";
        display: table;
        clear: both;
    }
`;



const Container = styled.div`
    position: relative;
    display: none;
`;


const ImgTxt = styled.div`
    position: absolute;
    bottom: 15px;
    left: 15px;
    color: white;
    font-size: 20px;   
`;


const CloseBtn = styled.div`
    position: absolute;
    top: 10px;
    right: 15px;
    color: white;
    font-size: 35px;
    cursor: pointer;   
`


class TabGallery extends Component {

    constructor(props) {
        super(props)
        this.openImg = this.openImg.bind(this);
    }

    openImg(el) {

    }
    render() {
        return (
            <Fragment>
                <Row>
                    <Column className="column">
                        <img src="img_nature.jpg" alt="Nature" onClick={() => { this.openImg(this); }}/>
                    </Column>
                    <Column className="column">
                        <img src="img_snow.jpg" alt="Snow" onClick={() => { this.openImg(this); }}/>
                    </Column>
                    <Column className="column">
                        <img src="img_mountains.jpg" alt="Mountains" onClick={() => { this.openImg(this); }}/>
                    </Column>
                    <Column className="column">
                        <img src="img_lights.jpg" alt="Lights" onClick={() => { this.openImg(this); }}/>
                    </Column>
                </Row>


                <Container>
                    <!-- Close the image -->
                    <CloseBtn onClick={() => { this.parentElement.style.display='none' }}>&times;</CloseBtn>
                    <img id="expandedImg" style="width:100%" />
                    <ImgTxt />
                </Container>
            </Fragment>
        )
    }
}

export default TabGallery;

