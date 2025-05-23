import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
export default function Terms() {
    return (
        <> 
            <HelmetProvider>
        
            <Navbar />
            <Helmet>
            <meta charSet="utf-8" />
            <title>Terms of Service • ticketnest</title>
            <meta
      name="description"
      content={`To use ticketnest, you must agree to our terms of service. Read them here.`}
    />
        </Helmet>
            <div className="container mx-auto my-10 p-6 bg-base-100 font-1 rounded-lg">
                <h1 className="text-4xl font-bold text-left mb-8">Terms of Service</h1>

                <div className="prose flex flex-col gap-2 max-w-none">
                    {/* Introduction */}
                    <h2 className="text-2xl font-semibold">1. Introduction</h2>
                    <p>
                        Welcome to TicketNest, a ticketing platform for Montgomery County Public Schools (MCPS) students. By accessing or using TicketNest, you agree to these Terms of Service. Please read them carefully before using our service.
                    </p>

                    {/* Eligibility */}
                    <h2 className="text-2xl font-semibold">2. Eligibility</h2>
                    <p>
                        TicketNest is intended for use by MCPS students, staff, and authorized event organizers. By using this service, you confirm that you are a current MCPS student or have been authorized by MCPS to use this platform.
                    </p>

                    {/* Information We Collect */}
                    <h2 className="text-2xl font-semibold">3. Information We Collect</h2>
                    <p>
                        We only collect the following information when you use TicketNest:
                    </p>
                    <ul className="list-disc list-inside">
                        <li>Full Name</li>
                        <li>Student Email Address (MCPS email)</li>
                    </ul>

                    {/* Use of Service */}
                    <h2 className="text-2xl font-semibold">4. Use of Service</h2>
                    <p>
                        TicketNest provides a platform for purchasing and managing tickets for school events. You agree to use the service only for lawful purposes and in accordance with all MCPS policies and applicable laws.
                    </p>
                    <ul className="list-disc list-inside">
                        <li>You must provide accurate and current information when registering or purchasing tickets.</li>
                        <li>You may not use another person's information or impersonate anyone else.</li>
                        <li>Tickets purchased are for personal use only and may not be resold or transferred except as permitted by event organizers.</li>
                    </ul>

                    {/* Payments */}
                    <h2 className="text-2xl font-semibold">5. Payments</h2>
                    <p>
                        All payments for tickets are processed securely through our payment provider. TicketNest does not store your payment information.
                    </p>

                    {/* Event Changes and Cancellations */}
                    <h2 className="text-2xl font-semibold">6. Event Changes and Cancellations</h2>
                    <p>
                        Event details, including dates, times, and locations, are subject to change by event organizers. TicketNest is not responsible for event cancellations or changes. Refunds, if any, are at the discretion of the event organizer.
                    </p>

                    {/* User Conduct */}
                    <h2 className="text-2xl font-semibold">7. User Conduct</h2>
                    <p>
                        You agree not to misuse the TicketNest platform. Prohibited activities include, but are not limited to:
                    </p>
                    <ul className="list-disc list-inside">
                        <li>Attempting to gain unauthorized access to the platform or other users' information</li>
                        <li>Disrupting or interfering with the security or operation of the service</li>
                        <li>Using the service for any fraudulent or illegal activity</li>
                    </ul>

                    {/* Privacy */}
                    <h2 className="text-2xl font-semibold">8. Privacy</h2>
                    <p>
                        We respect your privacy. Please refer to our Privacy Policy for details on how we collect, use, and protect your information.
                    </p>

                    {/* Limitation of Liability */}
                    <h2 className="text-2xl font-semibold">9. Limitation of Liability</h2>
                    <p>
                        TicketNest is provided "as is" and without warranties of any kind. We are not liable for any damages or losses resulting from your use of the service, including but not limited to lost tickets, event changes, or technical issues.
                    </p>

                    {/* Changes to Terms */}
                    <h2 className="text-2xl font-semibold">10. Changes to These Terms</h2>
                    <p>
                        We may update these Terms of Service from time to time. Continued use of TicketNest after changes are posted constitutes your acceptance of the new terms.
                    </p>

                    {/* Contact Information */}
                    <h2 className="text-2xl font-semibold">11. Contact Us</h2>
                    <p>
                        If you have any questions or concerns about these Terms of Service, please contact us at:
                    </p>
                    <p>
                        Email: <a href="mailto:contact@ticketnest.us" className="text-primary underline">contact@ticketnest.us</a>
                    </p>
                </div>
            </div>
            <Footer />
            </HelmetProvider>
           
        </>
    );
}