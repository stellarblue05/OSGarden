import { useLilumTheme } from "../Systems/Lilum/Theme";
import PopUp from "../Component/Pop-up";

const FileViewer = ({ title, content, type, ...props }) => {
  const { theme } = useLilumTheme();

  //.txt = text :)
  return (
    <PopUp
      title={title}
      {...props}
      style={{
        backgroundColor: `color-mix(in srgb, ${theme.sec} 60%, transparent)`,
        color: theme.text,
        backdropFilter: " blur(10px)  saturate(115%)  brightness(100%)",
      }}
      handleStyle={{ color: theme.text }}
      bodyStyle="scroll-thin lilum-scroll"
    >
      <hr className="opacity-40" style={{ color: "#dbdbdb77" }} />
      {type === "text" && <pre className="m-1">{content}</pre>}

      {type === "img" && (
        <div className="w-full h-full flex center">
          <img src={content} alt="Image not loaded :(" />
        </div>
      )}
    </PopUp>
  );
};

export default FileViewer;
