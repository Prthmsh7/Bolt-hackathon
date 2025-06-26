import React from 'react';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  TrendingUp, 
  Code, 
  DollarSign, 
  Star, 
  CheckCircle, 
  Play,
  Github,
  Globe,
  Database,
  Lightbulb,
  Award,
  Target,
  Rocket,
  Heart,
  Eye,
  MessageCircle,
  Sparkles,
  Crown,
  Building,
  Briefcase,
  PieChart,
  BarChart3,
  Activity
} from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-Founder',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      bio: 'Former AI researcher with a passion for democratizing innovation and protecting intellectual property.'
    },
    {
      name: 'James Park',
      role: 'CTO & Co-Founder',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      bio: 'Blockchain expert and full-stack developer with 10+ years of experience building scalable platforms.'
    },
    {
      name: 'Emma Davis',
      role: 'Head of Product',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      bio: 'Product visionary focused on creating intuitive user experiences that solve real developer problems.'
    },
    {
      name: 'Michael Chen',
      role: 'Lead Engineer',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      bio: 'Full-stack developer specializing in React, TypeScript, and blockchain integration.'
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Seedora Founded',
      description: 'Started with a vision to protect developer IP and connect innovators with investors.'
    },
    {
      year: '2023',
      title: 'Seed Funding',
      description: '$1.5M raised to build the initial platform and blockchain integration.'
    },
    {
      year: '2024',
      title: 'Beta Launch',
      description: 'First 500 developers joined the platform and registered their projects.'
    },
    {
      year: '2024',
      title: 'Investment Marketplace',
      description: 'Launched the marketplace connecting projects with potential investors.'
    },
    {
      year: '2025',
      title: 'MCP Integration',
      description: 'Added AI-powered analytics and insights through Machine Callable Programs.'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Protection',
      description: 'We believe every developer deserves to have their intellectual property protected.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We foster innovation by connecting great ideas with the resources they need to grow.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We build a supportive community where developers and investors can thrive together.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'We make powerful tools accessible to developers worldwide, regardless of background.'
    }
  ];

  return (
    <div className="min-h-screen bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 mb-8 text-text-muted hover:text-text-primary transition-colors duration-300"
        >
          <ArrowRight size={20} className="rotate-180" />
          <span>Back to Dashboard</span>
        </button>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-black mb-6">
              About <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Seedora</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              We're on a mission to democratize innovation by protecting intellectual property and connecting developers with investors.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="flex items-center space-x-2 px-6 py-3 bg-white rounded-xl text-text-primary font-medium hover:bg-light-hover transition-all duration-300 shadow-sm">
                <Building size={18} />
                <span>Our Story</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 bg-white rounded-xl text-text-primary font-medium hover:bg-light-hover transition-all duration-300 shadow-sm">
                <Users size={18} />
                <span>Meet the Team</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 bg-white rounded-xl text-text-primary font-medium hover:bg-light-hover transition-all duration-300 shadow-sm">
                <Target size={18} />
                <span>Our Mission</span>
              </button>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">Our Story</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              How Seedora went from an idea to a platform empowering developers worldwide
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">From Problem to Solution</h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  Seedora was born from a simple observation: developers often struggle to protect their intellectual property and connect with the right investors to bring their ideas to life.
                </p>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  Our founders, Sarah and James, experienced this firsthand when they developed an innovative AI platform but had no clear path to protect their work or find investment.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  They created Seedora to solve these problems, building a platform that leverages blockchain technology for IP protection and AI-powered analytics to match projects with the right investors.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2" 
                  alt="Seedora founding team"
                  className="rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 shadow-lg">
                  <div className="text-sm font-medium text-text-primary">Founded in 2023</div>
                  <div className="text-xs text-text-muted">San Francisco, CA</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission & Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">Mission & Values</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              The principles that guide everything we do at Seedora
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm mb-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">Our Mission</h3>
              <p className="text-xl text-text-secondary leading-relaxed">
                To democratize innovation by providing developers with the tools to protect their intellectual property while connecting them with investors who can help bring their ideas to life.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl border border-light-border p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-4">{value.title}</h3>
                <p className="text-text-secondary leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">Meet Our Team</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              The passionate people behind Seedora
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl border border-light-border p-8 shadow-sm hover:shadow-lg transition-all duration-300 text-center">
                <div className="relative mb-6">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-32 h-32 rounded-2xl mx-auto ring-4 ring-primary/20"
                  />
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                    {member.role}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{member.name}</h3>
                <p className="text-text-secondary leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Milestones */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">Our Journey</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Key milestones in Seedora's growth
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:translate-x-0"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="md:w-1/2 mb-8 md:mb-0">
                      <div className={`bg-light-card rounded-xl p-6 border border-light-border shadow-sm ${
                        index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                      }`}>
                        <div className="text-sm font-bold text-primary mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-text-primary mb-2">{milestone.title}</h3>
                        <p className="text-text-secondary">{milestone.description}</p>
                      </div>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-1/2 top-6 w-6 h-6 bg-primary rounded-full transform -translate-x-1/2 border-4 border-white"></div>
                    
                    <div className="md:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">Get in Touch</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Have questions or want to learn more about Seedora?
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Building size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-1">Headquarters</h4>
                      <p className="text-text-secondary">123 Innovation Way, San Francisco, CA 94107</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <MessageCircle size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-1">Email</h4>
                      <p className="text-text-secondary">hello@seedora.dev</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Globe size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-1">Social</h4>
                      <div className="flex items-center space-x-4 mt-2">
                        <a href="#" className="text-text-muted hover:text-primary transition-colors">
                          <Github size={20} />
                        </a>
                        <a href="#" className="text-text-muted hover:text-primary transition-colors">
                          <Twitter size={20} />
                        </a>
                        <a href="#" className="text-text-muted hover:text-primary transition-colors">
                          <Linkedin size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-6">Send Us a Message</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Twitter and LinkedIn icons for the contact section
function Twitter(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
  );
}

function Linkedin(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

export default AboutPage;