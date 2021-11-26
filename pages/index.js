import React, { useState, useEffect } from "react";

// utilities
import { loadScript } from "../src/utils";

const PRODUCT = {
  image_url:
    "https://www.neuwdenim.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0361%2F2645%2F7989%2Fproducts%2F34375-5571-black-art_teodoruk-art-shirt-2-black-art_1.jpg%3Fv%3D1635920530&w=1440&q=75",
  product_name: "Teodoruk Art Shirt 2 - Black Art",
  brand_name: "Neuw",
  product_price: 99.95,
  sizes: [
    {
      code: "34375-5571-BLACK ART-S",
      value: "S",
    },
    {
      code: "34375-5571-BLACK ART-M",
      value: "M",
    },
    {
      code: "34375-5571-BLACK ART-L",
      value: "L",
    },
    {
      code: "34375-5571-BLACK ART-XL",
      value: "XL",
    },
  ],
  product_url:
    "https://www.neuwdenim.com/au/products/teodoruk-art-shirt-2-black-art",
};

/***********************************
 * READ ME
 * https://d3aq2u4yw77ivo.cloudfront.net/reserve-in-store/neuwdenim/reserveInStore.neuwdenim.dev.js
 * is Brauz test package (the package is for demonstration purpose only)
 * Please use this package URL for your implementation
 * https://d3aq2u4yw77ivo.cloudfront.net/reserve-in-store/neuwdenim/production/reserveInStore.neuwdenim.prod.js
 ************************************/
const PACKAGE_URL =
  "https://d3aq2u4yw77ivo.cloudfront.net/reserve-in-store/neuwdenim/reserveInStore.neuwdenim.dev.js";

/***********************************
 * READ ME
 * TC_shBq is Brauz test GROUP_NUMBER
 * You can find your GROUP_NUMBER at
 * https://brauz.com/command/reserve-in-store/setup > Get Script
 ************************************/
const GROUP_NUMBER = "TC_shBq";

function HomePage() {
  // hooks
  const [selected_size, setSelectedSize] = useState({});
  const [is_error, setIsError] = useState(false);

  useEffect(() => {
    // Import Brauz SDK to PDP
    loadScript(PACKAGE_URL, () => {
      window.Brauz.initializeBrauzReserveInStore(GROUP_NUMBER, {}, () => {
        // Pass product data to Brauz's Reserve In-Store config
        window.Brauz_config = {
          reserve_in_store: {
            product: {
              product_name: PRODUCT.product_name,
              brand_name: PRODUCT.brand_name,
              image_url: PRODUCT.image_url,
              product_price: PRODUCT.product_price,
              product_url: PRODUCT.product_url,
              // or
              // product_url: window.location.href
            },
          },
        };

        // initially call window.Brauz_handle_attribute_change to mount Find In Store component
        window.Brauz_handle_attribute_change();
      });
    });
  }, []);

  // functions
  const onSelectSize = (size) => {
    if (is_error) {
      setIsError(false);
    }

    setSelectedSize(size);

    if (
      window.Brauz_handle_attribute_change &&
      typeof window.Brauz_handle_attribute_change === "function"
    ) {
      // you can use either code
      window.Brauz_handle_attribute_change({
        product_sku: size.code,
        size: size.value,
      });
    }
  };

  const onFindStores = () => {
    const is_size_selected = selected_size.code;

    if (!is_size_selected) {
      return setIsError(true);
    }

    if (
      window.Brauz_open_reserve_in_store_dialog &&
      typeof window.Brauz_open_reserve_in_store_dialog === "function"
    ) {
      window.Brauz_open_reserve_in_store_dialog();
    }
  };

  return (
    <div>
      <div className="disclaimer">Demonstration purpose only</div>
      <header>
        <img
          src="https://www.neuwdenim.com/_next/static/images/BrandLogo_New-d94c3b9d0b01db1231104de7ecab219f.png"
          alt="neuw"
        />
      </header>

      <div className="main">
        <div className="image-container">
          <img src={PRODUCT.image_url} alt={PRODUCT.product_name} />
        </div>

        <div className="product-info-container">
          <div className="name">{PRODUCT.product_name}</div>
          <div className="price">A$ {PRODUCT.product_price}</div>
          <div className="container padding">
            <div>
              <strong>Size</strong>
              {is_error && <span className="error-message">Select a size</span>}
            </div>
            <div className="sizes-container">
              {PRODUCT.sizes.map((size, index) => {
                const is_selected = size.code === selected_size.code;
                return (
                  <button
                    className={`size-container ${
                      is_selected ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => onSelectSize(size)}
                  >
                    {size.value}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="container padding buttons-container">
            <button>Add to cart</button>

            {/* Build your own Reserve In-Store button (HTML/CSS) */}
            {/* Attach window.Brauz_open_reserve_in_store_dialog to your button */}
            <button className={is_error ? "error" : ""} onClick={onFindStores}>
              Find Stores
            </button>
          </div>

          <div className="container">
            <div id="Brauz_find_in_store_section"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
