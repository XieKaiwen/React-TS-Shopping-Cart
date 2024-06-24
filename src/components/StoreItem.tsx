import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export default function StoreItem({ id, name, price, imgUrl }: Readonly<StoreItemProps>) {
  const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, openCart, closeCart} = useShoppingCart()
  const quantity = getItemQuantity(id)
  return (
    <Card key={id} className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity==0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+ Add To Cart</Button>
          ) : <div className="d-flex align-items-center flex-column" style={{gap:".5rem"}}>
                <div className="d-flex align-items-center justify-content-center" style={{gap:".5rem"}}>
                  <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                  <div className="fs-3"><span>{quantity}</span> in cart</div>
                  <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                </div>
                <Button variant="danger" onClick={() => removeFromCart(id)}>Remove</Button>
          </div> } 
          {/* Conditionally render either add to cart button or + and - buttons */}
        </div>
      </Card.Body>
    </Card>
  );
}
