function Onboarding({icon, text}) {
    return(
        <div>
            <div>{icon}</div>
            <div>{text}</div>
            <button
              className="bg-white border-darkLine border-[1px] rounded-lg w-full h-[40px] text-sidebarBg"
            >
              Explore the web3 music ecosystem
            </button>
        </div>
    )
}

export default Onboarding;