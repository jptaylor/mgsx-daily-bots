const getNumberPath = (number: number) => {
  switch (number) {
    case 0:
      return (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 50H50V0H0V50ZM30 40V10H10V40H30Z"
          fill="currentColor"
        />
      );
    case 1:
      return <rect width="20" height="50" fill="currentColor" />;
    case 2:
      return (
        <path d="M50 0V30H10V40H50V50H0V20H30V10H0V0H50Z" fill="currentColor" />
      );
    case 3:
      return (
        <path d="M0 0V10H30V20H0V30H30V40H0V50H50V0H0Z" fill="currentColor" />
      );
    case 4:
      return <path d="M0 0H10V20H30V0H50V50H30V30H0V0Z" fill="currentColor" />;
    case 5:
      return (
        <path d="M0 0H50V10H10V20H50V50H0V40H30V30H0V0Z" fill="currentColor" />
      );
    case 6:
      return (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0H50V10H10V20H50V50H0V0ZM10 40H30V30H10V40Z"
          fill="currentColor"
        />
      );
    case 7:
      return <path d="M0 0V10H30V50H50V0H0Z" fill="currentColor" />;
    case 8:
      return (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0H50V50H0V0ZM10 40H30V30H10V40ZM30 20H10V10H30V20Z"
          fill="currentColor"
        />
      );
    case 9:
      return (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 30H30V50H50V0H0V30ZM30 20V10H10V20H30Z"
          fill="currentColor"
        />
      );
  }
};

export const NumberSVG = ({
  number,
  className,
}: {
  number: number;
  className?: string;
}) => (
  <svg
    width={number === 1 ? "30" : "50"}
    height="50"
    viewBox={number === 1 ? "0 0 30 50" : "0 0 50 50"}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {getNumberPath(number)}
  </svg>
);

export const DotSVG = ({ className }: { className?: string }) => (
  <svg
    width="10"
    height="50"
    viewBox="0 0 10 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="0" y="30" width="10" height="20" fill="currentColor" />
  </svg>
);

export default NumberSVG;
