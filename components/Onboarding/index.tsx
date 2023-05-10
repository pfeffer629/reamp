import Link from "next/link";

function Onboarding({icon, text, cta, ctaLink}) {
    return(
      <div className="flex justify-center mt-20">
        <div className="grid justify-items-center">
            <div className="mb-5">{icon}</div>
            <div className="mb-5">{text}</div>
            <Link href={ctaLink}>
              <button
                className="bg-white border-darkLine border-[1px] rounded-3xl px-5 py-2 
                text-sidebarBg hover:scale-105 transition-all duration-300"
              >
                {cta}
              </button>
            </Link>
        </div>
      </div>
        
    )
}

export default Onboarding;