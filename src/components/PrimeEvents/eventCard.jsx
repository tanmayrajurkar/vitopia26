'use client'
import { IconExternalLink } from '@tabler/icons-react';

function EventCard({ beach }) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 my-4">
            <img className="w-full" src={beach.imageLink} alt={beach.name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-white">{beach.name}</div>
                <p className="text-gray-300 text-base">
                    {beach.description ? beach.description : 'No description available'}
                </p>
            </div>
            {/* <div className="px-6 pt-4 pb-2 relative flex flex-col">
                <span className='text-white'>
                    External Price: ₹ {beach.startPrice}
                </span>
                <span className='text-white float-right'>
                    Internal Price: ₹ {beach.endPrice}
                </span>
            </div> */}
            <div className="px-6 py-4 flex items-center justify-between">
                <a className="bg-blue-600 hover:bg-blue-800 text-white text-center font-bold py-2 px-4 rounded w-[80%]" href={beach.link} target='_blank'>
                    Registration
                </a>
                <a href={'https://universitywebsitbucket.s3.ap-south-1.amazonaws.com/vitopia/Vitopia+(Prime+Event+Rules)_2025+.pdf'}
                    target='_blank'
                    className="transition ease-in duration-300 text-gray-500"
                    title="Rules and Regulations">
                    <IconExternalLink className="h-6 w-6" />
                </a>

            </div>
        </div>
    );
}

export default EventCard;
