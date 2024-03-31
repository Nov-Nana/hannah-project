
export enum PageEnum {
    // 登录
    BASE_LOGIN = '/login',
    BASE_LOGIN_NAME = 'Login',
    // 首页
    BASE_HOME = '/home',
    BASE_HOME_NAME = 'Home',

    // 办公Office -> excel / table
    OFFICE = '/office',
    OFFICE_NAME = 'Office',
    OFFICE_EXPORT_EXCEL = '/office/exportExcel',
    OFFICE_EXPORT_EXCEL_NAME = 'Export-Excel',
    OFFICE_UPLOAD_EXCEL = '/office/uploadExcel',
    OFFICE_UPLOAD_EXCEL_NAME = 'Upload-Excel',
    TABLE_DRAG = '/office/dragTable',
    TABLE_DRAG_NAME = 'DRAG-TABLE',

    // 项目
    PROJECT='/project',
    PROJECT_NAME= 'Project',
    PROJECT_ALL = '/project/all',
    PROJECT_ALL_NAME = 'ALL-PROJECT',

    // 其他
    OTHER = '/other',
    OTHER_NAME = 'Other',
    OTHER_3DHOVEREFFECT = '/other/3DHoverEffect',
    OTHER_3DHOVEREFFECT_NAME = '3D-Hover-Effect',

    //重定向
    REDIRECT = '/redirect',
    REDIRECT_NAME = 'Redirect',
    RELOAD = '/reload',
    RELOAD_NAME = 'Reload',
    // 错误
    ERROR_PAGE_NAME_403 = 'ErrorPage403',
    ERROR_PAGE_NAME_404 = 'ErrorPage404',
    ERROR_PAGE_NAME_500 = 'ErrorPage500',

}

export enum ChartEnum{
    // 图表
    CHART_HOME = '/chart/home/:id(.*)*',
    CHART_HOME_NAME = 'Chart-Home',
}