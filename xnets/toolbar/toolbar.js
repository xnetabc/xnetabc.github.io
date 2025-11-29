var toolbar = ToolBar_Create();
toolbar.AddList("首页@/,下载@/xnets/download/download.htm");
toolbar.AddList("关于@/xnets/about/about.htm", "right");
toolbar.SetCurrentName(current_page);
toolbar.Write();

