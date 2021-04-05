import { FunctionComponent, useContext } from "react";
import classes from "./BankAccountBalance.module.scss";


export const BankAccountBalance: FunctionComponent<{balance: number}> = (props) => {
  const { balance } = props;
  return (
    <div className={`${classes.root} ${classes.bank001}`}>
      <h2>
        Saldo em conta Corrente{" "}
        <span>R$ {balance.toLocaleString("pt-BR")}</span>
      </h2>
    </div>
  );
};
