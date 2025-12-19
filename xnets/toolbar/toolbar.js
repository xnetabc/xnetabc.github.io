var toolbar = ToolBar_Create();

// 添加普通菜单项
toolbar.Add("首页", "/index.htm", "left");
toolbar.Add("下载", "/xnets/download/download.htm", "left");
toolbar.Add("关于", "/xnets/about/about.htm", "right");

toolbar.SetCurrentName(current_page);

toolbar.Write();

