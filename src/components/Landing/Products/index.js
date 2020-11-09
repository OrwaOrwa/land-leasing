import React, {Component} from 'react';
import {
    Crops,
    Image,
    Item,
    ItemDetailsDiv,
    ItemImageDiv, ItemName,
    ItemsContainer,
    ItemsDiv,
    ItemsName, Price
} from "../../elements/ProductsAndLanding";


class ProductsList extends Component {

    state = {
        loading: false,
        products: []
    }

    render() {
        const {loading, products} = this.state;
        return (
            <ItemsContainer>
                <ItemsName>Products Available</ItemsName>
                {loading ? <div> Loading...</div>
                    :
                    <ItemsDiv>
                        {products.map((product) => (
                            <Item key={product.id}>
                                <ItemImageDiv>
                                    <Image src={product.image} alt={product.name}/>
                                </ItemImageDiv>
                                <ItemDetailsDiv>
                                    <ItemName>{product.name}</ItemName>
                                    <Crops>{product.merchantName}</Crops>
                                    <Price>Ksh. {product.price}</Price>
                                </ItemDetailsDiv>
                            </Item>
                        ))}
                    </ItemsDiv>}
            </ItemsContainer>
        );
    }
}

export default ProductsList;