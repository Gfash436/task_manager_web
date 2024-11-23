import { createPortal } from "react-dom";
import RippleLoader from "./RippleLoader";

export default function PageRipple() {
  return createPortal(
    <>
      <div className="page-ripple">
        <RippleLoader page />
      </div>
      <div className="overlay"></div>
    </>,
    document.body
  );
}
