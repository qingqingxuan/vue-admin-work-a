import { getMenuList } from '@/api/url'
import Mock from 'mockjs'

export const adminRoutes = [
  {
    menuUrl: '/system',
    menuName: '系统管理',
    iconPrefix: 'iconfont',
    icon: 'setting',
    parentPath: '',
    children: [
      {
        parentPath: '/system',
        menuUrl: '/system/department',
        menuName: '部门管理',
        badge: 'new',
        cacheable: true,
      },
      {
        parentPath: '/system',
        menuUrl: '/system/user',
        menuName: '用户管理',
        badge: 'dot',
      },
      {
        parentPath: '/system',
        menuUrl: '/system/role',
        menuName: '角色管理',
        badge: '12',
      },
      {
        parentPath: '/system',
        menuUrl: '/system/menu',
        menuName: '菜单管理',
        cacheable: true,
      },
    ],
  },
  {
    menuUrl: '/list',
    menuName: '列表页面',
    iconPrefix: 'iconfont',
    icon: 'detail',
    parentPath: '',
    children: [
      {
        parentPath: '/list',
        menuUrl: '/list/table-with-search',
        menuName: '表格搜索',
      },
      {
        parentPath: '/list',
        menuUrl: '/list/table-custom',
        menuName: '自定义表格',
      },
      {
        parentPath: '/list',
        menuUrl: '/list/list',
        menuName: '普通列表',
      },
      {
        parentPath: '/list',
        menuUrl: '/list/card-list',
        menuName: '卡片列表',
      },
    ],
  },
  {
    menuUrl: '/form',
    menuName: '表单页面',
    badge: 'dot',
    iconPrefix: 'iconfont',
    icon: 'file-text',
    parentPath: '',
    children: [
      {
        parentPath: '/form',
        menuUrl: '/form/base-form-view',
        menuName: '动态表单',
        cacheable: true,
      },
      {
        parentPath: '/form',
        menuUrl: '/form/advance-form',
        menuName: '高级表单',
        cacheable: true,
      },
      {
        parentPath: '/form',
        menuUrl: '/form/step-form',
        menuName: '分步表单',
      },
    ],
  },
  {
    menuUrl: '/other',
    menuName: '功能/组件',
    iconPrefix: 'iconfont',
    icon: 'appstore',
    parentPath: '',
    children: [
      {
        parentPath: '/other',
        menuUrl: '/other/chart',
        menuName: '图表',
        children: [
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/icon',
            menuName: '图标',
            children: [
              {
                parentPath: '/other/chart/icon',
                menuUrl: '/other/chart/icon/icon-font',
                menuName: 'IconFont',
              },
              {
                parentPath: '/other/chart/icon',
                menuUrl: '/other/chart/icon/xicons',
                menuName: 'xicons',
              },
            ],
          },
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/echarts',
            menuName: 'echarts',
          },
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/icon-selector',
            menuName: '图标选择器',
          },
        ],
      },
      {
        parentPath: '/other',
        menuUrl: '/other/print',
        menuName: '打印',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/badge',
        menuName: '消息提示',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/clipboard',
        menuName: '剪贴板',
      },
      {
        parentPath: '/other',
        menuUrl: 'http://qingqingxuan.gitee.io/work-p-site',
        menuName: '外链',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/qrcode',
        menuName: '二维码',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/css-animation',
        menuName: 'CSS动画',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/flow',
        menuName: '流程图',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/player',
        menuName: '视频播放器',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/password-strong',
        menuName: '密码强度',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/cropper',
        menuName: '图片裁剪',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/iframe',
        menuName: '内嵌iframe',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/big-preview',
        menuName: '大图预览',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/city-selector',
        menuName: '省市区选择器',
      },
    ],
  },
  {
    menuUrl: '/result',
    menuName: '结果页面',
    iconPrefix: 'iconfont',
    icon: 'file-unknown',
    parentPath: '',
    children: [
      {
        parentPath: '/result',
        menuUrl: '/result/success',
        menuName: '成功页面',
      },
      {
        parentPath: '/result',
        menuUrl: '/result/fail',
        menuName: '失败页面',
      },
    ],
  },
  // {
  //   menuUrl: '/exception',
  //   menuName: '异常页面',
  //   iconPrefix: 'iconfont',
  //   icon: 'error',
  //   parentPath: '',
  //   children: [
  //     {
  //       parentPath: '/exception',
  //       menuUrl: '/exception/404',
  //       menuName: '404页面',
  //     },
  //     {
  //       parentPath: '/exception',
  //       menuUrl: '/exception/403',
  //       menuName: '403页面',
  //     },
  //     {
  //       parentPath: '/exception',
  //       menuUrl: '/exception/500',
  //       menuName: '500页面',
  //     },
  //   ],
  // },
  {
    menuUrl: '/editor',
    menuName: '编辑器',
    badge: '12',
    iconPrefix: 'iconfont',
    icon: 'edit',
    parentPath: '',
    children: [
      {
        parentPath: '/editor',
        menuUrl: '/editor/rich-text',
        menuName: '富文本',
      },
      {
        parentPath: '/editor',
        menuUrl: '/editor/markdown',
        menuName: 'markdown',
      },
    ],
  },
  {
    menuUrl: '/excel',
    menuName: 'Excel',
    iconPrefix: 'iconfont',
    icon: 'file-excel',
    parentPath: '',
    children: [
      {
        parentPath: '/excel',
        menuUrl: '/excel/export-excel',
        menuName: '导出Excel',
      },
      {
        parentPath: '/excel',
        menuUrl: '/excel/export-rows-excel',
        menuName: '导出选中行',
      },
    ],
  },
  {
    menuUrl: '/draggable',
    menuName: '拖拽',
    iconPrefix: 'iconfont',
    icon: 'interation',
    parentPath: '',
    children: [
      // {
      //   parentPath: '/draggable',
      //   menuUrl: '/draggable/dialog-draggable',
      //   menuName: '拖拽对话框',
      // },
      {
        parentPath: '/draggable',
        menuUrl: '/draggable/card-draggable',
        menuName: '卡片拖拽',
        cacheable: true,
      },
    ],
  },
  {
    menuUrl: '/next',
    menuName: '多级菜单',
    iconPrefix: 'iconfont',
    icon: 'Partition',
    parentPath: '',
    children: [
      {
        parentPath: '/next',
        menuUrl: '/next/menu1',
        menuName: 'menu-1',
        cacheable: true,
      },
      {
        parentPath: '/next',
        menuUrl: '/next/menu2',
        menuName: 'menu-2',
        children: [
          {
            parentPath: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-1',
            menuName: 'menu-2-1',
            children: [
              {
                parentPath: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-1',
                menuName: 'menu-2-1-1',
                cacheable: true,
              },
              {
                parentPath: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-2',
                menuName: 'menu-2-1-2',
              },
            ],
          },
          {
            parentPath: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-2',
            menuName: 'menu-2-2',
            cacheable: true,
          },
        ],
      },
    ],
  },
  {
    menuUrl: '/map',
    menuName: '地图',
    iconPrefix: 'iconfont',
    icon: 'location',
    children: [
      {
        parentPath: '/map',
        menuUrl: '/map/gaode',
        menuName: '高德地图',
      },
      {
        parentPath: '/map',
        menuUrl: '/map/baidu',
        menuName: '百度地图',
      },
    ],
  },
  {
    menuUrl: '/project',
    menuName: '项目信息',
    iconPrefix: 'iconfont',
    icon: 'detail',
    children: [
      {
        parentPath: '/project',
        menuUrl: '/project/infomation',
        menuName: '项目依赖',
      },
    ],
  },
]
export const editorRoutes = [
  {
    menuUrl: '/other',
    menuName: '功能/组件',
    iconPrefix: 'iconfont',
    icon: 'appstore',
    parentPath: '',
    children: [
      {
        parentPath: '/other',
        menuUrl: '/other/chart',
        menuName: '图表',
        children: [
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/icon',
            menuName: '图标',
            children: [
              {
                parentPath: '/other/chart/icon',
                menuUrl: '/other/chart/icon/icon-font',
                menuName: 'IconFont',
              },
              {
                parentPath: '/other/chart/icon',
                menuUrl: '/other/chart/icon/xicons',
                menuName: 'xicons',
              },
            ],
          },
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/echarts',
            menuName: 'echarts',
          },
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/icon-selector',
            menuName: '图标选择器',
          },
        ],
      },
      {
        parentPath: '/other',
        menuUrl: '/other/print',
        menuName: '打印',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/badge',
        menuName: '消息提示',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/clipboard',
        menuName: '剪贴板',
      },
      {
        parentPath: '/other',
        menuUrl: 'http://qingqingxuan.gitee.io/work-p-site',
        menuName: '外链',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/qrcode',
        menuName: '二维码',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/css-animation',
        menuName: 'CSS动画',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/flow',
        menuName: '流程图',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/player',
        menuName: '视频播放器',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/password-strong',
        menuName: '密码强度',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/cropper',
        menuName: '图片裁剪',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/iframe',
        menuName: '内嵌iframe',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/big-preview',
        menuName: '大图预览',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/city-selector',
        menuName: '省市区选择器',
      },
    ],
  },
  {
    menuUrl: '/next',
    menuName: '多级菜单',
    iconPrefix: 'iconfont',
    icon: 'Partition',
    parentPath: '',
    children: [
      {
        parentPath: '/next',
        menuUrl: '/next/menu1',
        menuName: 'menu-1',
        cacheable: true,
      },
      {
        parentPath: '/next',
        menuUrl: '/next/menu2',
        menuName: 'menu-2',
        children: [
          {
            parentPath: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-1',
            menuName: 'menu-2-1',
            children: [
              {
                parentPath: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-1',
                menuName: 'menu-2-1-1',
                cacheable: true,
              },
              {
                parentPath: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-2',
                menuName: 'menu-2-1-2',
              },
            ],
          },
          {
            parentPath: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-2',
            menuName: 'menu-2-2',
            cacheable: true,
          },
        ],
      },
    ],
  },
  {
    menuUrl: '/map',
    menuName: '地图',
    iconPrefix: 'iconfont',
    icon: 'location',
    children: [
      {
        parentPath: '/map',
        menuUrl: '/map/gaode',
        menuName: '高德地图',
      },
      {
        parentPath: '/map',
        menuUrl: '/map/baidu',
        menuName: '百度地图',
      },
    ],
  },
  {
    menuUrl: '/project',
    menuName: '项目信息',
    iconPrefix: 'iconfont',
    icon: 'detail',
    children: [
      {
        parentPath: '/project',
        menuUrl: '/project/infomation',
        menuName: '项目依赖',
      },
    ],
  },
]

Mock.mock(RegExp(getMenuList), 'post', function () {
  return Mock.mock({ code: 200, data: adminRoutes, msg: '获取菜单列表成功' })
})
