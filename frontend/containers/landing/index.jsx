import { useWeb3React } from '@web3-react/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import TypeAnimation from 'react-type-animation';

const FaqCard = ({ question, answer }) => (
  <div className="flex-1 text-left p-8 border border-white h-full rounded-lg">
    <div className="text-xl font-semibold text-orange-100">{question}</div>
    <div className="text-base font-light my-3">{answer}</div>
  </div>
);

const Landing = () => {
  const router = useRouter();
  const { account } = useWeb3React();

  return (
    <main className="container py-4 flex flex-col md:flex-row">
      <main className="flex-grow">
        <section className="relative min-h-[500px]">
          <div
            className="relative w-full pointer-events-none block"
            aria-hidden="true"
          >
            <img
              src="/ball.png"
              alt="ball"
              className="absolute w-52 h-52 md:w-72 md:h-72 right-0 animate-bounce"
              style={{ bottom: '-550px' }}
            />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full min-h-[500px] sp-container h-full flex flex-col items-center justify-center">
            <h2 className="top-1/3 text-3xl md:text-6xl tracking-tight font-superbold bg-clip-text bg-gradient-to-r from-purple-100 via-pink-400 to-blue-600 text-transparent">
              NFT Collateralized Lending
            </h2>
            <TypeAnimation
              cursor={true}
              sequence={[
                'Fixed Interest Rate',
                4000,
                'Secured',
                4000,
                'Easy to use',
                4000,
                'Lend with Waffy',
                4000,
              ]}
              wrapper="h2"
              repeat={1}
              className="text-3xl md:text-5xl font-superbold top-1/2"
            />

            <p className="w-full md:w-7/12 text-center text-xl my-8">
              Seizing NFT bots. Login with Web3, create NFT-collateral loans,
              fixed maximum bid and fixed interest rate.
            </p>

            <div className="w-full md:w-1/3 mt-4 mx-auto flex justify-around">
              <button
                className="px-4 py-5 rounded-xl font-semibold bg-gradient-to-br from-orange-500 to-orange-200 text-white hover:from-orange-200 hover:to-orange-400 transition-all flex-1 mx-2 text-lg"
                onClick={() => {
                  if (account) router.push('/info');
                  else toast.error('Please connect your wallet');
                }}
              >
                Analytics
              </button>
              <button
                className="px-4 py-5 rounded-xl font-semibold  border border-orange-200 text-orange-200 hover:border-orange-400 hover:text-orange-400 transition-all flex-1 mx-2 text-lg"
                onClick={() => {
                  if (account) router.push('/home');
                  else toast.error('Please connect your wallet');
                }}
              >
                Explore
              </button>
            </div>
          </div>
        </section>

        <section className="relative my-16">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="py-12 md:py-20">
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text bg-gradient-to-br from-purple-100 to-pink-300 text-transparent">
                  How Waffy works
                </h2>
                <p className="text-base md:text-lg text-white mt-6">
                  Lend. Better Price Analysis. Fixed Interest Rate.
                </p>
              </div>

              <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-center md:max-w-2xl lg:max-w-none">
                <div className="relative flex flex-col items-center p-6 bg-gradient-to-br from-orange-400 to-orange-200 rounded-xl hover:scale-105 transition-all ease-in-out h-full">
                  <svg
                    className="w-16 h-16 p-1 -mt-1 mb-2"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <rect
                        className="fill-current text-white"
                        width="64"
                        height="64"
                        rx="32"
                      />
                      <g strokeWidth="2">
                        <path
                          className="stroke-current text-orange-200"
                          d="M34.514 35.429l2.057 2.285h8M20.571 26.286h5.715l2.057 2.285"
                        />
                        <path
                          className="stroke-current text-orange-500"
                          d="M20.571 37.714h5.715L36.57 26.286h8"
                        />
                        <path
                          className="stroke-current text-orange-200"
                          strokeLinecap="square"
                          d="M41.143 34.286l3.428 3.428-3.428 3.429"
                        />
                        <path
                          className="stroke-current text-orange-500"
                          strokeLinecap="square"
                          d="M41.143 29.714l3.428-3.428-3.428-3.429"
                        />
                      </g>
                    </g>
                  </svg>
                  <h4 className="text-xl font-semibold my-3 text-center leading-snug tracking-tight mb-1">
                    Lend
                  </h4>
                  <p className="text-center my-5">
                    Want to lend NFTs? Use NFT as collateral and lend them with
                    the Waffy Protocol
                  </p>
                </div>

                <div className="relative flex flex-col items-center p-6 bg-orange-300 rounded-xl shadow-xl hover:scale-105 transition-all ease-in-out h-full">
                  <svg
                    className="w-16 h-16 p-1 -mt-1 mb-2"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <rect
                        className="fill-current text-white"
                        width="64"
                        height="64"
                        rx="32"
                      />
                      <g strokeWidth="2" transform="translate(19.429 20.571)">
                        <circle
                          className="stroke-current text-orange-200"
                          strokeLinecap="square"
                          cx="12.571"
                          cy="12.571"
                          r="1.143"
                        />
                        <path
                          className="stroke-current text-orange-200"
                          d="M19.153 23.267c3.59-2.213 5.99-6.169 5.99-10.696C25.143 5.63 19.514 0 12.57 0 5.63 0 0 5.629 0 12.571c0 4.527 2.4 8.483 5.99 10.696"
                        />
                        <path
                          className="stroke-current text-orange-500"
                          d="M16.161 18.406a6.848 6.848 0 003.268-5.835 6.857 6.857 0 00-6.858-6.857 6.857 6.857 0 00-6.857 6.857 6.848 6.848 0 003.268 5.835"
                        />
                      </g>
                    </g>
                  </svg>
                  <h4 className="text-xl font-semibold my-3 text-center leading-snug tracking-tight mb-1">
                    Better Price Discovery
                  </h4>
                  <p className="text-center my-5">
                    Find your favorite NFTs and bid on them. Get fixed interest
                    rate and better price discovery.
                  </p>
                </div>

                <div className="relative flex flex-col items-center p-6 bg-gradient-to-tr from-orange-400 to-orange-200 rounded-xl shadow-xl hover:scale-105 transition-all ease-in-out h-full">
                  <svg
                    className="w-16 h-16 p-1 -mt-1 mb-2"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <rect
                        className="fill-current text-white"
                        width="64"
                        height="64"
                        rx="32"
                      />
                      <g strokeLinecap="square" strokeWidth="2">
                        <path
                          className="stroke-current text-orange-500"
                          d="M38.826 22.504a9.128 9.128 0 00-13.291-.398M35.403 25.546a4.543 4.543 0 00-6.635-.207"
                        />
                        <path
                          className="stroke-current text-orange-200"
                          d="M19.429 25.143A6.857 6.857 0 0126.286 32v1.189L28 37.143l-1.714.571V40A2.286 2.286 0 0124 42.286h-2.286v2.285M44.571 25.143A6.857 6.857 0 0037.714 32v1.189L36 37.143l1.714.571V40A2.286 2.286 0 0040 42.286h2.286v2.285"
                        />
                      </g>
                    </g>
                  </svg>
                  <h4 className="text-xl font-semibold my-3 text-center leading-snug tracking-tight mb-1">
                    Fixed Interest Rate
                  </h4>
                  <p className="text-center my-5">
                    Lend for limited time. Receive Bids and pay a fixed interest
                    rate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="py-12 md:py-20">
              <div className="max-w-5xl mx-auto text-center pb-12 md:pb-20">
                <h2 className="text-3xl md:text-5xl font-bold mb-14 bg-clip-text bg-gradient-to-br from-purple-100 to-pink-300 text-transparent">
                  Frequently Asked Questions
                </h2>
                <div className="mx-auto grid gap-16 md:grid-cols-2 items-start md:max-w-2xl lg:max-w-none">
                  <FaqCard
                    question="What is Waffy?"
                    answer="The Waffy Protocol is a decentralized non-custodial lending protocol where users can participate as lenders or bidders. Lenders can lend out their ERC721 NFTs at a fixed interest rate, while bidders can outbid the highest bidders. The protocol is designed to be a low-risk, low-fee, and secured protocol."
                  />

                  <FaqCard
                    question="What are NFT Seizing bots?"
                    answer="In the event of a default on a loan, anyone may either seize the NFT and repay the bidder or seize the NFT for the highest bidder and get rewarded. As a result, loans are always repaid in full since third parties are encouraged to contribute to the general protocol's health by acting in their own interests (to obtain rewards or NFT)"
                  />

                  <FaqCard
                    question="How does loan repayment work?"
                    answer="Lenders repay the interest and principal amount to the highest bidder only after the loan is expired. They are given a grace period of 1 hour; after that, any NFT seizing bot can either seize the NFT or repay the loan on lender's behalf."
                  />

                  <FaqCard
                    question="How do I lend out NFTs?"
                    answer="Anyone can lend out their ERC721 NFTs at a fixed interest rate for a specified time. During the loan period, anyone can bid on the NFTs, and the lender can draw any amount from the highest bid. To outbid the highest bidder, the user must repay the last amount drawn from the bid along with interest to the previous highest bidder."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mb-16">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="py-12 md:py-20">
              <div className="max-w-5xl mx-auto text-center pb-12 md:pb-20">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text bg-gradient-to-br from-purple-100 to-pink-300 text-transparent pb-5">
                  Want to integrate Waffy in your DApp?
                </h2>
                <div className="mx-auto">
                  <h4 className="w-full text-2xl mt-4 text-center">
                    Try verifiable frontend with{' '}
                    <Link href="https://hyperdapp.dev/">
                      <a target="_blank">HyperDApp</a>
                    </Link>
                  </h4>

                  {/* <div className="overflow-hidden flex justify-between bg-black/30 px-5 py-3 rounded-xl mt-8 w-full md:w-4/5 mx-auto">
                    <p>Create Loan:</p>
                    <Link href="https://code.hyperdapp.dev/flow/QmPP1fLbLdqfu97BzYSDsm8fJVSHCVmeCsjP8bggeqNUML">
                      <a target="_blank">
                        <span className="text-gray-300">
                          https://code.hyperdapp.dev/flow/QmPP1fLb...
                        </span>
                      </a>
                    </Link>
                  </div> */}

                  <div className="overflow-hidden flex justify-between bg-black/30 px-5 py-3 rounded-xl mt-8 w-full md:w-4/5 mx-auto">
                    <p>Seize Loan:</p>
                    <Link href="https://code.hyperdapp.dev/flow/QmbyWqs8P9TSJ1sMPd7gCusuXc7i38qjHswcF1UcEzsQY5">
                      <a target="_blank">
                        <span className="text-gray-300">
                          https://code.hyperdapp.dev/flow/QmbyW...
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mb-16">
          <div className="relative mx-auto px-4 sm:px-6 w-full">
            <div className="py-12 md:py-20 custom-bg w-full rounded-2xl">
              <h1 className="text-white text-center text-xl md:text-3xl">
                Want to learn more about Waffy?
              </h1>

              <div className="w-full mt-5 flex justify-center">
                <a
                  href="mailto:rbbansal558@gmail.com?subject=Reaching out about waffy&body=Hello there! I'm curious to find out more about Waffy."
                  className="bg-gradient-to-br from-purple-300 via-pink-400 to-blue-600 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-xl text-xl hover:from-blue-600 hover:via-pink-400 hover:to-purple-300 transition-all"
                >
                  Reach out
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </main>
  );
};

export default Landing;
