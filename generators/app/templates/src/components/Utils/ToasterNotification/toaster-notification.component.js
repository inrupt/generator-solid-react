import React from "react";
import { ToasterWrapper } from "./toaster-notification.style";

const ToasterNotification = ({ appearance, children }: Props) => {
  const title = Array.isArray(children) ? children[0] : children;
  const content = Array.isArray(children) && children[1];

  return (
    <ToasterWrapper className={`toaster-wrap--primary toaster ${appearance}`}>
      <div className="toaster-wrap__content">
        { title && <p className="content__title">{title}</p> }
        { content && <p className="content__message">{content}</p> }
      </div>
      <div className="toaster-wrap__dismiss">
        <i className="fa fa-times" />
      </div>
    </ToasterWrapper>
  );
};

export default ToasterNotification;
