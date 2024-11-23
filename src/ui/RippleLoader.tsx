import cls from "classnames";

export default function RippleLoader({ page }: { page?: boolean }) {
  return (
    <div className={cls("loader-ripple", !page && "loader-ripple--action")}>
      <div></div>
      <div></div>
    </div>
  );
}
