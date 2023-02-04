import { Carousel } from "./components/Carousel"
import { ExploreTopBooks } from "./components/ExploreTopBooks"
import { Heroes } from "./components/Heroes"
import { LibraryServices } from "./components/LibraryService"

export const HomePage = () => {
    return (
        <>
        <ExploreTopBooks/>
        <Carousel/>
        <Heroes/>
        <LibraryServices/>
        </>
    )

}