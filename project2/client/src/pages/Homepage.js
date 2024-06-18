import React from 'react';

const HomePage = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '0 auto', maxWidth: '800px', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>CHUWA Employees Portal</h1>
      </header>

      <section>
        <h2>Welcome to the CHUWA Family!</h2>
        <p>Dear CHUWA Employees,</p>
        <p>We are delighted to have you as part of the CHUWA family. This portal is your gateway to all the resources, updates, and support you need to excel in your role and stay connected with our community.</p>
      </section>

      <section>
        <h3>Our Mission</h3>
        <p>At CHUWA, we are dedicated to fostering a collaborative and inclusive work environment. Our mission is to drive innovation and excellence through teamwork, creativity, and a commitment to continuous improvement.</p>
      </section>

      <section>
        <h3>Key Features</h3>
        <ul>
          <li><strong>Employee Directory:</strong> Connect with colleagues across different departments.</li>
          <li><strong>News and Announcements:</strong> Stay updated with the latest company news and events.</li>
          <li><strong>Resources:</strong> Access important documents, forms, and guidelines.</li>
          <li><strong>Support:</strong> Reach out to HR and IT support for any assistance.</li>
        </ul>
      </section>

      <section>
        <h3>Upcoming Events</h3>
        <ul>
          <li><strong>Monthly Town Hall:</strong> Join us on the first Monday of every month for company updates and Q&A sessions.</li>
          <li><strong>Training Workshops:</strong> Enhance your skills with our regular training sessions. Check the calendar for upcoming topics.</li>
        </ul>
      </section>


      <footer style={{ textAlign: 'center', marginTop: '40px' }}>
        <p>Thank you for being a part of CHUWA. Together, we achieve more!</p>
        <p>For any questions or support, please reach out to us at <a href="mailto:support@chuwa.com">support@chuwa.com</a>.</p>
        <p>© 2023 CHUWA Inc.</p>
      </footer>
    </div>
  );
}

export default HomePage;