import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
export default function Privacy() {
    return (
        <>
            <Navbar />
            <Helmet>
            <meta charSet="utf-8" />
            <title>Privacy Policy • ticketnest</title>
            <meta
      name="description"
      content={`ticketnest is very serious about your privacy. View our privacy policy here.`}
    />
        </Helmet>

            <div className="container mx-auto my-10 p-6 bg-base-100 font-1 rounded-lg">
                <h1 className="text-4xl font-bold text-left mb-8">Privacy Policy</h1>

                <div className="prose flex flex-col gap-2 max-w-none">
                    {/* Introduction */}
                    <h2 className="text-2xl font-semibold">1. Introduction</h2>
                    <p>
                        Welcome to our ticketing platform for Montgomery County Public Schools (MCPS) students. We are committed to protecting your privacy and ensuring your personal information is handled responsibly. This Privacy Policy explains how we collect, use, and safeguard your data when you use our service.
                    </p>

                    {/* Data Collection */}
                    <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
                    <p>
                        We collect the following information when you use our ticketing service:
                    </p>
                    <ul className="list-disc list-inside">
                        <li>Full Name</li>
                        <li>Email Address (preferably your MCPS email)</li>
                        <li>School Affiliation</li>
                        <li>Grade Level</li>
                        <li>Payment Information (for ticket purchases)</li>
                    </ul>

                    {/* Use of Data */}
                    <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
                    <p>
                        Your information is used to:
                    </p>
                    <ul className="list-disc list-inside">
                        <li>Process ticket purchases and manage event attendance</li>
                        <li>Verify your student status at MCPS</li>
                        <li>Communicate important updates about events or your account</li>
                        <li>Process payments securely through our payment provider</li>
                    </ul>

                    {/* Data Sharing */}
                    <h2 className="text-2xl font-semibold">4. Data Sharing</h2>
                    <p>
                        We do not sell or trade your personal information. We only share your data with trusted third parties as necessary to provide our services, such as:
                    </p>
                    <ul className="list-disc list-inside">
                        <li>
                            <strong>Payment Processors</strong>: We use secure payment providers (such as Stripe) to process your ticket purchases. Your payment information is handled according to their privacy policies.
                        </li>
                        <li>
                            <strong>MCPS Administration</strong>: We may share attendance or ticketing information with school administrators for event management and security.
                        </li>
                    </ul>

                    {/* Cookies and Tracking */}
                    <h2 className="text-2xl font-semibold">5. Cookies and Tracking</h2>
                    <p>
                        Our platform uses cookies only for essential site functionality, such as keeping you logged in. We do not use cookies for advertising or behavioral tracking.
                    </p>

                    {/* Security */}
                    <h2 className="text-2xl font-semibold">6. Data Security</h2>
                    <p>
                        We use industry-standard security measures to protect your information, including encryption and secure storage. Access to your data is limited to authorized personnel only.
                    </p>

                    {/* User Rights */}
                    <h2 className="text-2xl font-semibold">7. Your Rights</h2>
                    <p>
                        You may request access to, correction of, or deletion of your personal information at any time. To make a request, please contact us at <a href="mailto:contact@ticketnest.us" className="text-primary underline">contact@ticketnest.us</a>.
                    </p>

                    {/* Data Retention */}
                    <h2 className="text-2xl font-semibold">8. Data Retention</h2>
                    <p>
                        We retain your information only as long as necessary to provide our services and comply with legal requirements. When your account is closed or upon request, your data will be securely deleted.
                    </p>

                    {/* Age Restrictions */}
                    <h2 className="text-2xl font-semibold">9. Age Restrictions</h2>
                    <p>
                        This service is intended for MCPS students and staff. If you are under 13, please use this service only with parental or guardian consent.
                    </p>

                    {/* Contact Information */}
                    <h2 className="text-2xl font-semibold">10. Contact Us</h2>
                    <p>
                        If you have any questions or concerns about this Privacy Policy or your data, please contact us at:
                    </p>
                    <p>
                        Email: <a href="mailto:contact@ticketnest.us" className="text-primary underline">contact@ticketnest.us</a>
                    </p>
                </div>
            </div>

            <Footer />
        </>
    );
}