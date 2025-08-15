import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';

import '../../styles/layout.css';
import '../../styles/sidebar.css';
import '../../styles/topbar.css';
import '../../styles/users.css';




export default function DashboardLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
