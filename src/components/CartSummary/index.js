import {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import 'reactjs-popup/dist/index.css'
import './index.css'

const CartSummary = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const totalPrice = cartList.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        )
        const quantity = cartList.length

        const paymentOptions = [
          {label: 'Card', value: 'card'},
          {label: 'Net Banking', value: 'netbanking'},
          {label: 'UPI', value: 'upi'},
          {label: 'Wallet', value: 'wallet'},
          {label: 'Cash on Delivery', value: 'cod'},
        ]

        const handleConfirm = close => {
          if (paymentMethod !== null) {
            setOrderPlaced(true)
            close()
          }
        }

        console.log(paymentOptions.value)

        return (
          <>
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {totalPrice}/-
              </h1>
              <p className="total-items">{quantity} Items in cart</p>

              <Popup
                trigger={
                  <button type="button" className="checkout-button">
                    Checkout
                  </button>
                }
                modal
                nested
              >
                {close => (
                  <div className="popup-box">
                    <h2>Select Payment Method</h2>
                    <form>
                      {paymentOptions.map(option => (
                        <label key={option.value}>
                          <input
                            type="radio"
                            name="payment"
                            value={option.value}
                            checked={paymentMethod === option.value}
                            onChange={e => setPaymentMethod(e.target.value)}
                            disabled={
                              paymentMethod !== '' &&
                              paymentMethod !== option.value
                            }
                          />
                          {option.label}
                        </label>
                      ))}
                    </form>

                    <div className="popup-summary">
                      <p>Items: {quantity}</p>
                      <p>Total Price: Rs {totalPrice}/-</p>
                    </div>

                    <button
                      type="button"
                      className="confirm-order-button"
                      onClick={() => handleConfirm(close)}
                    >
                      Confirm Order
                    </button>
                    <button
                      type="button"
                      className="close-popup"
                      onClick={close}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </Popup>
            </div>

            {orderPlaced && (
              <div className="order-success">
                <p>Your order has been placed successfully</p>
              </div>
            )}
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
