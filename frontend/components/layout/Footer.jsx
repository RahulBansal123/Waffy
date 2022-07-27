import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

function Footer() {
  const router = useRouter();
  const [mail, setMail] = useState('');
  return (
    <footer className="container mt-10">
      <div className="w-full px-4 sm:px-6">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 py-8 md:py-12 border-t border-gray-200">
          <div className="flex col-span-2 md:col-span-1 items-center justify-center md:justify-start mb-5 md:mb-0">
            <div>
              <Link href="/" className="inline-block" aria-label="Dority">
                <img
                  src="/logo-full.png"
                  alt="Waffy"
                  className="w-auto h-16 cursor-pointer"
                />
              </Link>
            </div>
          </div>

          <div className="text-center">
            <h6 className="text-gray-400 font-medium mb-2">Subscribe</h6>
            <p className="text-gray-400 mb-4">Stay in touch with Waffy</p>
            <form className="flex justify-center">
              <div className="flex flex-wrap mb-4">
                <div className="">
                  <label className="block text-sm sr-only" htmlFor="newsletter">
                    Email
                  </label>
                  <div className="relative flex items-center max-w-xs">
                    <input
                      id="newsletter"
                      type="email"
                      className="form-input w-full text-gray-800 px-3 py-2 pr-12 text-sm border outline-none rounded-xl"
                      placeholder="Your email"
                      required
                      value={mail}
                      onChange={(e) => setMail(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="absolute inset-0 left-auto"
                      aria-label="Subscribe"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(
                          `mailto:rbbansal558@gmail.com?subject=Reaching out about waffy&body=Hello there! I'm curious to find out more about Waffy. Contact me at: ${mail}`
                        );
                      }}
                    >
                      <span
                        className="absolute inset-0 right-auto w-px -ml-px my-2 bg-gray-300"
                        aria-hidden="true"
                      ></span>
                      <svg
                        className="w-3 h-3 fill-current text-blue-600 mx-3 flex-shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="text-right flex justify-center flex-col">
            <h6 className="text-gray-400 font-medium mb-2">Contact:</h6>
            <Link href="mailto:rbbansal558@gmail.com">
              <a
                target="_blank"
                className="text-base mb-4 text-orange-200 hover:underline"
              >
                @rbbansal558
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
