const ReviewStarIcon = (props) => {
  const { isFill, keyValue, size } = props;
  if (isFill) {
    return (
      <svg
        key={keyValue}
        width={size === undefined ? "20" : size}
        height={size === undefined ? "20" : size}
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 1L14.7541 8.76531L21.4853 4.51472L17.2347 11.2459L25 13L17.2347 14.7541L21.4853 21.4853L14.7541 17.2347L13 25L11.2459 17.2347L4.51472 21.4853L8.76531 14.7541L1 13L8.76531 11.2459L4.51472 4.51472L11.2459 8.76531L13 1Z"
          fill="#515FFF"
          stroke="#F4F4F7"
          strokeOpacity="0.08"
          strokeLinejoin="round"
        />
      </svg>
    )
  } else {
    return (<svg
      key={keyValue}
      width={size === undefined ? "20" : size}
      height={size === undefined ? "20" : size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 1L14.7541 8.76531L21.4853 4.51472L17.2347 11.2459L25 13L17.2347 14.7541L21.4853 21.4853L14.7541 17.2347L13 25L11.2459 17.2347L4.51472 21.4853L8.76531 14.7541L1 13L8.76531 11.2459L4.51472 4.51472L11.2459 8.76531L13 1Z"
        fill="#F4F4F7"
        stroke="#F4F4F7"
        strokeOpacity="0.08"
        strokeLinejoin="round"
      />
    </svg>)
  }
}

export default ReviewStarIcon;

