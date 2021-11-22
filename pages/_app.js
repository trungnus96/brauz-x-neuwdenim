import React, { Fragment } from "react";
import App from "next/app";
import Head from "next/head";

// Normalize
import { Normalize } from "styled-normalize";

// styled-components
import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 * {
    box-sizing: border-box;
  }

  @font-face {
    font-family: "HelveticaNowDisplay";
    src: url("/fonts/HelveticaNowDisplay-Regular.woff2") format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "HelveticaNowDisplay";
    src: url("/fonts/HelveticaNowDisplay-Medium.woff2") format("woff2");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "HelveticaNowDisplay";
    src: url("/fonts/HelveticaNowDisplay-Bold.woff2") format("woff2");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  body {
    font-family: HelveticaNowDisplay, "Helvetica Now Display", "Helvetica Neue",
    Arial, sans-serif;
    font-size: 14px;
  }

  .disclaimer {
    padding: 20px;
    border-bottom: 1px solid rgb(173, 173, 173);
    background-color: black;
    color: white;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 500;
  }

  header {
    padding: 30px 0;
    border-bottom: 1px solid rgb(173, 173, 173);
    text-align: center;

    img {
      height: 30px;
    }
  }

  .main {
    width: 1140px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    @media only screen and (max-width: 1200px) {
      width: 95%;
    }

    @media only screen and (max-width: 991px) {
      padding: 0 10vw;
    }

    @media only screen and (max-width: 650px) {
      padding: 0;
    }

    .image-container {
      width: 520px;

      @media only screen and (max-width: 1200px) {
        width: calc(100% - 500px - 40px);
      }

      @media only screen and (max-width: 991px) {
        width: 100%;
      }

      img {
        width: 100%;
      }
    }

    .product-info-container {
      width: calc(100% - 520px - 40px);

      @media only screen and (max-width: 1200px) {
        width: 500px;
      }

      @media only screen and (max-width: 991px) {
        width: 100%;
      }

      .name {
        font-weight: 600;
        font-size: 20px;
        line-height: 2.667rem;
      }

      .price {
        font-weight: 500;
        color: rgb(137, 141, 149);
        font-size: 18px;
        margin-bottom: 40px;
      }

      .container {
        padding: 24px;
        border: 1px solid rgb(237, 238, 241);

        &:not(:last-child) {
          border-bottom: none;
        }

        .sizes-container {
          display: flex;
          margin-top: 10px;
          flex-wrap: wrap;

          button.size-container {
            padding: 0px;
            font-family: HelveticaNowDisplay, "Helvetica Now Display",
              "Helvetica Neue", Arial, sans-serif;
            text-decoration: none;
            font-weight: 500;
            font-size: 13px;
            position: relative;
            height: 48px;
            width: 48px;
            margin: 0px 8px 8px 0px;
            border: none;
            background-color: rgb(248, 248, 249);
            color: rgb(0, 0, 0);
            transition: all 0.25s ease 0s;

            &:hover {
              background-color: rgb(237, 238, 241);
            }

            &.selected {
              background-color: rgb(9, 10, 10);
              color: white;
            }
          }
        }

        &.buttons-container {
          display: flex;

          button:nth-child(1) {
            margin-right: 10px;
          }
        }
      }
    }

    button {
      margin: 0px;
      font-family: HelveticaNowDisplay, "Helvetica Now Display",
        "Helvetica Neue", Arial, sans-serif;
      text-decoration: none;
      font-size: 13px;
      border: none;
      display: block;
      padding: 16px;
      background-color: rgb(0, 0, 0);
      color: rgb(255, 255, 255);
      cursor: pointer;

      &.error {
        background-color: darkred;
      }
    }

    .error-message {
      color: darkred;
      margin-left: 10px;
    }
  }
`;

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Fragment>
        <Head>
          <title>Neuwdenim x Brauz</title>
        </Head>
        <ThemeProvider theme={{}}>
          <Fragment>
            <Normalize />
            <GlobalStyle />
            <Component {...pageProps} />
          </Fragment>
        </ThemeProvider>
      </Fragment>
    );
  }
}

export default MyApp;
