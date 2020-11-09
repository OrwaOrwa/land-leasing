import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {
    Crops,
    Image,
    Item,
    ItemDetailsDiv,
    ItemImageDiv, ItemName,
    ItemsContainer,
    ItemsDiv,
    ItemsName, Price
} from "../../../elements/ProductsAndLanding";
import placeholder from "../../../resources/images/home_farmland.png";

class LandsList extends Component {

    render() {
        const {loading, lands} = this.props;
        return (
            <ItemsContainer>
                <ItemsName>Land Available</ItemsName>
                {
                    loading ?
                        <div>Loading...</div> :
                        lands.length < 1 ?
                            <div>No land found with those parameters. Try a different search</div>
                            :
                            <ItemsDiv>
                                {lands.map((land) => (
                                    <Link
                                        to={`land-details/${land.id}`}
                                        style={{textDecoration: "none", color: "black"}}
                                        key={land.id}
                                    >
                                        <Item>
                                            <ItemImageDiv>
                                                <Image src={land.image.length > 0 ? land.image[0].image : placeholder}
                                                       alt={land.name}/>
                                            </ItemImageDiv>
                                            <ItemDetailsDiv>
                                                <ItemName>{land.name}</ItemName>
                                                <Crops>{land.crops}</Crops>
                                                <Price>Ksh. {land.price}</Price>
                                            </ItemDetailsDiv>
                                        </Item>
                                    </Link>
                                ))}
                            </ItemsDiv>
                }
            </ItemsContainer>
        );
    }
}

export default LandsList;