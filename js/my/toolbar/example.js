// 创建工具栏实例
var myToolbar = ToolBar_Create();

// 添加左侧菜单
myToolbar.Add("首页", "/", "left");
myToolbar.Add("产品中心", "#", "left", [
        {sName: "软件产品", sUrl: "/products/software"},
        {sName: "硬件设备", sUrl: "/products/hardware"},
        {sName: "云服务", sUrl: "/products/cloud"},
        {sName: "解决方案", sUrl: "/products/solutions"}
]);

myToolbar.Add("服务支持", "#", "left", [
        {sName: "技术支持", sUrl: "/services/support"},
        {sName: "培训服务", sUrl: "/services/training"},
        {sName: "咨询顾问", sUrl: "/services/consulting"},
        {sName: "客户案例", sUrl: "/services/cases"}
]);

myToolbar.Add("关于我们", "/about", "left");

// 添加右侧菜单
myToolbar.Add("下载中心", "/downloads", "right");

myToolbar.Add("用户中心", "#", "right", [
        {sName: "个人资料", sUrl: "/user/profile"},
        {sName: "我的订单", sUrl: "/user/orders"},
        {sName: "消息通知", sUrl: "/user/messages"},
        {sName: "安全设置", sUrl: "/user/security"},
        {sName: "退出登录", sUrl: "/logout"}
]);

myToolbar.Add("帮助中心", "#", "right", [
        {sName: "使用教程", sUrl: "/help/tutorials"},
        {sName: "常见问题", sUrl: "/help/faq"},
        {sName: "API文档", sUrl: "/help/api"},
        {sName: "联系我们", sUrl: "/help/contact"}
]);

// 设置当前页面
myToolbar.SetCurrentName("首页");

// 写入工具栏
myToolbar.Write();

