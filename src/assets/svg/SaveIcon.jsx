import React from "react";

const SaveIcon = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
    >
      <path
        d="m3 5c0-1.10457.89543-2 2-2h8.3787c.5304 0 1.0391.21071 1.4142.58579l1.6213 1.62132c.3751.37507.5858.88378.5858 1.41421v8.37868c0 1.1046-.8954 2-2 2h-10c-1.10457 0-2-.8954-2-2zm2-1c-.55228 0-1 .44772-1 1v10c0 .5523.44772 1 1 1v-4.5c0-.8284.67157-1.5 1.5-1.5h7c.8284 0 1.5.6716 1.5 1.5v4.5c.5523 0 1-.4477 1-1v-8.37868c0-.26522-.1054-.51957-.2929-.70711l-1.6213-1.62132c-.1875-.18753-.4419-.29289-.7071-.29289h-.3787v2.5c0 .82843-.6716 1.5-1.5 1.5h-4c-.82843 0-1.5-.67157-1.5-1.5v-2.5zm2 0v2.5c0 .27614.22386.5.5.5h4c.2761 0 .5-.22386.5-.5v-2.5zm7 12v-4.5c0-.2761-.2239-.5-.5-.5h-7c-.27614 0-.5.2239-.5.5v4.5z"
        fill="#212121"
      />
    </svg>
  );
};

export default SaveIcon;
