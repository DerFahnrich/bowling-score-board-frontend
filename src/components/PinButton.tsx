interface IPinButtonProps {
  onClick: (pinNumber: number) => void;
  pinNumber: number;
}

export const PinButton = ({ onClick, pinNumber }: IPinButtonProps): JSX.Element => {
  return (
    <button className="pin-button" onClick={() => onClick(pinNumber)}>
      {pinNumber}
    </button>
  );
};
