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
    <div className="special-deals">
      <div className="special-deals-label">Special Deals</div>
      <div className="special-deals-products">
        {products.slice(0, 3).map(product => (
          <Product/>
        ))}
      </div>
    </div>
    <div className="about">
      <div className="about-label">About</div>
          <div className="about-text">
          Lorem ipsum dolor sit amet, putent vituperatoribus te nam, ut summo atomorum qualisque vis. Ex eius scriptorem vis, nec rebum propriae voluptatibus ex. Ei cum munere tempor noluisse, cum eu corpora adversarium.
          </div>
    </div>
    <div className="newsletter">
          <div className="newsletter-label">Subscribe to our Newsletter</div>
          <div className="newsletter-text">
          Et vim falli omittam, mei aeterno mandamus vulputate ut. Sit quidam legimus nominavi et. Augue dissentias pro in, te indoctum conclusionemque sea, tation honestatis te vix. No has illud mucius mandamus, assum scribentur quo ad, eum an ignota dissentias.
          </div>
          <div className="subscribe-container">
          <input type="email" placeholder="Enter your email:" className="newsletter-email-input"></input>
          <button className="newsletter-subscribe">SUBSCRIBE</button>
          </div>
    </div>
    <div className="copyright">
      <div>© Mantra Seeds 2022</div>
    </div>
    </>
  )
}
