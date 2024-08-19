import SideBar from "../components/dashboard/sidebar"
import auth from "../../auth"
import ExploreCard from "../components/dashboard/explore"
import { CurrentlyPlaying} from "../components/dashboard/nowPlaying"

export default function DashboardLayout( {children}) {

        return (
            <div className="flex mt-2 py-5 font-Inter" id="dashboardLayout">
                <SideBar />
                <div id="absoluteTop"> <a className=" opacity-0"> o</a> </div>
                <div>
                    <section className="max-w-full"> {children}</section>
                    <div className="flex justify-between items-end pr-4">
                    <ExploreCard />
                    <CurrentlyPlaying />
                    </div>
                </div>
                <div id="absoluteBottom"> <a className="opacity-0"> a</a></div>
            </div>
        )
    }
