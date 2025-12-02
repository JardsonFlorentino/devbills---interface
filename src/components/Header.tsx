import { Activity, LogIn, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

interface NavLink {
  name: string;
  path: string;
}

const Header = () => {
  const { authState, signOut } = useAuth();
  const { pathname } = useLocation();

  const isAutenticated: boolean = !!authState.user;

  const navLink: NavLink[] = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Transações", path: "/transacoes" },
  ];

  const handleSingOut = (): void => {
    signOut();
  };

  const renderAvatar = () => {
    if (!authState.user) return null;

    if (authState.user.photoURL) {
      return (
        <img
          src={authState.user.photoURL}
          alt={`foto de perfil do(a) ${authState.user.displayName}`}
          className="w-8 h-8 rounded-full border border-gray-700"
        />
      );
    }

    return (
      <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
        {authState.user.displayName?.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <header className="bg-gray-900 border-b border-gray-700">
      <div className="container-app">
        {/* Linha principal do header */}
        <div className="flex items-center justify-between gap-3 py-4">
          {/* Logo + infos do usuário (mobile) */}
          <div className="flex items-center gap-3">
            {/* LOGO */}
            <Link
              to="/"
              className="flex gap-2 text-lg md:text-xl text-primary-500 items-center font-bold"
            >
              <Activity className="h-6 w-6" />
              ControleJá
            </Link>

            {/* Avatar + sair no mobile */}
            {isAutenticated && (
              <div className="flex items-center gap-2 md:hidden">
                {renderAvatar()}
                <button
                  type="button"
                  onClick={handleSingOut}
                  className="p-1.5 rounded-full hover:bg-red-500/10 text-red-400"
                  aria-label="Sair"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>

          {/* NAV: visível em todas as telas */}
          {isAutenticated && (
            <nav className="flex gap-2 md:gap-3 text-sm md:text-base">
              {navLink.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={
                    pathname === link.path
                      ? "text-primary-500 bg-primary-500/10 rounded-md px-3 py-2"
                      : "text-gray-400 px-3 py-2 hover:text-primary-500 hover:bg-primary-500/5 rounded-md"
                  }
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Área direita só no desktop: avatar + nome + sair */}
          <div className="hidden md:flex items-center space-x-4">
            {isAutenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {renderAvatar()}
                  <span className="text-sm font-medium">
                    {authState.user?.displayName}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSingOut}
                  className="hover:text-red-300 hover:bg-red-500 p-2 rounded-full transition-colors cursor-pointer"
                >
                  <LogOut className="text-gray-200" />
                </button>
              </div>
            ) : (
              <Link to="/login">
                <LogIn className="gb-primary-500 text-gray-900 font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-500 transition-all" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
