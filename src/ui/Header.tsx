import useProfile from "../features/user/useProfile";

export default function Header() {
  const userDetails = useProfile();

  function logout() {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("userDetails");

    window.location.reload();
  }

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand">
          <span>T</span>ask Manager
        </div>
        {userDetails ? (
          <div className="header__right">
            <button className="header__logout" onClick={logout}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.125 12.0004C16.125 11.8015 16.046 11.6107 15.9053 11.47C15.7647 11.3294 15.5739 11.2504 15.375 11.2504H4.40201L6.36301 9.57036C6.43786 9.50628 6.49936 9.42808 6.54399 9.34022C6.58862 9.25237 6.61551 9.15659 6.62313 9.05835C6.63074 8.9601 6.61893 8.86132 6.58837 8.76764C6.55781 8.67396 6.50909 8.58722 6.44501 8.51236C6.38092 8.43751 6.30272 8.37601 6.21487 8.33138C6.12702 8.28675 6.03124 8.25986 5.93299 8.25224C5.83475 8.24463 5.73596 8.25644 5.64228 8.287C5.5486 8.31756 5.46186 8.36628 5.38701 8.43036L1.88701 11.4304C1.80467 11.5008 1.73857 11.5882 1.69325 11.6866C1.64792 11.785 1.62445 11.892 1.62445 12.0004C1.62445 12.1087 1.64792 12.2157 1.69325 12.3141C1.73857 12.4125 1.80467 12.5 1.88701 12.5704L5.38701 15.5704C5.53818 15.6998 5.73458 15.7639 5.93299 15.7485C6.1314 15.7331 6.31558 15.6395 6.44501 15.4884C6.57443 15.3372 6.6385 15.1408 6.62313 14.9424C6.60775 14.744 6.51418 14.5598 6.36301 14.4304L4.40301 12.7504H15.375C15.5739 12.7504 15.7647 12.6713 15.9053 12.5307C16.046 12.39 16.125 12.1993 16.125 12.0004Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M9.375 8C9.375 8.702 9.375 9.053 9.544 9.306C9.61679 9.41478 9.71022 9.50821 9.819 9.581C10.072 9.75 10.423 9.75 11.125 9.75H15.375C15.9717 9.75 16.544 9.98705 16.966 10.409C17.3879 10.831 17.625 11.4033 17.625 12C17.625 12.5967 17.3879 13.169 16.966 13.591C16.544 14.0129 15.9717 14.25 15.375 14.25H11.125C10.423 14.25 10.072 14.25 9.819 14.418C9.71012 14.4911 9.61668 14.5849 9.544 14.694C9.375 14.947 9.375 15.298 9.375 16C9.375 18.828 9.375 20.243 10.254 21.121C11.132 22 12.546 22 15.374 22H16.374C19.204 22 20.617 22 21.496 21.121C22.375 20.243 22.375 18.828 22.375 16V8C22.375 5.172 22.375 3.757 21.496 2.879C20.617 2 19.203 2 16.375 2H15.375C12.546 2 11.132 2 10.254 2.879C9.375 3.757 9.375 5.172 9.375 8Z"
                  fill="currentColor"
                ></path>
              </svg>
              Logout
            </button>
            <div className="header__user">
              <img
                src={`https://avatar.iran.liara.run/username?username=${userDetails.firstName}+${userDetails.lastName}`}
                alt=""
              />
              <p>
                {userDetails.firstName} {userDetails.lastName}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
