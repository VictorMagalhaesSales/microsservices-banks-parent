import classes from "./Navbar.module.scss";

export default function Navbar() {
    return (
        <nav className={`navbar navbar-expand-lg ${classes.root} ${classes.bank001}`}>
            <div className={`container-fluid ${classes.navbarBody}`}>
                <a className={`navbar-brand ${classes.navbarBrand}`} href="#">
                    <img src="/img/icon_banco.png" alt="" className={classes.logoBank} />
                    <div className={classes.bankName}>
                        <span>Cod - 001</span>
                        <h2>BBX</h2>
                    </div>
                </a>
                <div className={`collapse navbar-collapse ${classes.navbarRightRoot}`} id="navbarSupportedContent">
                    <ul className={`navbar-nav ml-auto ${classes.navbarRightBody}`}>
                        <li className={`nav-item ${classes.bankAccountInfo}`}>
                            <img src="/img/icon_user.png" alt="" className={classes.iconUser} />
                            <p className={classes.ownerName}>
                                Proprietário | C/C: Número da conta
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}