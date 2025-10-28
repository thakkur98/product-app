"use client";
import { API_REQUEST } from "@/src/Redux/Constant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: API_REQUEST });
  }, [dispatch]);

  const {
    loading,
    data = [],
    error,
  } = useSelector((state: any) => state.product);

  const [counts, setCounts] = useState<Record<number, number>>({});

  const handleAddToCart = (id: number) => {
    setCounts((prev) => ({ ...prev, [id]: 1 }));
  };

  const handleIncrement = (id: number) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDecrement = (id: number) => {
    setCounts((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  const [showCart, setShowCart] = useState(false);

  return (
    <DashboardStyle>
      <button className="view-cart-btn" onClick={() => setShowCart(true)}>
        View Cart 
      </button>
      <h1>Product List</h1>

      {loading && <p className="status">Loading products...</p>}
      {error && <p className="status error">Error: {error}</p>}

      <div className="product-card-container">
        {data.length > 0
          ? data.map((productObj: any) => {
              const count = counts[productObj.id] ?? 0;
              return (
                <div className="card" key={productObj.id}>
                  <div className="img-container">
                    <img src={productObj.image} alt={productObj.title} />
                  </div>
                  <div className="about-product">
                    <h3>{productObj.title}</h3>
                    <p>₹{productObj.price}</p>
                  </div>
                  <div className="toggle-addcart">
                    {count === 0 ? (
                      <button className="add-cart" onClick={() => handleAddToCart(productObj.id)}>
                        Add to Cart
                      </button>
                    ) : (
                      <div className="count-div">
                        <button onClick={() => handleIncrement(productObj.id)}>
                          +
                        </button>
                        <span>{count}</span>
                        <button onClick={() => handleDecrement(productObj.id)}>
                          -
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          : !loading && <p className="status">No products found.</p>}
      </div>
      {showCart && (
        <div className="cart-popup">
          <div className="cart-content">
            <h2>Your Cart</h2>
            {Object.keys(counts).length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              <ul>
                {data
                  .filter((item: any) => counts[item.id])
                  .map((item: any) => (
                    <li key={item.id}>
                      <span>{item.title}</span>
                      <span className="price">
                        ₹{item.price} × {counts[item.id]} = ₹
                        {(item.price * counts[item.id]).toFixed(2)}
                      </span>
                    </li>
                  ))}
              </ul>
            )}
            {Object.keys(counts).length > 0 && (
              <h3>
                Total: ₹
                {data
                  .filter((item: any) => counts[item.id])
                  .reduce(
                    (acc: number, item: any) =>
                      acc + item.price * counts[item.id],
                    0
                  )
                  .toFixed(2)}
              </h3>
            )}
            <div className="close-btn">
              <button  onClick={() => setShowCart(false)}>
                Close
              </button>
            </div>
            
          </div>
        </div>
      )}
    </DashboardStyle>
  );
};

export default Dashboard;

export const DashboardStyle = styled.div`
  padding: 30px;
  color: #fff;
  background-color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .view-cart-btn {
    background: #aaa;
    color: #000;
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    position: absolute;
    right: 2%;
    cursor: pointer;
    margin-bottom: 20px;
  }

  h1 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 2rem;
    color: #000;
  }

  .status {
    text-align: center;
    margin-top: 20px;
    font-size: 1.1rem;
    color: #aaa;

    &.error {
      color: #ff5252;
    }
  }

  .product-card-container {
    display: flex;
    flex-wrap: wrap;
    margin-left: -10px;
  }

  .card {
    margin-left: 10px;
    margin-bottom: 10px;
    flex: 20%;
    background: #fff;
    border: 1px solid transparent;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

    &:hover {
      transform: translateY(-5px);
      border-color: #00bcd4;
    }

    .img-container {
      width: 100%;
      height: 180px;
      background: #aaa;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        padding: 10px;
      }
    }

    .about-product {
      padding: 15px;
      flex: 1;

      h3 {
        font-size: 1rem;
        color: #000;
        margin-bottom: 5px;
      }

      p {
        color: #000;
        font-weight: 400;
      }
    }

    .toggle-addcart {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 15px;
      border-top: 1px solid #222;
      .add-cart{
        padding: 8px 14px;
        font-weight: 600;
        border: 1px solid transparent;
        border-radius: 10px;
        background: #aaa;
      }
      .add-btn {
        background: #00bcd4;
        border: none;
        padding: 8px 14px;
        border-radius: 6px;
        color: #fff;
        cursor: pointer;
        font-weight: 600;
        transition: 0.3s ease;

        &:hover {
          background: #0097a7;
        }
      }

      .count-div {
        display: flex;
        align-items: center;
        gap: 8px;

        button {
          background: #aaa;
          border: none;
          color: #000;
          font-size: 1rem;
          padding: 5px 10px;
          cursor: pointer;
          border-radius: 4px;
          transition: 0.3s ease;

          &:hover {
            background: #333;
          }
        }

        span {
          color: #000;
          font-weight: 400;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .card {
      flex: calc(100% - 10px) !important;
    }
    .view-cart-btn {
        position: relative;
    }
  }
  .cart-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    .cart-content {
      background: #fff;
      color: #000;
      padding: 25px;
      border-radius: 10px;
      width: 400px;
      max-height: 80vh;
      overflow-y: auto;

      h2 {
        margin-bottom: 15px;
        text-align: center;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          border-bottom: 1px solid black;
          span{
            margin: 15px 0;
            font-size: 14px;
          }
          .price{
            font-weight: 600;
          }
        }
      }

      .close-btn{
        display: flex;
        justify-content: center;
        button {
          margin-top: 15px;
          background: #fff;
          color: #000;
          border: 1px solid #000;
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }
      }
     
    }
  }
`;
