type MessageProps = {
  message: {
    type: "success" | "error";
    msg: string;
  };
};

export function Message({ message }: MessageProps) {
  if (!message.msg) return null;

  return (
    <div
      style={{
        padding: "10px",
        marginTop: "10px",
        borderRadius: "5px",
        color: "#fff",
        backgroundColor: message.type === "success" ? "green" : "red",
      }}
    >
      {message.msg}
    </div>
  );
}