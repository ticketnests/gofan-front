import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

import { Link } from "react-router-dom";
import type {Timeout} from "../types"

let timeout: Timeout;
export default function NotFound() {
    const [currentUrl, setCurrentUrl] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const funnyMessages = [
        "Looks like you took a wrong turn at Albuquerque.",
        "This page has gone to the same place as your missing sock.",
        "404: The page is hiding from you. Try whispering.",
        "Aliens abducted this page. We negotiated but they said no.",
        "Well, this is awkward...",
        "You found the secret page! Just kidding. It's gone.",
        "Page not found. But at least you found us!",
        "Our developers are blaming the interns. Again.",
        "You had one job... and it wasn’t this link.",
        "This page is on vacation. Try again later!"
    ];

    useEffect(() => {


        setCurrentUrl(window.location.pathname);
        const randomIndex = Math.floor(Math.random() * funnyMessages.length);
        setMessage(funnyMessages[randomIndex]);
        setLoading(true);

        timeout = setTimeout(() => {
            setLoading(false);
        },2000)


        return () => {
            clearTimeout(timeout)
        }


    }, []);

    return (
        <>
        {loading ? <>
            <Loading />
        
        </> : <>
        <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow font-1 hero bg-base-200">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold text-error">404</h1>
                            <p className="py-4 text-lg">
                                Oops! The page <span className="font-mono text-primary">{currentUrl}</span> doesn't exist.
                            </p>
                            <p className="italic mb-6 text-sm text-base-content">{message}</p>
                            <Link to="/" className="btn btn-primary font-1">Go Home<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
</svg>
</Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>}

       
        </>
    );
}
