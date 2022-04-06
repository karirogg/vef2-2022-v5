import s from './Button.module.scss';

type IProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: IProps) {
  return (
    <button className={s.button} onClick={() => onClick && onClick()}>
      {children}
    </button>
  );
}
