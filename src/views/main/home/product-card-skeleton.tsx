import { Card, Placeholder } from 'react-bootstrap';

function ProductCardSkeleton() {
    return (
        <div className="item_product" id="product">
            <Card className="product-card" style={{ cursor: 'default' }}>
                <div className="product-card__img" style={{ backgroundColor: '#e9ecef' }} />
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as="div" animation="glow">
                        <Placeholder xs={4} />
                    </Placeholder>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ProductCardSkeleton;


