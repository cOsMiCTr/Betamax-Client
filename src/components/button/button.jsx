import { Button } from 'react-bootstrap';
import "./button.scss";

export function BButton({ label, onClick }) {
  return <Button type="submit" onClick={(command) => onClick(command)} className="glow-on-hover">{label}</Button>;
}
