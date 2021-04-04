import Footer from "./Footer";
import MainContent from "./MainContent";
import Navbar from "./Navbar";

export default function Layout() {
    return (
        <div>
            <Navbar/>
            <MainContent>
                <h1>Contas bancárias</h1>
            </MainContent>
            <Footer/>
        </div>
    );
}