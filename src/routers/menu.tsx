import { useNavigate } from 'react-router-dom';
import { Menu, MenuProps } from 'antd';
import { menus, HOME_PATH } from './routes';
export default function Menus() {
  const navigate = useNavigate();
  const changeMenu: MenuProps['onClick'] = function(e) {
    console.log('e', e);
    navigate(e.key);
  }

  return (
    <Menu
      onClick={changeMenu}
      style={{ width: 256 }}
      defaultSelectedKeys={[HOME_PATH]}
      defaultOpenKeys={['rxjs']}
      mode="inline"
      items={menus}
    />
    // <ul className='menu'>
    //   {links.map((link) => {
    //     return (
    //       <li key={link.path}>
    //         <Link to={link.path}>{link.text}</Link>
    //       </li>
    //     );
    //   })}
    // </ul>
  );
}
