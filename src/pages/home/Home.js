// styles
import "./Home.css"

// components
import Product from "../../components/Product"

export default function Home() {
  const products = ["weed", "weed", "weed", "weed", "weed", "weed", "weed", "weed"]

  return (
    <>
    <div className="banner">
        <div className="welcome">Welcome to</div>
        <div className="banner-title">MantraSeeds</div>
        <button className="banner-shop-now">SHOP NOW</button>
    </div>
    <div className="recent-products">
      <div className="recent-products-label">Recent Products</div>
      <div className="recent-product">
        {products.map(product => (
          <Product/>
        ))}
        </div>
    </div>
    </>
  )
}
