import './Square.css';

interface Props {
    color: string;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Square: React.FC<Props> = ({ color, onClick }) => {
    return (
        <div onClick={onClick} className="Square" style={{ background: color }}></div>
    )
}

export default Square;