import React from "react";
import "./Footer.css";
import { motion } from "framer-motion";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

const Footer = () => {
  const emailAddress = "vinootherbal2024@gmail.com";
  const handleClick = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <footer
      className="bg-white dark:bg-gray-900  border-t border-gray-100"
      id="footerlanding">
      <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-3  ">
        <motion.div
          initial={{ x: -100 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.8 }}>
          <div className="text-teal-600 dark:text-teal-300">
            <img
              src="https://vinootherbal.com/wp-content/uploads/2024/02/grrb-1.png"
              className="logoimg"
              alt=""
              style={{ width: "50%" }}
            />
          </div>

          <p className="mt-0 max-w-xs text-gray-500 dark:text-gray-400">
            Life (Aayu) is combination of body, senses, mind, and reincarnating
            soul. Ayurveda is the most sacred science of life beneficial to
            human beings in this world and world beyond.
          </p>

          {/* <div className="mt-8 flex gap-6">
              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-700"
                >
                  <span className="sr-only">Facebook</span>

                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-700"
                >
                  <span className="sr-only">Instagram</span>

                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-700"
                >
                  <span className="sr-only">Twitter</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    version="1.1"
                    id="IconChangeColor"
                    height="24"
                    width="24"
                    transform="scale(1,1)"
                  >
                    {" "}
                    <path
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                      id="mainIconPathAttribute"
                    ></path>{" "}
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-700"
                >
                  <span className="sr-only">GitHub</span>

                  <svg
                    className="h-6 w-6 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />{" "}
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-700"
                >
                  <span className="sr-only">Dribbble</span>

                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </div> */}
        </motion.div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
          <motion.div
            initial={{ x: -100 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.8 }}>
            <p className="font-medium text-gray-900 dark:text-white">About</p>

            <div className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-700">
                  About Brand
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-700">
                  Our Benefits
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-700">
                  Testimonial
                </a>
              </li>

              <li>
                <a
                  href="/FAQ"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-700">
                  FAQ's
                </a>
              </li>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: -100 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.8 }}>
            <p className="font-medium text-gray-900 dark:text-white">
              What we offer
            </p>

            <div className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-700">
                  Skin Care
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-700">
                  Hair Care
                </a>
              </li>

              {/* <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-700"
                >
                  General Health
                </a>
              </li> */}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.8 }}>
            <p className="font-medium text-gray-900 dark:text-white">
              Helpful Links
            </p>

            <div className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-700">
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-700">
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-700">
                  Our Products
                </a>
              </li>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -100 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.8 }}>
            <p className="font-medium text-gray-900 dark:text-white">
              Contact Us
            </p>

            <div className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-700">
                  <span>⌖</span> #54, 11th A Main, virupakshapura, kodigehalli,
                  Bangalore 560097
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-700  d-flex">
                  <FaPhoneAlt size={15} style={{ marginTop: "3px" }} /> &nbsp;{" "}
                  <span>+918904980190</span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  onClick={handleClick}
                  className="text-gray-700 transition hover:opacity-75 dark:text-gray-700  d-flex">
                  <span>vinootherbal2024@gmail.com</span>
                </a>
              </li>
            </div>
          </motion.div>
        </div>
      </div>

      <div>
        <ul className="flex justify-center gap-6 sm:justify-end">
          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-teal-700 transition hover:text-teal-700/75">
              <span className="sr-only">Facebook</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>

          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-teal-700 transition hover:text-teal-700/75">
              <span className="sr-only">Instagram</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>

          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-teal-700 transition hover:text-teal-700/75">
              <span className="sr-only">Twitter</span>
              {/* <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22.458 4.752c-.81.36-1.68.602-2.592.71a4.526 4.526 0 0 0 1.984-2.496c-.87.516-1.832.892-2.856 1.096a4.513 4.513 0 0 0-7.69 4.116c-3.758-.19-7.09-1.992-9.334-4.726a4.485 4.485 0 0 0-.612 2.27c0 1.564.804 2.948 2.026 3.754a4.495 4.495 0 0 1-2.044-.564v.057c0 2.19 1.558 4.008 3.622 4.42a4.534 4.534 0 0 1-2.034.077c.573 1.772 2.237 3.057 4.216 3.095a9.064 9.064 0 0 1-5.602 1.93c-.365 0-.724-.022-1.08-.067a12.79 12.79 0 0 0 6.902 2.022c8.292 0 12.825-6.876 12.825-12.825 0-.195-.005-.39-.014-.583a9.172 9.172 0 0 0 2.252-2.336"
                  clipRule="evenodd"
                />
              </svg> */}
              <FaXTwitter style={{ fontSize: "1.5rem" }} />
            </a>
          </li>

          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-teal-700 transition hover:text-teal-700/75">
              <span className="sr-only">YouTube</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M23.88 7.548s-.2-1.69-1.008-2.392c-.902-.902-1.802-.902-2.251-.957C18.617 4.1 12 4.1 12 4.1s-6.617 0-8.622.1c-.45.055-1.35.055-2.252.957C.319 5.858.12 7.548.12 7.548S0 9.238 0 10.928v2.15c0 1.69.12 3.38.12 3.38s.2 1.69 1.008 2.392c.902.902 1.802.902 2.252.957 1.855.2 8.472.2 8.472.2s6.617 0 8.622-.1c.45-.055 1.35-.055 2.252-.957.808-.702 1.008-2.392 1.008-2.392s.12-1.69.12-3.38v-2.15c0-1.69-.12-3.38-.12-3.38zM9.5 15.01V8.968l5.641 3.022-5.641 3.02z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-2 border-t border-gray-100">
        <p className="mt-2 text-center text-xs/relaxed text-gray-500">
          © Company 2024. All rights reserved.
          <br />
          Developed By
          {/* <a href="#" className="text-gray-700 underline transition hover:text-gray-700/75">Vikas</a>@ */}
          <a
            href="#"
            className="text-gray-700 underline transition hover:text-gray-700/75">
            {" "}
            Matrical Technologies PVT LTD{" "}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
