import React from "react";
import { ToastConsumer } from "react-toast-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToasterWrapper } from "./toaster-notification.style";

type Props = {
  appearance: String,
  children: Node,
  onDismiss: () => void
};

const ToasterNotification = (props: Props) => {
  const { appearance, children, onDismiss } = props;
  const isArray = Array.isArray(children);
  const title = isArray ? children[0] : children;
  const content = isArray && children[1];
  return (
    <ToasterWrapper className={`toaster-wrap--primary toaster ${appearance}`}>
      <div className="toaster-wrap__content">
        { title && <p className="content__title">{title}</p> }
        { content && <p className="content__message">{content}</p> }
      </div>
      <div className="toaster-wrap__dismiss">
      <ToastConsumer>
        {() => (
          <FontAwesomeIcon icon="times" className="fa fa-times" onClick={onDismiss} />
        )}
      </ToastConsumer>
      </div>
    </ToasterWrapper>
  );
};

export default ToasterNotification;
