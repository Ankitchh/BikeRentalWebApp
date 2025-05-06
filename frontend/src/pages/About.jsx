import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Heart, Globe, Award, Zap } from 'lucide-react';
import InfiniteReviews from '../components/InfiniteReviews';

// Team member data
const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Sarah founded EcoRide with a vision to transform urban mobility through sustainable transportation options.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Operations Manager',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Michael oversees our day-to-day operations, ensuring every customer receives exceptional service.'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Bike Maintenance Lead',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Emma ensures all our bikes are maintained to the highest standards of safety and performance.'
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Customer Experience',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'David leads our customer service team, dedicated to making your rental experience seamless and enjoyable.'
  },
];

const About = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              About BikeRental
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8"
            >
              We're on a mission to transform urban mobility through bike rentals.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <img 
                src="../src/assets/images/bike9.jpg" 
                alt="Our Story" 
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </motion.div>
            
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  BikeRental was founded in 2018 with a simple yet powerful vision: to make cities more livable by providing accessible, eco-friendly transportation options.
                </p>
                <p>
                  What started as a small fleet of 20 bikes has grown into a city-wide network of premium rental stations, serving thousands of riders each month.
                </p>
                <p>
                  Our founder's, B.C.A 2nd year Boys, began BikeRental after experiencing firsthand the freedom and joy of exploring cities by bike during her travels across Europe. She returned home determined to bring that same experience to her own city.
                </p>
                <p>
                  Today, BikeRental stands at the forefront of urban mobility solutions, continually expanding our fleet and locations while maintaining our commitment to quality, sustainability, and exceptional customer experiences.
                </p>
                <p>
                  Join us as we continue to innovate and enhance the biking experience for everyone.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-primary-50 p-4 rounded-lg text-center">
                  <span className="block text-3xl font-bold text-primary-600">5000+</span>
                  <span className="text-neutral-600">Happy Customers</span>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg text-center">
                  <span className="block text-3xl font-bold text-primary-600">300+</span>
                  <span className="text-neutral-600">Premium Bikes</span>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg text-center">
                  <span className="block text-3xl font-bold text-primary-600">12</span>
                  <span className="text-neutral-600">City Locations</span>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg text-center">
                  <span className="block text-3xl font-bold text-primary-600">24/7</span>
                  <span className="text-neutral-600">Customer Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              These core principles guide everything we do at EcoRide, from our business decisions to how we interact with our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard 
              icon={<Shield className="w-8 h-8 text-primary-600" />}
              title="Safety First"
              description="We prioritize the safety of our riders through well-maintained equipment, comprehensive safety briefings, and quality gear."
            />
            
            <ValueCard 
              icon={<Heart className="w-8 h-8 text-primary-600" />}
              title="Customer Care"
              description="We're committed to creating exceptional experiences for every customer through personalized service and attention to detail."
            />
            
            <ValueCard 
              icon={<Globe className="w-8 h-8 text-primary-600" />}
              title="Environmental Responsibility"
              description="We actively contribute to a cleaner environment by promoting cycling as a zero-emission alternative to car travel."
            />
            
            <ValueCard 
              icon={<Users className="w-8 h-8 text-primary-600" />}
              title="Community Engagement"
              description="We believe in giving back to the communities we serve through local partnerships and initiatives."
            />
            
            <ValueCard 
              icon={<Award className="w-8 h-8 text-primary-600" />}
              title="Quality Without Compromise"
              description="We offer only the highest quality bikes and equipment, ensuring a premium experience for every rider."
            />
            
            <ValueCard 
              icon={<Zap className="w-8 h-8 text-primary-600" />}
              title="Innovation"
              description="We continuously look for ways to improve our service through technology and creative solutions."
            />
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              The passionate individuals behind EcoRide who work tirelessly to provide you with the best biking experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover" 
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-neutral-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-neutral-50">
        <InfiniteReviews />
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the EcoRide Movement</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Experience the joy of exploration on two wheels while contributing to a greener planet.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn bg-white text-primary-600 hover:bg-neutral-100 text-lg px-8 py-4"
          >
            Book Your First Ride
          </motion.button>
        </div>
      </section>
    </div>
  );
};

// Value Card Component
const ValueCard = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-neutral-600">{description}</p>
    </motion.div>
  );
};

export default About;