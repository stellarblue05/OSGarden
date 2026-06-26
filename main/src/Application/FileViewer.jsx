import { useLilumTheme } from "../Systems/Lilum/Theme";
import PopUp from "../Component/Pop-up";

const FileViewer = ({ title, content , type, ...props }) => {
  const { theme } = useLilumTheme();

  //.txt = text :)
  return (
    <PopUp
      title={title}
      {...props}
      style={{
        backgroundColor: theme.sec,
        color: theme.text 
      }}
      handleStyle={{ color: theme.text }}
      bodyStyle="scroll-thin lilum-scroll"
    >
     {type === "text" && <pre >
        {content}
      </pre> }
      {
        type === "img" && 
        <div className="w-full h-full flex center">
          <img src={content} alt="Image not loaded :(" />
        </div>
  
      }
    </PopUp>
  );
};

export default FileViewer