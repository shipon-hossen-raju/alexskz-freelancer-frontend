// import icon1 from "@/assets/icons/icon1.svg";
// import icon2 from "@/assets/icons/icon2.svg";
// import icon3 from "@/assets/icons/icon3.svg";
// import icon4 from "@/assets/icons/icon4.svg";
import { useGetClientHomeQuery } from "@/redux/api/profileApi";
import { Calendar, MessageCircle, Star } from "lucide-react";
import { motion } from "motion/react";
import { IoIosBriefcase } from "react-icons/io";
import HomeBooking from "../HomeBooking";
import WhiteBoxCard from "../shared/WhiteBoxCard";
import CustomSearch from "../ui/CustomSearch";
import Paragraph from "../ui/Paragraph";

export default function ClientHome() {
  const {
    data: homeData,
    error: userError,
    isLoading: isUserHomeLoading,
  } = useGetClientHomeQuery();
  const home = homeData?.data || {};
  const firstName = home?.firstName || "";
  const lastName = home?.lastName || "";
  const name = `${firstName} ${lastName}`.trim() || "";

  const items = [
    {
      id: 1,
      icon: <Calendar color="#8BCF9A" />,
      title: "Upcoming Appointments",
      count: home?.upComingBookings || 0,
      status: "This week",
    },
    {
      id: 2,
      icon: <MessageCircle color="#8BCF9A" />,
      title: "Messages",
      count: home?.unReadMessageCount || 0,
      status: "unread ",
    },
    {
      id: 3,
      icon: <Star color="#8BCF9A" />,
      title: "Reviews  Given",
      count: home?.givenRatingsCount || 0,
      status: "Total reviews",
    },
    {
      id: 4,
      icon: <IoIosBriefcase color="#8BCF9A" />,
      title: "Active Bookings",
      count: home?.activeBookings || 0,
      status: "Ongoing",
    },
  ];

  return (
    <div>
      <div className="pb-6 md:hidden ">
        <CustomSearch />
      </div>

      {/* Heading */}
      <div
        className="flex w-full items-center gap-4 rounded-2xl p-6 shadow-sm border border-transparent"
        style={{
          // base pale blue-gray background with two soft green radial highlights (left small, right large)
          backgroundColor: "#EAF3F6",
          backgroundImage: `radial-gradient(circle at 6% 50%, rgba(139,207,154,0.08) 0%, rgba(139,207,154,0.02) 25%, transparent 40%),
                          radial-gradient(circle at 85% 55%, rgba(139,207,154,0.18) 0%, rgba(139,207,154,0.08) 20%, rgba(139,207,154,0.02) 45%, transparent 65%)`,
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Waving hand emoji */}
        <span className="text-3xl">👋</span>

        {/* Text content */}
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-[#333333] font-open-sans">
            Welcome back, {name}!
          </h2>

          <Paragraph text="Here's what's happening in your account today" />
        </div>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-16">
        {isUserHomeLoading ? (
          <BoxCardLoading />
        ) : (
          items.map((item) => <WhiteBoxCard key={item.id} item={item} />)
        )}
      </div>

      {/* upcoming bookings */}
      <HomeBooking />
    </div>
  );
}

//  loading skeleton
const BoxCardLoading = () => {
  // 4x
  const skeletons = Array.from({ length: 4 }, (_, index) => index);
  return (
    <>
      {skeletons.map((index) => (
        <motion.div
          key={index}
          className="bg-white rounded-[10px] p-6 font-open-sans border border-black/10 animate-pulse"
        >
          <motion.div
            whileHover={{ y: 6, scale: 1.03 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.9 }}
            className="space-y-2"
          >
            {/* Skeleton for icon */}
            <div className="bg-gray-300 w-10 h-10 flex items-center justify-center rounded-[10px]"></div>

            {/* Skeleton for title */}
            <div className="bg-gray-300 w-3/4 h-5 rounded-md"></div>

            {/* Skeleton for count */}
            <div className="bg-gray-300 w-1/2 h-8 rounded-md"></div>

            {/* Skeleton for status */}
            <div className="bg-gray-300 w-1/3 h-4 rounded-md"></div>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
};
