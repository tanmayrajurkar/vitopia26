import Head from 'next/head';
import Image from 'next/image';

export default function About() {
    const sections = [
        {
            title: "About VITopia '24",
            subtitle: "VITOPIA",
            description:
                "VITopia 2024 showcased a stellar lineup, including Jonita Gandhi, a versatile Indian singer, and the acclaimed music duo Salim–Sulaiman. The festival featured energetic performances from the Progressive Brothers, a popular DJ duo, and the engaging Jammers Band. Thaikkudam Bridge, known for their fusion music, and Nucleya, a leading DJ with a unique sound, also lit up the stage, ensuring an unforgettable experience.",
            imgSrc: "/last_lineup/jonitha.avif",
            imgAlt: "VITopia 2024 Lineup"
        },
        {
            title: "About VIT - AP",
            subtitle: "VIT-AP",
            description:
                "VIT-AP University was established in 2017 in Amaravati, near Vijayawada, Andhra Pradesh, with a nurturing environment, state-of-the-art facilities, and an infrastructure covering 44,50,664 square meters, all within our sprawling 100-acre campus. VIT-AP University has achieved the prestigious #1 ranking as the Emerging Private University in India for three consecutive years (2022, 2023, and 2024) in the Outlook Ranking for Higher Education. Fostering a rich learning environment, our diverse community comprises over 17,500 students from all states, Union Territories, and 11 countries. We ensure that your academic journey leads to a promising career and higher study opportunities. With over 90% of our students getting placements spread across the globe and an impressive highest package of 38 LPA, the university also supports 150+ STAR Schemes, offering top packages of 24.7 LPA, empowering rural students for global opportunities. Our state-of-the-art infrastructure includes research facilities worth 8 crore INR, resulting in 3,271 publications in reputed journals and 594 published patents. We provide a nurturing atmosphere for entrepreneurial minds with 35,000 square feet of incubation and startup space dedicated to fostering innovation.",
            imgSrc: "/vitap_drone.webp",
            imgAlt: "VIT-AP Campus"
        }
    ];

    return (
        <div className="bg-black text-white relative py-32">
            <Head>
                <title>About VITopia and VIT-AP</title>
            </Head>
            <div className="max-w-7xl mx-auto p-8">
                {sections.map((section, index) => (
                    <div key={index} className="mb-20">
                        <h1 className="text-4xl font-bold text-center mb-3">{section.title}</h1>
                        <h2 className="text-xl text-center text-gray-400 mb-6">{section.subtitle}</h2>
                        <div className="relative h-96 mb-6 group">
                            <Image src={section.imgSrc} alt={section.imgAlt} layout="fill" objectFit="cover" className="rounded-lg" />
                            {section.imgSrc === "/vitap_drone.webp" && (
                                <Image
                                    src="/night-vit.jpg"
                                    alt={section.imgAlt}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                />
                            )}
                        </div>
                        <p className="text-lg leading-relaxed text-justify">{section.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
