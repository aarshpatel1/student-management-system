import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { TabView, TabPanel } from 'primereact/tabview';
import { Link } from 'react-router';

function Home() {
  // Features data
  const features = [
    {
      title: "Student Management",
      icon: "pi pi-users",
      description: "Comprehensive tools to manage student profiles, academic records, and performance metrics in one place.",
      items: [
        "Student enrollment and profile management",
        "Academic record tracking and management",
        "Custom fields for institution-specific data",
        "Bulk student data import and export"
      ]
    },
    {
      title: "Performance Analytics",
      icon: "pi pi-chart-line",
      description: "Powerful analytics tools to track student performance, identify trends and make data-driven decisions.",
      items: [
        "Customizable performance dashboards",
        "Grade tracking and analysis",
        "Progress reports and comparisons",
        "Early intervention identification"
      ]
    },
    {
      title: "Attendance Management",
      icon: "pi pi-calendar",
      description: "Streamline attendance tracking with automated tools and comprehensive reporting capabilities.",
      items: [
        "Digital attendance recording",
        "Absence patterns analysis",
        "Automated parent notifications",
        "Attendance certificate generation"
      ]
    },
    {
      title: "Communication Hub",
      icon: "pi pi-comments",
      description: "Foster better communication between administrators, teachers, students, and parents.",
      items: [
        "In-platform messaging system",
        "Announcement broadcasts",
        "Parent-teacher communication portal",
        "Document sharing and collaboration"
      ]
    }
  ];

  // Modules data for tab view
  const modules = [
    {
      title: "Administration",
      content: "Manage institution settings, user permissions, and system configurations. Set up academic years, terms, and custom fields tailored to your institution's needs.",
      image: "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg"
    },
    {
      title: "Student Records",
      content: "Maintain comprehensive student profiles including personal information, academic history, attendance records, and disciplinary notes all in one secure location.",
      image: "https://img.freepik.com/free-vector/gradient-infographic-template_23-2149373266.jpg"
    },
    {
      title: "Academics",
      content: "Track courses, assignments, grades, and generate report cards. Set up custom grading scales and assessment criteria aligned with your curriculum.",
      image: "https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148865392.jpg"
    },
    {
      title: "Reporting",
      content: "Generate comprehensive reports on student performance, attendance patterns, and institutional metrics with customizable templates and export options.",
      image: "https://img.freepik.com/free-vector/gradient-infographic-template_23-2149373231.jpg"
    }
  ];

  return (
    <div className="student-management-system">
      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-8 px-4">
        <div className="container mx-auto grid grid-nogutter">
          <div className="col-12 md:col-6 flex flex-column justify-content-center">
            <h1 className="text-6xl font-bold mb-4">Student Management System</h1>
            <p className="text-xl line-height-3 mb-5 text-white-alpha-80">
              A comprehensive solution designed to streamline educational administration, 
              enhance student tracking, and improve institutional outcomes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/signup">
                <Button label="Get Started" icon="pi pi-user-plus" className="p-button-raised p-button-lg" />
              </Link>
              <Link to="/login">
                <Button label="Login" icon="pi pi-sign-in" className="p-button-outlined p-button-lg" />
              </Link>
            </div>
          </div>
          <div className="col-12 md:col-6 flex align-items-center justify-content-center">
            <img 
              src="https://img.freepik.com/free-vector/online-learning-isometric-concept_1284-17947.jpg" 
              alt="Student Management System" 
              className="w-full max-w-full md:max-w-25rem border-round-lg shadow-8"
              style={{ transform: 'perspective(1000px) rotateY(-10deg)' }}
            />
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="benefits-section py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6">Key Benefits</h2>
          <div className="grid">
            <div className="col-12 md:col-3 p-3">
              <div className="h-full flex flex-column align-items-center text-center p-3">
                <div className="bg-primary border-circle p-3 mb-3" style={{ width: '4rem', height: '4rem' }}>
                  <i className="pi pi-clock-fill text-2xl text-white flex justify-content-center align-items-center h-full"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">Save Time</h3>
                <p className="text-color-secondary line-height-3 m-0">
                  Automate routine tasks and reduce administrative workload by up to 70%
                </p>
              </div>
            </div>
            <div className="col-12 md:col-3 p-3">
              <div className="h-full flex flex-column align-items-center text-center p-3">
                <div className="bg-primary border-circle p-3 mb-3" style={{ width: '4rem', height: '4rem' }}>
                  <i className="pi pi-chart-bar text-2xl text-white flex justify-content-center align-items-center h-full"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">Improve Outcomes</h3>
                <p className="text-color-secondary line-height-3 m-0">
                  Use data-driven insights to identify at-risk students and enhance learning outcomes
                </p>
              </div>
            </div>
            <div className="col-12 md:col-3 p-3">
              <div className="h-full flex flex-column align-items-center text-center p-3">
                <div className="bg-primary border-circle p-3 mb-3" style={{ width: '4rem', height: '4rem' }}>
                  <i className="pi pi-shield text-2xl text-white flex justify-content-center align-items-center h-full"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">Enhanced Security</h3>
                <p className="text-color-secondary line-height-3 m-0">
                  Keep student data secure with role-based access controls and data encryption
                </p>
              </div>
            </div>
            <div className="col-12 md:col-3 p-3">
              <div className="h-full flex flex-column align-items-center text-center p-3">
                <div className="bg-primary border-circle p-3 mb-3" style={{ width: '4rem', height: '4rem' }}>
                  <i className="pi pi-mobile text-2xl text-white flex justify-content-center align-items-center h-full"></i>
                </div>
                <h3 className="text-xl font-medium mb-3">Access Anywhere</h3>
                <p className="text-color-secondary line-height-3 m-0">
                  Cloud-based system accessible on any device, anytime, anywhere
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-8 px-4 surface-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-2">Comprehensive Features</h2>
          <p className="text-xl text-center mb-6 text-color-secondary max-w-30rem mx-auto">
            Everything you need to efficiently manage your educational institution
          </p>

          <div className="grid">
            {features.map((feature, index) => (
              <div key={index} className="col-12 md:col-6 lg:col-3 p-3">
                <Card className="h-full shadow-2 feature-card">
                  <div className="flex align-items-center mb-4">
                    <div className="bg-primary-100 border-round p-2 mr-3">
                      <i className={`${feature.icon} text-2xl text-primary`}></i>
                    </div>
                    <h3 className="text-xl font-medium m-0">{feature.title}</h3>
                  </div>
                  <p className="text-color-secondary line-height-3 mb-4">{feature.description}</p>
                  <ul className="list-none p-0 m-0">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex align-items-center mb-2">
                        <i className="pi pi-check-circle text-primary mr-2"></i>
                        <span className="text-color-secondary">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Overview */}
      <section className="system-overview py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6">System Modules</h2>

          <TabView>
            {modules.map((module, index) => (
              <TabPanel key={index} header={module.title}>
                <div className="grid">
                  <div className="col-12 md:col-6 flex align-items-center">
                    <div className="p-4">
                      <h3 className="text-2xl font-medium mb-4">{module.title} Module</h3>
                      <p className="line-height-3 text-color-secondary text-lg mb-4">{module.content}</p>
                      <Button label="Learn More" icon="pi pi-arrow-right" className="p-button-outlined" />
                    </div>
                  </div>
                  <div className="col-12 md:col-6">
                    <img 
                      src={module.image} 
                      alt={module.title} 
                      className="w-full border-round shadow-4"
                    />
                  </div>
                </div>
              </TabPanel>
            ))}
          </TabView>
        </div>
      </section>

      {/* Testimonials & Stats Combined Section */}
      <section className="stats-testimonials py-8 px-4 bg-primary text-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6">Trusted by Educational Institutions</h2>
          
          <div className="grid mb-6">
            <div className="col-6 md:col-3 text-center p-3">
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-xl">Institutions</div>
            </div>
            <div className="col-6 md:col-3 text-center p-3">
              <div className="text-5xl font-bold mb-2">250K+</div>
              <div className="text-xl">Students Managed</div>
            </div>
            <div className="col-6 md:col-3 text-center p-3">
              <div className="text-5xl font-bold mb-2">95%</div>
              <div className="text-xl">Satisfaction Rate</div>
            </div>
            <div className="col-6 md:col-3 text-center p-3">
              <div className="text-5xl font-bold mb-2">35%</div>
              <div className="text-xl">Admin Time Saved</div>
            </div>
          </div>

          <Card className="border-none bg-primary-dark text-white">
            <div className="text-center">
              <p className="text-2xl line-height-3 font-italic mb-4">
                "This system has transformed how we manage our school. The administrative time we've saved 
                has allowed us to focus more on what matters most - our students' education."
              </p>
              <div className="mb-3">
                <img 
                  src="https://randomuser.me/api/portraits/women/43.jpg" 
                  alt="Principal" 
                  className="border-circle" 
                  width="60" 
                  height="60"
                />
              </div>
              <h4 className="m-0 text-xl font-medium">Dr. Sarah Johnson</h4>
              <p className="m-0 text-sm">Principal, Washington Heights Academy</p>
            </div>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-2">How It Works</h2>
          <p className="text-xl text-center mb-6 text-color-secondary max-w-30rem mx-auto">
            Get up and running with our system in four simple steps
          </p>

          <div className="grid">
            <div className="col-12 md:col-6 lg:col-3 p-3">
              <div className="flex flex-column align-items-center text-center">
                <div className="bg-primary border-circle flex align-items-center justify-content-center mb-4" style={{ width: '4rem', height: '4rem' }}>
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <h3 className="text-xl font-medium mb-3">Register Your School</h3>
                <p className="text-color-secondary line-height-3">
                  Create an account and set up your institution's profile with basic details
                </p>
              </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3 p-3">
              <div className="flex flex-column align-items-center text-center">
                <div className="bg-primary border-circle flex align-items-center justify-content-center mb-4" style={{ width: '4rem', height: '4rem' }}>
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                <h3 className="text-xl font-medium mb-3">Import Your Data</h3>
                <p className="text-color-secondary line-height-3">
                  Import student records, staff information, and course details from spreadsheets
                </p>
              </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3 p-3">
              <div className="flex flex-column align-items-center text-center">
                <div className="bg-primary border-circle flex align-items-center justify-content-center mb-4" style={{ width: '4rem', height: '4rem' }}>
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
                <h3 className="text-xl font-medium mb-3">Configure Settings</h3>
                <p className="text-color-secondary line-height-3">
                  Customize the system to match your institution's specific requirements
                </p>
              </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3 p-3">
              <div className="flex flex-column align-items-center text-center">
                <div className="bg-primary border-circle flex align-items-center justify-content-center mb-4" style={{ width: '4rem', height: '4rem' }}>
                  <span className="text-white font-bold text-2xl">4</span>
                </div>
                <h3 className="text-xl font-medium mb-3">Go Live!</h3>
                <p className="text-color-secondary line-height-3">
                  Start using the system across your organization and unlock its full potential
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-content-center mt-5">
            <Link to="/signup">
              <Button label="Get Started Today" icon="pi pi-arrow-right" className="p-button-raised p-button-lg" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section py-8 px-4 surface-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-2">Flexible Pricing Plans</h2>
          <p className="text-xl text-center mb-6 text-color-secondary max-w-30rem mx-auto">
            Choose the right plan for your institution's needs
          </p>

          <div className="grid">
            <div className="col-12 md:col-4 p-3">
              <Card className="h-full shadow-2 pricing-card">
                <div className="text-center mb-5">
                  <h3 className="text-2xl font-medium mb-2">Basic</h3>
                  <span className="text-5xl font-bold">$199</span>
                  <span className="text-color-secondary">/month</span>
                  <p className="text-color-secondary mt-2">For small institutions</p>
                </div>
                <ul className="list-none p-0 m-0 mb-5">
                  <li className="flex align-items-center mb-3">
                    <i className="pi pi-check-circle text-primary mr-2"></i>
                    <span>Up to 500 student records</span>
                  </li>
                  <li className="flex align-items-center mb-3">
                    <i className="pi pi-check-circle text-primary mr-2"></i>
                    <span>Core student management features</span>
                  </li>
                  <li className="flex align-items-center mb-3">
                    <i className="pi pi-check-circle text-primary mr-2"></i>
                    <span>Basic reporting</span>
                  </li>
                  <li className="flex align-items-center mb-3">
                    <i className="pi pi-check-circle text-primary mr-2"></i>
                    <span>Email support</span>
                  </li>
                </ul>
                <Button label="Choose Basic" className="p-button-outlined w-full" />
              </Card>
            </div>
            
            <div className="col-12 md:col-4 p-3">
              <Card className="h-full shadow-8 pricing-card border-primary" style={{ transform: 'scale(1.05)' }}>
                <div className="bg-primary text-white p-3 mb-4 border-round">
                  <span className="font-medium">MOST POPULAR</span>
                </div>
                <div className="text-center mb-5">
                  <h3 className="text-2xl font-medium mb-2">Professional</h3>
                  <span className="text-5xl font-bold">$499</span>
                  <span className="text-color-secondary">/month</span>
                  <p className="text-color-secondary mt-2">For medium institutions</p>
                </div>
                <ul className="list-none p-0 m-0 mb-5">
                  <li className="flex align-items-center mb-3">
                    <i className="pi pi-check-circle text-primary mr-2"></i>
                    <span>Up to 2,000 student records</span>
                  </li>
                  <li className="flex align-items-center mb-3">
                    <i className="pi pi-check-circle text-primary mr-2"></i>
                    <span>All features in Basic</span>
                  </li>
                  <li className="flex align-items-center mb-3">
                    <i className="pi pi-check-circle text-primary mr-2"></i>
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex align-items-center mb-3">
                    <i className="pi pi-check-circle text-primary mr-2"></i>
                    <span>Parent/student portal</span>
                  </li>
                  <li className="flex align-items-center mb-3">
                    <i className="pi pi-check-circle text-primary mr-2"></i>
                    <span>Priority phone & email support</span>
                  </li>
                </ul>
                <Button label="Choose Professional" className="p-button w-full" />
              </Card>
            </div>
            
            <div className="col-12 md:col-4 p-3">
              <Card className="h-full shadow-2 pricing-card">
                <div className="text-center mb-5">
                  <h3 className="text-2xl font-medium mb-2">Enterprise</h3>
                  <span className="text-5xl font-bold">$999</span>
                  <span className="text-color-secondary">/month</span>
                  <p className="text-color-secondary mt-2">For large institutions</p>
                </div>
                <ul className="list-none p-0 m-0 mb-5">
                  <li className="flex align-items-center mb-3">
                    <i className="pi pi-check-circle text-primary mr-2"></i>
                    <span>Unlimited student records</span>
                  </li>
                  <li className="flex align-items-center mb-3">
                    <i className="pi pi-check-circle text-primary mr-2"></i>
                    <span>All Professional features</span>
                  </li>
                  <li className="flex align-items-center mb-3">
                    <i className="pi pi-check-circle text-primary mr-2"></i>
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex align-items-center mb-3">
                    <i className="pi pi-check-circle text-primary mr-2"></i>
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex align-items-center mb-3">
                    <i className="pi pi-check-circle text-primary mr-2"></i>
                    <span>24/7 premium support</span>
                  </li>
                </ul>
                <Button label="Contact Sales" icon="pi pi-envelope" className="p-button-outlined w-full" />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          
          <div className="grid">
            <div className="col-12 md:col-6 p-3">
              <Card className="shadow-1">
                <h3 className="text-xl font-medium mb-3">How secure is student data in your system?</h3>
                <p className="text-color-secondary line-height-3 m-0">
                  Our system uses industry-standard encryption and secure data centers to ensure 
                  all student information is protected. We comply with FERPA and other educational 
                  data privacy regulations, and implement role-based access controls to ensure data 
                  is only accessible to authorized personnel.
                </p>
              </Card>
            </div>
            <div className="col-12 md:col-6 p-3">
              <Card className="shadow-1">
                <h3 className="text-xl font-medium mb-3">Can I import existing student data?</h3>
                <p className="text-color-secondary line-height-3 m-0">
                  Yes! Our system supports bulk importing of student data via CSV and Excel files. 
                  We also offer migration services for institutions transitioning from other student 
                  management systems to ensure a smooth transfer of all your important records.
                </p>
              </Card>
            </div>
            <div className="col-12 md:col-6 p-3">
              <Card className="shadow-1">
                <h3 className="text-xl font-medium mb-3">What kind of support is available?</h3>
                <p className="text-color-secondary line-height-3 m-0">
                  All plans include access to our comprehensive documentation and video tutorials. 
                  Basic plans include email support with 24-hour response time. Professional plans 
                  add phone support and faster response times, while Enterprise plans include 24/7 
                  support and a dedicated account manager.
                </p>
              </Card>
            </div>
            <div className="col-12 md:col-6 p-3">
              <Card className="shadow-1">
                <h3 className="text-xl font-medium mb-3">Do you offer training for staff?</h3>
                <p className="text-color-secondary line-height-3 m-0">
                  Yes, we offer both remote and on-site training options for your staff. Professional 
                  and Enterprise plans include complimentary training sessions, while Basic plans can 
                  add training packages at an additional cost. Our goal is to ensure your team can 
                  fully utilize all features of the system.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-8 px-4 bg-primary text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Institution?</h2>
          <p className="text-xl mb-5 mx-auto max-w-30rem">
            Join hundreds of educational institutions already benefiting from our powerful student management system.
          </p>
          <div className="flex justify-content-center gap-3 flex-wrap">
            <Link to="/signup">
              <Button label="Start Free Trial" icon="pi pi-check-circle" className="p-button-raised p-button-lg" />
            </Link>
            <Button label="Request Demo" icon="pi pi-desktop" className="p-button-outlined p-button-lg" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 surface-0 border-top-1 surface-border">
        <div className="container mx-auto">
          <div className="grid">
            <div className="col-12 md:col-4">
              <h3 className="text-lg font-medium mb-3">Student Management System</h3>
              <p className="line-height-3 text-color-secondary mb-4">
                The complete solution for educational institutions to streamline administration and focus on what matters most - education.
              </p>
              <div className="flex gap-3">
                <Button icon="pi pi-facebook" className="p-button-rounded p-button-text" />
                <Button icon="pi pi-twitter" className="p-button-rounded p-button-text" />
                <Button icon="pi pi-linkedin" className="p-button-rounded p-button-text" />
                <Button icon="pi pi-youtube" className="p-button-rounded p-button-text" />
              </div>
            </div>
            
            <div className="col-6 md:col-2 mt-4 md:mt-0">
              <h4 className="text-lg font-medium mb-3">Product</h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-2"><a className="text-color-secondary no-underline hover:text-primary cursor-pointer">Features</a></li>
                <li className="mb-2"><a className="text-color-secondary no-underline hover:text-primary cursor-pointer">Pricing</a></li>
                <li className="mb-2"><a className="text-color-secondary no-underline hover:text-primary cursor-pointer">Demo</a></li>
                <li><a className="text-color-secondary no-underline hover:text-primary cursor-pointer">Updates</a></li>
              </ul>
            </div>
            
            <div className="col-6 md:col-2 mt-4 md:mt-0">
              <h4 className="text-lg font-medium mb-3">Resources</h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-2"><a className="text-color-secondary no-underline hover:text-primary cursor-pointer">Documentation</a></li>
                <li className="mb-2"><a className="text-color-secondary no-underline hover:text-primary cursor-pointer">Tutorials</a></li>
                <li className="mb-2"><a className="text-color-secondary no-underline hover:text-primary cursor-pointer">Blog</a></li>
                <li><a className="text-color-secondary no-underline hover:text-primary cursor-pointer">Community</a></li>
              </ul>
            </div>
            
            <div className="col-6 md:col-2 mt-4 md:mt-0">
              <h4 className="text-lg font-medium mb-3">Company</h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-2"><a className="text-color-secondary no-underline hover:text-primary cursor-pointer">About Us</a></li>
                <li className="mb-2"><a className="text-color-secondary no-underline hover:text-primary cursor-pointer">Careers</a></li>
                <li className="mb-2"><a className="text-color-secondary no-underline hover:text-primary cursor-pointer">Contact</a></li>
                <li><a className="text-color-secondary no-underline hover:text-primary cursor-pointer">Partners</a></li>
              </ul>
            </div>
            
            <div className="col-6 md:col-2 mt-4 md:mt-0">
              <h4 className="text-lg font-medium mb-3">Legal</h4>
              <ul className="list-none p-0 m-0">
                <li className="mb-2"><a className="text-color-secondary no-underline hover:text-primary cursor-pointer">Privacy</a></li>
                <li className="mb-2"><a className="text-color-secondary no-underline hover:text-primary cursor-pointer">Terms</a></li>
                <li className="mb-2"><a className="text-color-secondary no-underline hover:text-primary cursor-pointer">Security</a></li>
                <li><a className="text-color-secondary no-underline hover:text-primary cursor-pointer">Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <Divider className="my-4" />
          
          <div className="flex flex-wrap justify-content-between align-items-center">
            <p className="text-color-secondary m-0">© 2025 Student Management System. All rights reserved.</p>
            <div className="flex align-items-center">
              <img src="https://img.freepik.com/free-vector/secure-payment-logo_23-2147495110.jpg" alt="Payment Methods" style={{ height: '30px' }} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;