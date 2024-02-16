import { useEffect, useRef } from "react";
import cn from "classnames";
import styles from "./modal.module.css";

export default function Modal({ active, setActive, large, children }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  console.log(active, setActive);

  useEffect(() => {
    if (active) {
      document.body.classList.add(styles.body);
    } else {
      document.body.classList.remove(styles.body);
    }
  }, [active]);

  useEffect(() => {
    if (modalRef) {
      const handleClick = (event) => {
        if (event.target == modalRef.current) {
          setActive(false);
        }
      };

      window.addEventListener("click", handleClick);

      return () => {
        window.removeEventListener("click", handleClick);
      };
    }
  }, [modalRef]);

  return (
    <section
      ref={modalRef}
      className={cn(styles.modal, { [styles.active]: active })}
    >
      <div
        ref={contentRef}
        className={cn(styles.content, { [styles.large]: large })}
      >
        {children}
      </div>
    </section>
  );
}
