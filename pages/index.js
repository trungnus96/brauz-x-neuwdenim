import React, { useState, useEffect } from "react";
import styled from "styled-components";

// utilities
import { loadScript } from "../src/utils";

const StyledIndexPage = styled.div``;

const PRODUCT = {
  product_id: 25885,
  image_url:
    "https://www.neuwdenim.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0361%2F2645%2F7989%2Fproducts%2F38637-5627-zero-jemima_lola-mom-jemima_1.jpg%3Fv%3D1625539221&w=1440&q=75",
  name: "Lola Mom Zero Jemima",
  price: 169.95,
  sizes: [
    {
      code: "38637-5627-ZERO JEMIMA-24/28",
      barcode: "9356249012986",
      value: "24/28",
    },
    {
      code: "38637-5627-ZERO JEMIMA-24/30",
      barcode: "9356249221210",
      value: "24/30",
    },
    {
      code: "38637-5627-ZERO JEMIMA-25/28",
      barcode: "9356249012993",
      value: "25/28",
    },
    {
      code: "38637-5627-ZERO JEMIMA-25/30",
      barcode: "9356249221227",
      value: "25/30",
    },
    {
      code: "38637-5627-ZERO JEMIMA-26/28",
      barcode: "9356249013006",
      value: "26/28",
    },
  ],
  product_url: "https://www.neuwdenim.com/au/products/lola-mom-zero-jemima",
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
 * https://brauz.com/command/reserve-in-store/setup
 ************************************/
const GROUP_NUMBER = "TC_shBq";

function HomePage() {
  // hooks
  const [selected_size, setSelectedSize] = useState({});
  const [is_error, setIsError] = useState(false);

  useEffect(() => {
    // Import Brauz SDK to PDP (you can load it asynchronously)
    loadScript(PACKAGE_URL, () => {
      window.Brauz.initializeBrauzReserveInStore(GROUP_NUMBER, {}, () => {
        // Pass product data to Brauz's Reserve In-Store config
        window.Brauz_config = {
          reserve_in_store: {
            product: {
              product_id: PRODUCT.product_id,
              image_url: PRODUCT.image_url,
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
      // you can use either code or barcode (barcode is preferred)
      window.Brauz_handle_attribute_change({ product_sku: size.barcode });
    }
  };

  const onFindStores = () => {
    const is_size_selected = selected_size.barcode;

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
    <StyledIndexPage>
      <div className="disclaimer">Demonstration purpose only</div>
      <header>
        <img
          src="https://www.neuwdenim.com/_next/static/images/BrandLogo_New-d94c3b9d0b01db1231104de7ecab219f.png"
          alt="neuw"
        />
      </header>

      <div className="main">
        <div className="image-container">
          <img src={PRODUCT.image_url} alt={PRODUCT.name} />
        </div>

        <div className="product-info-container">
          <div className="name">{PRODUCT.name}</div>
          <div className="price">A$ {PRODUCT.price}</div>
          <div className="container">
            <div>
              <strong>Size</strong>
              {is_error && <span className="error-message">Select a size</span>}
            </div>
            <div className="sizes-container">
              {PRODUCT.sizes.map((size, index) => {
                const is_selected = size.barcode === selected_size.barcode;
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

          <div className="container buttons-container">
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
    </StyledIndexPage>
  );
}

export default HomePage;
