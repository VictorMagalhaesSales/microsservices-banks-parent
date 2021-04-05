import Link from "next/link";
import { FunctionComponent, useContext } from "react";
import BankContext from "../../context/BankContext";
import { BankAccount } from "../../utils/model";
import classes from "./Navbar.module.scss";

const Navbar: FunctionComponent<{bankAccount?: BankAccount}> = (props) => {
    const { bankAccount } = props;
    const bank = useContext(BankContext);
    return (
        <nav className={`navbar navbar-expand-lg ${classes.root} ${classes.bank001}`}>
            <div className={`container-fluid ${classes.navbarBody}`}>
                <Link href="/bank-accounts" as="/bank-accounts">
                <a className={`navbar-brand ${classes.navbarBrand}`} href="#">
                    <img src="/img/icon_banco.png" alt="" className={classes.logoBank}/>
                    <div className={classes.bankName}>
                        <span>Cod - 001</span>
                        <h2>BBX</h2>
                    </div>
                </a>
                </Link>
                {bankAccount && (
                <div className={`collapse navbar-collapse ${classes.navbarRightRoot}`}
                    id="navbarSupportedContent">
                    <ul className={`navbar-nav ml-auto ${classes.navbarRightBody}`}>
                        <li className={`nav-item ${classes.bankAccountInfo}`}>
                            <img src="/img/icon_user.png" alt="" className={classes.iconUser}/>
                            <p className={classes.ownerName}>
                                {bankAccount.owner_name} | C/C: {bankAccount.account_number}
                            </p>
                        </li>
                    </ul>
                </div>
                )}
            </div>
        </nav>
    );
}
export default Navbar;