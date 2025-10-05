import classnames from "classnames";
import "./Text.css";

export const Text = (props) => {
  const { isLoading, loadingText = "Loading...", ...spanProps } = props;

  if (isLoading) {
    return (
      <span
        {...spanProps}
        className={classnames(spanProps.className, "Text-skeleton")}
        role="status"
        aria-busy="true"
      >
        {loadingText}
      </span>
    );
  }

  return <span {...spanProps} />;
};
