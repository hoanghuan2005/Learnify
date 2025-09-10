import { Link, useLocation } from "react-router-dom"; // use react-router-dom for web apps
import { BellIcon, LogOutIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { data: authUser, isLoading } = useAuthUser();
  const location = useLocation();
  const { logoutMutation } = useLogout();

  const isChatPage = location.pathname?.startsWith("/chat"); // if you need it later

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center gap-2 w-full">
          {/* Left area: (optional) show logo only on chat page */}
          {/* {isChatPage && (
            <div className="pl-1 sm:pl-2">
              <Link to="/" className="flex items-center gap-2.5">
                <span className="text-2xl sm:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  Streamify
                </span>
              </Link>
            </div>
          )} */}

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {/* Notifications — show for both states (optional) */}
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle" aria-label="Notifications">
                <BellIcon className="h-6 w-6 text-base-content/70" />
              </button>
            </Link>

            <ThemeSelector />

            {/* Right side: Auth state */}
            {isLoading ? null : !authUser ? (
              // Not logged in: show Login button
              <Link to="/login" className="btn btn-primary btn-sm sm:btn-md">
                Đăng nhập
              </Link>
            ) : (
              // Logged in: avatar with dropdown showing user info
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                  aria-label="User menu"
                >
                  <div className="w-9 rounded-full ring ring-primary/70 ring-offset-2 ring-offset-base-200">
                    <img
                      src={authUser?.profilePic || authUser?.avatarUrl || "https://api.dicebear.com/9.x/identicon/svg?seed=user"}
                      alt="User Avatar"
                      onError={(e) => {
                        // Fallback avatar if image fails
                        e.currentTarget.src = "https://api.dicebear.com/9.x/identicon/svg?seed=guest";
                      }}
                    />
                  </div>
                </div>

                <div tabIndex={0} className="dropdown-content z-[60] mt-3 w-80">
                  <div className="card bg-base-100 shadow-xl border border-base-300">
                    <div className="card-body p-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 rounded-full ring ring-primary/70 ring-offset-2 ring-offset-base-100">
                            <img
                              src={authUser?.profilePic || authUser?.avatarUrl || "https://api.dicebear.com/9.x/identicon/svg?seed=user"}
                              alt="User Avatar"
                              onError={(e) => {
                                e.currentTarget.src = "https://api.dicebear.com/9.x/identicon/svg?seed=guest";
                              }}
                            />
                          </div>
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold truncate">
                            {authUser?.username || authUser?.name || "Người dùng"}
                          </div>
                          <div className="text-sm text-base-content/70 truncate">
                            {authUser?.email || "(chưa có email)"}
                          </div>
                        </div>
                      </div>

                      {/* Extra user info if available */}
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        {typeof authUser?.role !== "undefined" && (
                          <div className="p-2 rounded-lg bg-base-200">
                            <div className="text-xs text-base-content/60">Role</div>
                            <div className="font-medium">{String(authUser.role)}</div>
                          </div>
                        )}
                        {typeof authUser?.level !== "undefined" && (
                          <div className="p-2 rounded-lg bg-base-200">
                            <div className="text-xs text-base-content/60">Level</div>
                            <div className="font-medium">{String(authUser.level)}</div>
                          </div>
                        )}
                        {typeof authUser?.xp !== "undefined" && (
                          <div className="p-2 rounded-lg bg-base-200 col-span-2 sm:col-span-1">
                            <div className="text-xs text-base-content/60">XP</div>
                            <div className="font-medium">{String(authUser.xp)}</div>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 flex gap-2">
                        <Link to="/profile" className="btn btn-outline btn-sm grow">
                          Profile
                        </Link>
                        <button
                          className="btn btn-error btn-sm"
                          onClick={logoutMutation}
                          aria-label="Đăng xuất"
                        >
                          <LogOutIcon className="h-4 w-4" />
                          <span className="ml-1 hidden sm:inline">Đăng xuất</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
