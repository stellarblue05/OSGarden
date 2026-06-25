import { useLilumTheme } from "../Systems/Lilum/Theme";
import PopUp from "../Component/Pop-up";
const FileViewer = ({ title, content, ...props }) => {
  const { theme } = useLilumTheme();

  return (
    <PopUp
      title={title}
      {...props}
      style={{
        backgroundColor: theme.bg,
        backdropFilter: "blur(5px)"
      }}
      handleStyle={{ color: theme.text }}
      bodyStyle="scroll-thin lilum-scroll"
    >
      <pre style={{ color: theme.text }}>
        {content}
      </pre>
    </PopUp>
  );
};

export default FileViewer