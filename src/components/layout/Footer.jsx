"use client";
import phn from "@/assets/icons/call.svg";
import emailIcon from "@/assets/icons/email.svg";
import fb from "@/assets/icons/fb.svg";
import insta from "@/assets/icons/insta.svg";
import x from "@/assets/icons/x.svg";
import logo from "@/assets/logo.svg";
import { useGetAllCategoryQuery } from "@/redux/api/categoryApi";
import { useGetContactUsQuery } from "@/redux/api/legalApi";
import { Divider } from "antd";
import Image from "next/image";
import Link from "node_modules/next/link";

export default function Footer() {
  const { data: categoryData, error, isLoading } = useGetAllCategoryQuery();
  const {
    data: contactUsData,
    error: contactUsError,
    isLoading: contactUsIsLoading,
  } = useGetContactUsQuery();

  if (contactUsIsLoading) {
    return null;
  }
  // console.log('contact: ', contactUsData?.data)
  let emails = [];

  // useEffect(() => {
  const contactData = contactUsData?.data;
  contactData?.map((data) => {
    if (data?.type === "GENERAL") {
      emails.push(data?.value);
    }
  });
  // }, [contactUsData])

  // console.log('emails', emails[0]);

  const categories = categoryData?.data?.categories;

  return (
    <footer className=" bg-[#0C2C41] py-4 lg:py-10">
      <div className="container mx-auto px-[4%] ">
        <div className="  flex flex-col md:flex-row gap-8 md:justify-between   ">
          {/* 1st col */}
          <div className=" flex flex-col items-center md:items-start  gap-4 ">
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>

            <p className="font-poppins text-gray-400 text-xs lg:text-sm max-w-[294px] text-center md:text-justify">
              AliumPro is a curated marketplace that connects founders and
              business owners with vetted professionals in finance, HR,
              marketing, operations and more. We help you find the right expert,
              work with clarity and build long-term collaborations, all in one
              place.
            </p>
          </div>

          {/* 2nd col */}
          <div className=" space-y-8 text-center md:text-left ">
            <h1 className="font-poppins text-xl lg:text-2xl text-white font-semibold">
              Categories
            </h1>
            <ul className="text-sm lg:text-[16px] space-y-4 font-open-sans text-gray-400">
              {isLoading && <p>Loading...</p>}

              {categories?.slice(0, 4).map((category) => {
                return <li key={category.id}>{category.title}</li>;
              })}
            </ul>
          </div>

          {/* 3rd col */}
          <div className=" space-y-8 text-center md:text-left ">
            <h1 className="font-poppins text-xl lg:text-2xl text-white font-semibold ">
              Information
            </h1>
            <ul className="text-sm lg:text-[16px] space-y-4 font-open-sans text-gray-400">
              <li>
                <Link href="about-us">About Us</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link href="/terms-conditions">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Devider */}
        <div className=" ">
          <Divider style={{ borderColor: "#B0B0B0" }} />

          <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center ">
            <div className=" flex flex-col md:flex-row gap-4 md:gap-8  items-center">
              <p className=" md:text-xl flex items-center gap-2 text-gray-400 ">
                <Image src={emailIcon} alt="email" />
                {emails[0] ? emails[0] : "support@gmail.com"}
              </p>

              <p className=" md:text-xl flex items-center gap-2 text-gray-400">
                <Image src={phn} alt="email" /> +0000000000
              </p>
            </div>

            {/* socials */}
            <div className="flex gap-2 justify-center ">
              {/* <Image src={fb} alt="fb" width="26" />
                            <Image src={insta} alt="fb" width="32" />
                            <Image src={x} alt="fb" width="28" /> */}
              {Array.isArray(contactData) &&
                contactData.map((d) => {
                  if (d?.type !== "SOCIAL") return null;

                  const href = d?.value || "#";
                  const title = d?.title || "";

                  let icon = null;
                  if (title === "Facebook")
                    icon = <Image src={fb} alt="Facebook" width={26} />;
                  else if (title === "Instagram" || title === "Instragram")
                    icon = <Image src={insta} alt="Instagram" width={32} />;
                  else if (title === "Twitter")
                    icon = <Image src={x} alt="Twitter" width={28} />;

                  if (!icon) return null;

                  return (
                    <a
                      key={d.id ?? href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={title}
                      title={title}
                    >
                      {icon}
                    </a>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
