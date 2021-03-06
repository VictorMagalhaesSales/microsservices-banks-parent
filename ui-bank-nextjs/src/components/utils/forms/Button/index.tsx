import {DetailedHTMLProps, ButtonHTMLAttributes, forwardRef, useContext} from "react";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: "primary" | "info";
}
const buttonClasses = {
  primary: "btn-primary",
  info: "btn-info",
};
const Button = forwardRef<any, ButtonProps>((props, ref) => {
  const { variant = "primary", ...rest } = props;
  const className = [
    "btn", buttonClasses[variant], 'bank001', props.className,
  ].join(" ").trim();
  return <button className={className} {...rest} ref={ref} />;
});

export default Button;
