
import { ArtistShort } from "../../components/dashboard/topArtists"
import {TopTracksShort} from "../../components/dashboard/topTracks"




export  default  async function DashboardShort() {
        return (
            <div className="flex gap-2 justify-center items-center p-2">
            <TopTracksShort />
            <ArtistShort />
            </div>
        )
}