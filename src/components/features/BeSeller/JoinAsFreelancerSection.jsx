

import Image from 'next/image';
import TealBtn from '@/components/ui/TealBtn';
import freelancerImg from '@/assets/image/freelancer2.jpg'; // <-- your image
import Link from 'node_modules/next/link';

export default function JoinAsFreelancerSection() {
  const items = [
    {
      id: 1,
      title: 'Showcase Your Expertise',
      desc: 'Build a standout profile with case studies, credentials, and reviews.',
    },
    {
      id:2,
      title: 'Connect with the Right Clients',
      desc: 'Get matched with vetted companies or entrepreneurs ready to kick off projects.',
    },
    {
      id: 3,
      title: 'Scale your business. All in one place',
      desc: 'Be found. Get booked. Meet. Showcase your best work. Turn reviews into new clients. All within AliumPro.',
    },
  ];

  return (
    <section className="py-8 lg:py-12">
      <div className="">
        
        <div className="flex flex-col md:flex-row gap-8 lg:gap-20 2xl:gap-40">
          {/* Left: image */}

          <div className="md:w-[50%]  ">
            <Image
              src={freelancerImg}
              alt="Freelancer working"
             className="rounded-2xl h-full object-cover"
              priority={false}
            />
          </div>

          {/* Right: timeline + CTA */}
          <div className='  flex items-center '>
           <div className=''>
             {/* timeline */}
            <div className="relative pl-8 ">
              {/* vertical dashed line */}
              <span className="absolute left-3 top-1.5 h-[calc(100%-0.5rem)] w-0.5 border-l-2 border-dashed border-[#E8E8E8] opacity-70" />
              <ul className="space-y-10">
                {items.map((it, i) => (
                  <li key={i} className="relative">
                    {/* green dot */}
                    <span className="absolute -left-7 top-1.5 h-4 w-4 rounded-full bg-[#8BCF9A] ring-4 ring-[#8BCF9A]/20" />
                    <h4 className="text-[16px] sm:text-[17px] font-semibold text-[#000000] font-open-sans">
                      {it.title}
                    </h4>
                    <p className={`mt-1  text-[#6F6F6F] font-nunito 
                      
                      `}>
                      {it.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA button */}
            <div className="mt-10 ">
              <div className="">
                <Link href="/sign-up">
                  <TealBtn text="Join as a Pro" />
                </Link>
              </div>
            </div>
           </div>
          </div>
        </div>
      </div>
    </section>
  );
}


//  ${it.id === 3 ? 'text-gray-700 font-semibold' : ''} 