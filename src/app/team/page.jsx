import { Footer } from "@/components/Homepage/sections/footer";
import Navbar from "@/components/Homepage/sections/navbar";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

export default function Page() {
    return (
        <div className="bg-black min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow flex items-center justify-center pt-20">
                <ComingSoonPage
                    title="Meet the Team"
                    description="The brilliant minds behind VITOPIA 2026 will be showcased here soon."
                />
            </main>
            <Footer />
        </div>
    );
}