import './App.css';
import { useState } from 'react';
import Routes from './Routes';
import { TabMenu } from 'primereact/tabmenu';
import { useHistory } from "react-router-dom";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  const history = useHistory();

  const items = [
    { label: 'Clientes', icon: 'pi pi-fw pi-home' },
    { label: 'Nuevo', icon: 'pi pi-fw pi-pencil' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const onChangeTab = (value) => {
    switch (value) {
      case 0:
        history.push('/');
        break;
      default:
        history.push('/form');
        break;
    }
    setActiveIndex(value)
  }

  return (
    <>
      <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => { onChangeTab(items.indexOf(e.value)); }} />
      <Routes />
    </>
  );
}

export default App;
