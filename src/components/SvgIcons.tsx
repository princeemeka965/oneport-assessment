import * as React from "react";

export const ChevronRight = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="currentColor"
    className="bi bi-chevron-right"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
    />
  </svg>
);

export const ChevronLeft = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="currentColor"
    className="bi bi-chevron-left"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
    />
  </svg>
);

export const Sun = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="#FAB005"
    viewBox="0 0 30 30"
    {...props}
  >
    <path d="M14.984.986A1 1 0 0 0 14 2v3a1 1 0 1 0 2 0V2A1 1 0 0 0 14.984.986zM5.797 4.8a1 1 0 0 0-.695 1.717l2.12 2.12a1 1 0 1 0 1.415-1.413L6.516 5.102a1 1 0 0 0-.72-.303zm18.375 0a1 1 0 0 0-.688.303l-2.12 2.12a1 1 0 1 0 1.413 1.415l2.121-2.121a1 1 0 0 0-.726-1.717zM15 8a7 7 0 0 0-7 7 7 7 0 0 0 7 7 7 7 0 0 0 7-7 7 7 0 0 0-7-7zM2 14a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2H2zm23 0a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2h-3zM7.91 21.06a1 1 0 0 0-.687.303l-2.121 2.121a1 1 0 1 0 1.414 1.414l2.12-2.12a1 1 0 0 0-.726-1.717zm14.15 0a1 1 0 0 0-.697 1.717l2.121 2.121a1 1 0 1 0 1.414-1.414l-2.12-2.12a1 1 0 0 0-.717-.303zm-7.076 2.926A1 1 0 0 0 14 25v3a1 1 0 1 0 2 0v-3a1 1 0 0 0-1.016-1.014z" />
  </svg>
);

export const EyeIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="#005C00"
    className="bi bi-eye"
    {...props}
  >
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
  </svg>
);
