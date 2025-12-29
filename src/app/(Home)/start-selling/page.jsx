// import hero from "@/assets/image/BeSellerBG.png";
import hero from "@/assets/image/BeSellerBG.webp";
import JoinAsFreelancerSection from "@/components/features/BeSeller/JoinAsFreelancerSection";
import PricingSection from "@/components/features/BeSeller/PricingSection";
import FlexibleBanner from "@/components/shared/FlexibleBanner";
import SectionContainer from "@/components/shared/SectionContainer";
import CustomContainer from "@/components/ui/CustomContainer";

export default function BeSellerPage() {
  const handleAction = () => {
    console.log("clicked");
  }
  return (
    <CustomContainer>
      {/* Banner */}
      <div>
        <FlexibleBanner
          bgSrc={hero}
          variant="simple"
          title="Turn your skills into long-term opportunities"
          subtitle="Join a curated network of professionals in finance, HR, marketing and operations, and connect with businesses that are actively looking for your expertise."
          actionText="Join as a Pro"
          actionHref="/sign-up"
          // actionClass=""
          // onActionClick={handleAction}
          overlayClass="bg-black/5"
          radius=""
          subtitleClass="text-black/80"
          titleClass="!max-w-[650px]"
        />
      </div>

      {/* Become seller */}
      <div>
        <SectionContainer
          heading="Your skills, our platform, better opportunities"
          // title="Why join us ?"
        >
          <JoinAsFreelancerSection />
        </SectionContainer>
      </div>

      {/* Pricing Section */}
      <div>
        <PricingSection />
      </div>
    </CustomContainer>
  );
}
