import { BankAccount } from "../../../utils/model";
import classes from "./BankAccountCard.module.scss";

interface BankAccountCardProps {
  bankAccount: BankAccount;
}

export default function BankAccountCard(props: BankAccountCardProps) {
  const { bankAccount } = props;
  
  return (
    <article className={`${classes.root} ${classes.bank001}`}>
      <div>
        <h2 className={classes.ownerName}>{bankAccount.owner_name}</h2>
        <p className={`${classes.accountNumber} ${classes.bank001}`}>
          {bankAccount.account_number}
        </p>
      </div>
      <span
        className={`fas fa-chevron-right ${classes.iconRight} ${classes.bank001}`}
      />
    </article>
  );
};

