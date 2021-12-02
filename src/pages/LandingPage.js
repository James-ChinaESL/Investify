import React from "react";
import styled from "styled-components";
import Title from "../components/Title";
import { useAuth0 } from "@auth0/auth0-react";
import { GiMoneyStack } from "react-icons/gi";
import { GiLaurelsTrophy } from "react-icons/gi";
import { MdScreenSearchDesktop } from "react-icons/md";
import { device } from "../utils/breakpoints";

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Wrapper>
      <header>
        <div className='landing-header'>
          <div className='header-content'>
            <div className='title-container'>
              <Title />
            </div>
            <h1 className='heading-primary'>Stock Market Simulator</h1>
            <h2 className='heading-secondary'>
              Investify is a fully free online investing competition. <br /> Get
              your virtual 10,000.00$ and try to bit other players.
            </h2>
            <div className='signup-login'>
              <button className='call-to-action' onClick={loginWithRedirect}>
                <span>Start Investing</span>
              </button>
              <div className='existing-user'>
                <span>Already have an account?</span>
                <button className='btn login' onClick={loginWithRedirect}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
        <section className='features'>
          <div className='laptop-container'>
            <img src='laptop.png' alt='' />
          </div>
          <div className='features-container'>
            <div className='icon icon--safe'>
              <GiMoneyStack className='icon' />
            </div>
            <div className='icon icon--research'>
              <MdScreenSearchDesktop className='icon' />
            </div>
            <div className='icon icon--compete'>
              <GiLaurelsTrophy className='icon' />
            </div>
            <h2 className='title title--safe'>Trade with virtual money</h2>
            <h2 className='title title--research'>Research the market</h2>
            <h2 className='title title--compete'>Compete with others</h2>

            <p className='description description--safe'>
              Practice trading with virtual money to sharpen your knowledge.
              Investify will help you gain confidence before risking your own
              money
            </p>

            <p className='description description--research'>
              With Investify you can get daily updated lists of companies
              interesting for investment their financial data and price targets
            </p>

            <p className='description description--compete'>
              Practice trading and investing and join a game with hundreds of
              other like-minded educated investors and compete for the top rank
            </p>
            <button className='call-to-action' onClick={loginWithRedirect}>
              <span>Get $10,000.00 and start trading</span>
            </button>
          </div>
        </section>
      </header>
    </Wrapper>
  );
};

export default LandingPage;
const Wrapper = styled.div`
  .landing-header {
    background-image: linear-gradient(90deg, #323a56, 70%, rgba(50, 58, 86, 0)),
      url("hero.png");
    background-size: cover;
    overflow: hidden;
    @media ${device.tablet} {
      background-size: cover;
      background-position: center;
      background-image: linear-gradient(
          90deg,
          #323a56,
          70%,
          rgba(50, 58, 86, 0.55)
        ),
        url("hero.png");
    }
    .header-content {
      width: max(630px, 85vw);
      margin: 3rem auto;
      margin-bottom: 3rem;
      @media ${device.tablet} {
        margin: 3rem;
        width: calc(100% - 6rem);
        br {
          display: none;
        }
      }
      @media (max-width: 640px) {
        .title-container {
          margin-left: auto;
          margin-right: auto;
          width: 230px;
        }
        h1.heading-primary {
          font-size: 3rem;
          text-align: center;
        }
        h2.heading-secondary {
          font-size: 2.2rem;
          line-height: 2.5rem;
          text-align: center;
        }

        .signup-login {
          position: static;
          .call-to-action {
            display: block;
          }
          .call-to-action {
            margin: 3rem auto;
          }
          div.existing-user {
            position: static;

            margin: 2rem auto;
            width: 360px;
            @media ${device.mobileM} {
              width: 100%;
              text-align: center;
              .btn.login {
                text-align: center;
                margin: 2rem auto;
                display: inline;
              }
            }
          }
        }
      }
      .title-container {
        margin-bottom: 2.5rem;
      }
      .heading-primary {
        text-align: left;
        font-size: 4rem;
        font-weight: bolder;
        letter-spacing: 3px;
        margin-bottom: 2.5rem;
      }
      .heading-secondary {
        font-size: 3rem;
        line-height: 3.5rem;
        margin-bottom: 2.5rem;
      }
      .signup-login {
        position: relative;
        margin-bottom: 4rem;

        .existing-user {
          position: absolute;
          right: 0;
          bottom: 0;

          span {
            font-size: 2rem;
            letter-spacing: 1px;
          }

          .login {
            box-sizing: unset;
            padding: 0.75rem 2rem;
            background-color: var(--clr-tertiary);
            color: #000;
            border: none;
            box-sizing: content-box;
            border: 1px solid transparent;

            /* color: red; */
            text-shadow: none;
            font-weight: bold;
            box-sizing: content-box;
            margin: 0 3rem 0 2rem;
            text-transform: uppercase;
            font-size: 1.6rem;
            transition: var(--transition);
            &:hover {
              /* font-size: 1.7rem; */

              text-shadow: var(--text-shadow-small);
              border: 1px solid var(--clr-tertiary);
            }
          }
        }
      }
    }
  }

  .features {
    background: linear-gradient(180deg, #353c57 15%, #8c95b8 100%);
    padding-bottom: 1rem;
    @media ${device.mobileL} {
      margin: 0;
      padding-bottom: 0;
    }
    .laptop-container {
      margin: 0rem auto;
      padding: 0 3rem;
      max-width: 110rem;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
    .features-container {
      position: relative;
      padding: 2rem 4rem 2rem;
      background-color: var(--clr-primary);
      border-radius: 15px;
      margin: 2rem auto 4rem;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, min-content);
      grid-column-gap: 3rem;
      width: min(90vw, 110rem);

      @media ${device.tabletL} {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(3, min-content);
        /* grid-row-gap: 3rem; */
        width: max(70vw, 600px);

        max-width: 85vw;
        justify-content: center;
        p.description {
          max-width: 400px;
          justify-self: center;
        }
        .title--safe {
          grid-row: 2/3;
          /* background-color: red; */
        }
        .description--safe {
          grid-row: 3/4;
        }
        .icon--research {
          margin-top: 3rem;
          grid-row: 5/6;
        }
        .title--research {
          grid-row: 7/8;
        }
        .description--research {
          grid-row: 9/10;
        }
        .icon--compete {
          margin-top: 3rem;

          grid-row: 11/12;
        }
        .title--compete {
          grid-row: 13/14;
        }
        .description--compete {
          grid-row: 15/16;
        }
        .call-to-action {
          grid-column: 1/2;
          grid-row: 17/18;
        }
      }
      @media ${device.mobileL} {
        margin-left: 0;
        margin-right: 0;
        max-width: none;
        width: 100vw;
        border-radius: 0;
        margin-bottom: 0;
        padding-bottom: 4rem;
      }

      .call-to-action {
        grid-column: 1/4;
        max-width: 40rem;
        margin: 3rem auto 0;
        @media ${device.tabletL} {
          grid-column: 1/2;
        }
      }
      .icon,
      .title {
        text-align: center;
        letter-spacing: 1px;
        min-height: 4rem;
        /* color: #afa; */
      }
      .title {
        margin: 1rem 0 2rem 0rem;
        font-size: 2.7rem;
      }
      .description {
        font-size: 2rem;
        text-align: center;
        line-height: 2.3rem;
        letter-spacing: 1px;
      }
      .icon {
        font-size: 10rem;
        color: #afa;
      }
    }
  }
  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
  .call-to-action {
    animation: bounce 2s ease-in-out infinite;
    display: inline-block;
    border: none;
    position: relative;
    top: 2px;
    margin: 3.5rem 3rem 0 1rem;

    padding: 0.75rem 1.5rem;
    font-size: 1.9rem;
    background-color: #afa;
    color: #353c57;
    border: 1px solid transparent;

    border-radius: 5px;
    cursor: pointer;
    font-family: var(--ff-primary);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    background-size: 250% 100%;
    transition: all 0.2s ease-in-out;
    background-image: linear-gradient(
      to right,
      #72e672,
      #afa,
      #8eef54,
      #72e672,
      #8eef54,
      #afa
    );

    box-shadow: 0 4px 15px 0 #ced7df40;
    span {
      text-shadow: -2px 0px 2px rgba(255, 255, 255, 0.4);
    }

    &:hover {
      background-position: 100% 0;
      transition: all 0.4s ease-in-out;
      /* border: 3px solid #353c57; */
      outline: 2px solid var(--clr-tertiary);
    }
  }
`;
