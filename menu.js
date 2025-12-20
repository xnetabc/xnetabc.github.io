var toolbar = ToolBar_Create();

// 添加普通菜单项
toolbar.Add("首页", "/index.htm", "left");
toolbar.Add("MGW", "/mgw/index.htm", "left");
toolbar.Add("SPF", "/spf/index.htm", "left");
toolbar.Add("KLC", "/klc/index.htm", "left");
toolbar.Add("XNETS", "/xnets/index.htm", "left");

toolbar.SetCurrentName(menu_current_page);

toolbar.Write();

