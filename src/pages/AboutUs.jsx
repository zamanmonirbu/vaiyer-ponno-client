import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';   // Main "About Us" icon
import { FaBullseye, FaLightbulb, FaHandsHelping, FaCheckCircle } from 'react-icons/fa';  // Icons for each section

const AboutUs = () => {
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            {/* Title Section */}
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-blue-600 flex items-center justify-center">
                    <AiOutlineInfoCircle className="mr-2 text-4xl" /> About Us
                </h2>
            </div>

            {/* Our Mission Section */}
            <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                    <FaBullseye className="mr-2 text-blue-500" /> Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed">
                    Our mission is to bridge the gap between consumers and local businesses by providing a 
                    platform that promotes easy access to products and services. We strive to create a 
                    convenient shopping experience while empowering small businesses to reach a wider audience.
                </p>
            </section>

            {/* Our Vision Section */}
            <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                    <FaLightbulb className="mr-2 text-yellow-500" /> Our Vision
                </h3>
                <p className="text-gray-600 leading-relaxed">
                    We envision a marketplace where local vendors and consumers are connected directly, 
                    fostering a community-driven economy that benefits everyone. Our goal is to become a 
                    trusted hub for quality products and transparent customer relationships.
                </p>
            </section>

            {/* Our Values Section */}
            <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                    <FaHandsHelping className="mr-2 text-green-500" /> Our Values
                </h3>
                <p className="text-gray-600 leading-relaxed">
                    We value transparency, quality, and innovation. We are committed to maintaining high 
                    standards in all our services, ensuring that customers and vendors alike can trust 
                    and rely on our platform.
                </p>
            </section>

            {/* Why Choose Us Section */}
            <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                    <FaCheckCircle className="mr-2 text-purple-500" /> Why Choose Us
                </h3>
                <p className="text-gray-600 leading-relaxed">
                    Choosing us means choosing quality, reliability, and convenience. Our platform is designed 
                    to enhance the customer shopping experience and simplify vendor operations with robust 
                    tools for product management, user engagement, and analytics.
                </p>
            </section>
        </div>
    );
};

export default AboutUs;
