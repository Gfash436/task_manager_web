import { ReactNode } from "react";
import cls from "classnames";

export default function FormRow({
  error,
  children,
}: {
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className={cls("fgroup", error && "invalid")}>
      {children}
      {error && <div className="input-validation">{error}</div>}
    </div>
  );
}
