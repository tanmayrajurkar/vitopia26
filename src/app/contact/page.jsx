import Contact from "@/components/ContactPage/contactPage";
import { Footer } from "@/components/Homepage/sections/footer";
import Navbar from "@/components/Homepage/sections/navbar";

export default function Page() {
    return (
        <div className="bg-black min-h-screen">
            <Navbar />
            <Contact/>
            <Footer />
        </div>
    );
}