import './AppBody.css';
import FileNav from '../fileNavSidebar/FileNav';
import FileView from '../fileViewPane/FileView';

const AppBody = () => {
  return (
    <div className="AppBody">
      <FileNav />
      <FileView />
    </div>
  );
}

export default AppBody;