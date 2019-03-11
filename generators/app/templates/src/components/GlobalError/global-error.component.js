import React from "react";
import {
  GlobalErrorWrapper,
  ErrorTitle,
  ErrorInfo,
  DetailWrapper,
  ImageWrapper,
  ErrorDetail
} from "./global-error.style";

type Props = {
  error: String,
  info: Object
};
/**
 * Global Component to show error on app
 * has basic markup and will render into ErrorBoundary component
 */
export const GlobalError = ({ error, info }: Props) => {
  return (
    <GlobalErrorWrapper>
      <ImageWrapper>
        <img src="/img/error-ufo.svg" alt="Error" />
      </ImageWrapper>
      <DetailWrapper>
        <ErrorTitle data-testid="error-title">Error:</ErrorTitle>
        <ErrorInfo data-testid="error-info">Something Went Wrong</ErrorInfo>
        <ErrorDetail className="subheadline">
          You may refresh the page, or try again at a later time.
        </ErrorDetail>
        <ErrorDetail>{info.componentStack}</ErrorDetail>
      </DetailWrapper>
    </GlobalErrorWrapper>
  );
};
