const Header = ({ src }) => {
  return (
    <header className="header">
      <img className="logo" src={src} alt="Логотип проекта" />
    </header>
  );
}

export default Header;
