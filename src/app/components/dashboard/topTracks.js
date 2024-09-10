import { auth } from "../../../auth";


//Function to create Top Tracks Card and fetch data 
async function TopTracks(range) {

    const session = await auth();
    const token = session.user.access_token;

    const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=8&offset=0&time_range=${range}_term`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

// This function coverts ms to a string of min:sec for duration diplay
    function getDuration(time) {

        const min = Math.floor(time / 60000);
        const sec = Math.floor((time % 60000)/1000);

        if(sec > 10){
            return`${min}:${sec}`
        } else if(sec < 10) {
            return `${min}:0${sec}`
        } else {
            return `${min}:00`
        }      
    }

    function Artists(item) {
        const artistsNames = item.artists.map((artist)=>(artist.name))
        const artistList = artistsNames.join(', ')
        return artistList
    }


    const tracks = await response.json();
    
    if(response.ok) {
        return(
            <div className=" flex flex-col font-Inter h-full" id="topTracks">
            <h2 className="text-3xl font-bold text-center pb-4"> Top Tracks</h2>
            <div className="bg-[#00000040] rounded-2xl backdrop-blur border-[#ffffff27] border py-4">
                <div className="flex justify-around text-xs text-center font-semibold">
                    <h3 className="w-4/12"> Artist/Song</h3>
                    <h3 className="w-2/5 pl-10"> Album</h3>
                    <h3 className=""> Duration</h3>
                </div>
                <ol className="p-1 overflow-y-scroll">
                    {tracks.items.map((item, index) =>(
                        <div className="" key={item.id}>
                            <li className=" my-1 text-xs leading-none font-light  bg-[#ffffff15] rounded-md shadow-sm shadow-black border-[#ffffff27] border-0.5 pt-0.5 pb-2 min-h-10">
                                <div className="flex justify-between items-center">
                                    <div className="flex w-5/12 items-center">
                                        <p className="p-1 font-semibold md:text-base text-sm">{`${index + 1}.`}</p>
                                        <img src={item.album.images[2].url} alt="album" className="w-6 h-6 mx-1 rounded-md" />
                                        <div className="h-9 flex flex-col">
                                            <a  href={item.uri} className=" h-4 font-normal md:text-base text-sm leading-none hover:underline hover:font-semibold duration-500"><p className="block h-5 overflow-clip pt-0.5 leading-5">{item.name}</p></a>
                                            <p className="h-4 mt-1 overflow-hidden font-light leading-4">{Artists(item)}</p>
                                        </div>
                                    </div>
                                    <p className="mx-2 w-64 text-center justify-center overflow-hidden max-h-8 font-normal text-sm leading-4">{item.album.name}</p>
                                    <p className="h-full flex items-center pr-1 text-base font-normal"> {getDuration(item.duration_ms)}</p>
                                </div>
                            </li>
                        </div>
                    ))}
                </ol>
            </div>
        </div> 
        )
    }
}
//Last Week
export function TopTracksShort() {
    return TopTracks('short')
}
//Last 6 months
export function TopTracksMed() {
    return TopTracks('medium')
}
//Last Year
export function TopTracksLong(){
    return TopTracks('long')
}
