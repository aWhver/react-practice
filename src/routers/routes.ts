import type { MenuProps } from 'antd';
export const HOME_PATH = 'rxjs/home';
export const DRAG_PATH = 'rxjs/drag';
export const COMBINE_PATH = 'rxjs/combine';
export const BIG_FILE_UPLOAD_PATH = 'file/big-file-upload';
// export const links = [
//   {
//     text: 'home',
//     path: HOME_PATH,
//   },
//   {
//     text: '大文件上传',
//     path: FILE_UPLOAD_PATH,
//   },
// ];

type MenuItem = Required<MenuProps>['items'][number];

export const menus: MenuItem[] = [
  {
    key: 'rxjs',
    label: 'rxjs',
    children: [
      {
        key: HOME_PATH,
        label: 'home',
      },
      {
        key: DRAG_PATH,
        label: '拖拽',
      },
      {
        key: COMBINE_PATH,
        label: 'combine',
      },
    ],
  },
  {
    key: 'file',
    label: '文件',
    children: [
      {
        key: BIG_FILE_UPLOAD_PATH,
        label: '大文件上传',
      },
    ]
  }
];
