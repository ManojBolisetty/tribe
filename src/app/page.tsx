"use client";
import { Button, Form, Input, Modal, FormInstance, message } from "antd";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Home = () => {
  const rooms = [
    {
      name: "Royalé",
      description: "Price : ₹2199",
      image: "images/airbnb/room-8.jpg",
    },
    {
      name: "Corporate",
      description: "Price : ₹1899",
      image: "images/airbnb/room-9.jpg",
    },
    {
      name: "Executive",
      description: "Price : ₹1599",
      image: "images/airbnb/room-7.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const contactRef = useRef<FormInstance>(null);
  const images = [
    "images/airbnb/room-8.jpg",
    "images/airbnb/room-9.jpg",
    "images/airbnb/room-7.jpg",
  ];

  const handleNextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsTransitioning(false);
    }, 500); // Match the transition duration
  };

  const handlePrevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 500); // Match the transition duration
  };

  useEffect(() => {
    // Auto-slide every 5 seconds
    const interval = setInterval(handleNextSlide, 5000);
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const onFinish = async (values: { mobile: number; email: number }) => {
    await axios.post("https://tribeback.onrender.com/api/email/send_email", {
      mobile: values.mobile,
      email: values.email,
    });
    messageApi.open({
      type: "success",
      content: "Thank you for booking!",
    });
    contactRef.current?.resetFields();
    setShowModal(false);
  };

  return (
    <div>
      {contextHolder}

      {/* Navigation Bar */}
      <nav
        className={`fixed w-full z-10 top-0 left-0 transition-all duration-300 p-8 md:py-5 ${
          isScrolled
            ? "bg-white text-black shadow-lg"
            : "bg-transparent text-white"
        }`}
      >
        <div className="max-w-screen-xl mx-auto flex justify-center  items-center relative">
          <p className="text-2xl font-bold justify-self-start absolute left-0">
            tribeŌne
          </p>
          <div className="hidden md:flex space-x-4 justify-center ">
            <a
              href="#home"
              className="hover:underline font-semibold px-5 underline-offset-8"
            >
              Home
            </a>
            <a
              href="#rooms"
              className="hover:underline font-semibold px-5 underline-offset-8"
            >
              Rooms
            </a>
            <a
              href="#contact"
              className="hover:underline font-semibold px-5 underline-offset-8"
            >
              Contact
            </a>
          </div>
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white absolute right-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white text-black m-5 p-5 space-y-4">
            <a href="#home" className="block hover:text-gray-400">
              Home
            </a>
            <a href="#rooms" className="block hover:text-gray-400">
              Rooms
            </a>
            <a href="#contact" className="block hover:text-gray-400">
              Contact
            </a>
          </div>
        )}
      </nav>

      {/* Full-Screen Carousel */}
      <div className="relative h-screen overflow-hidden" id="home">
        <div
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full bg-block opacity-50"></div>
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            Welcome to TribeOne
          </h1>
          <p className="mt-4 text-lg sm:text-xl">
            Experience the finest hospitality and elegance
          </p>
        </div>
        {/* Carousel Controls */}
        <button
          onClick={handlePrevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 font-semibold  p-3 rounded-full text-white"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 font-semibold  p-3 rounded-full text-white"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {/* Rooms Section */}
      <section id="rooms" className="py-16 bg-gray-100">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-black">
            Our Rooms
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden relative"
              >
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-64 object-cover"
                />
                <div className=" m-3 pb-6">
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {room.name}
                  </h3>
                  <p className="mt-2 text-gray-600 ">{room.description}</p>
                  <div className="w-full text-center mt-2">
                    <Button
                      color="default"
                      variant="solid"
                      className=" p-2"
                      onClick={() => setShowModal(true)}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="amenities" className="py-16 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-black">
            Our Amenities
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Enjoy world-class services and exceptional amenities during your
            stay.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Amenity 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <div className="text-4xl text-blue-500 mb-4">
                <i className="fas fa-swimming-pool"></i>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Infinity Pool
              </h3>
              <p className="text-gray-600">
                Relax and rejuvenate in our luxurious infinity pool with a
                breathtaking view.
              </p>
            </div>
            {/* Amenity 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <div className="text-4xl text-yellow-500 mb-4">
                <i className="fas fa-utensils"></i>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Fine Dining
              </h3>
              <p className="text-gray-600">
                Savor gourmet meals prepared by world-renowned chefs in our fine
                dining restaurant.
              </p>
            </div>
            {/* Amenity 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <div className="text-4xl text-green-500 mb-4">
                <i className="fas fa-spa"></i>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Luxury Spa
              </h3>
              <p className="text-gray-600">
                Unwind with a wide range of rejuvenating treatments in our
                luxury spa.
              </p>
            </div>
            {/* Amenity 4 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <div className="text-4xl text-purple-500 mb-4">
                <i className="fas fa-dumbbell"></i>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Fitness Center
              </h3>
              <p className="text-gray-600">
                Stay fit with state-of-the-art equipment in our fully equipped
                fitness center.
              </p>
            </div>
            {/* Amenity 5 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <div className="text-4xl text-red-500 mb-4">
                <i className="fas fa-concierge-bell"></i>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                24/7 Concierge
              </h3>
              <p className="text-gray-600">
                Our dedicated concierge team is available round-the-clock to
                assist you.
              </p>
            </div>
            {/* Amenity 6 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <div className="text-4xl text-indigo-500 mb-4">
                <i className="fas fa-wifi"></i>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Free Wi-Fi
              </h3>
              <p className="text-gray-600">
                Enjoy complimentary high-speed internet throughout the hotel
                premises.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8" id="contact">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About TribeOne</h3>
              <p className="text-gray-400">
                Experience the finest hospitality and luxury with our
                world-class amenities. Your comfort and satisfaction are our
                priority.
              </p>
            </div>

            {/* Links Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="hover:underline text-gray-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#rooms" className="hover:underline text-gray-400">
                    Rooms
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:underline text-gray-400">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:underline text-gray-400">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">
                srinivas nilayam, Izzathnagar, HITEC City, Hyderabad, Telangana
                500084
              </p>
              <p className="text-gray-400 mt-2">Phone: 9009999471</p>
              <p className="text-gray-400 mt-2">
                Email: tribeone.info@gmail.com
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-700 pt-4 text-center">
            <p className="text-gray-500">
              © {new Date().getFullYear()} TribeOne. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <Modal
        title={null}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button
            key="submit"
            color="default"
            variant="solid"
            onClick={() => {
              contactRef.current?.submit();
            }}
          >
            {"Submit"}
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="mt-5"
          ref={contactRef}
          onFinish={onFinish}
        >
          <Form.Item
            label={<span className="font-bold">{"Mobile Number"}</span>}
            name="mobile"
            rules={[
              {
                required: true,
                message: "Please enter your phone number!",
              },
              {
                pattern: /^[0-9]{10}$/, // Adjust regex to your phone format
                message: "Phone number must be 10 digits!",
              },
            ]}
          >
            <Input placeholder="Enter your mobile" />
          </Form.Item>
          <Form.Item
            label={<span className="font-bold">{"Emil Id"}</span>}
            name={"email"}
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
              {
                type: "email",
                message: "The input is not a valid email!",
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Home;
