import { useRouter } from "next/router";
import { useTrackQuery } from "@spinamp/spinamp-hooks";

export default function Track() {
  const router = useRouter();
  const { slug } = router.query;
  const { data, error, isLoading } = useTrackQuery(slug ? slug.toString() : '');
  console.log(data)
  if (isLoading) {
    return <div></div>
  }
  return (
    <div className="w-[895px] mx-auto">
      <div className="py-8 border-t-[0.5px] border-white/30 mt-8">
        <div className="text-4xl font-bold">{data?.title}</div>
      </div>
      <div className="flex justify-between w-full">
        <div
          className="w-[40%] h-[40%] rounded-lg overflow-hidden shadow-md shadow-white/20 transform transition-all duration-[3s] active:rotate-[1800deg] active:scale-75"
          draggable="false"
        >
          <img
            className="w-full"
            draggable="false"
            src={data?.lossyArtworkUrl}
          />
        </div>
        <div className="w-[56%]">
          <div className="text-whiteDisabled">
            {data?.description}
          </div>
          <div>
            <div>
              Creator:
              <div className="w-14 rounded-full overflow-hidden shadow-md">
                {/*<img src={data.lossy_artwork_url} />*/}
              </div>
            </div>
            <div>
              <div className="shadow-md py-1">
                <a
                  target="_blank"
                  className="py-1 hover:text-green-300 active:text-green-500 flex items-center space-x-2"
                  href={data?.websiteUrl}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
                    <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
