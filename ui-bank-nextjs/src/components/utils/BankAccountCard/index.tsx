import classes from "./BankAccountCard.module.scss";

export default function BankAccountCard(props) {
  const { bankAccount } = props;
  
  return (
    <article className={`${classes.root} ${classes.bank001}`}>
      <div>
        <h2 className={classes.ownerName}> Victor Magalhães</h2>
        <p className={`${classes.accountNumber} ${classes.bank001}`}>
          123.123.456.789
        </p>
      </div>
      <span
        className={`fas fa-chevron-right ${classes.iconRight} ${classes.bank001}`}
      />
    </article>
  );
};

