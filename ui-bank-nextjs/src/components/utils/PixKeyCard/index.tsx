// @flow
import classes from "./PixKeyCard.module.scss";
import * as React from "react";
import { PixKey } from "../../../models/model";
const pixKeyKinds = {
  cpf: "CPF",
  email: "E-mail",
};

const PixKeyCard: React.FunctionComponent<{pixKey: PixKey}> = (props) => {
  const { pixKey } = props;
  //const bank = React.useContext(BankContext);
  return (
    <div className={`${classes.root} ${classes.bank001}`}>
      <p className={classes.kind}>{pixKeyKinds[pixKey.kind]}</p>
      <span className={classes.key}>{pixKey.key}</span>
    </div>
  );
};

export default PixKeyCard;
