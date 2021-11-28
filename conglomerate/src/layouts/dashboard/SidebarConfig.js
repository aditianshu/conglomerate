import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import gridOutline from '@iconify/icons-eva/grid-outline'

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: getIcon(pieChart2Fill)
  // },
  {
    title: 'teams',
    path: '/dashboard/teams',
    icon: getIcon(gridOutline)
  },
  {
    title: 'Students',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon(fileTextFill)
  // }
];

export default sidebarConfig;
