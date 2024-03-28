
export enum PageEnum {
    // 登录
    BASE_LOGIN = '/login',
    BASE_LOGIN_NAME = 'Login',
    // 首页
    BASE_HOME = '/home',
    BASE_HOME_NAME = 'Home',

    // 办公Office -> excel
    OFFICE = '/office',
    OFFICE_NAME = 'Office',
    OFFICE_EXPORT_EXCEL = '/office/exportExcel',
    OFFICE_EXPORT_EXCEL_NAME = 'Export-Excel',
    OFFICE_MERGE_HEADER_EXCLE = '/office/mergeHeaderExcle',
    OFFICE_MERGE_HEADER_EXCLE_NAME = 'Merge-Header-Excle',
    OFFICE_SELECT_EXCEL = '/office/selectExcel',
    OFFICE_SELECT_EXCEL_NAME = 'Select-Excel',
    OFFICE_UPLOAD_EXCEL = '/office/uploadExcel',
    OFFICE_UPLOAD_EXCEL_NAME = 'Upload-Excel',

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