function ToolBar_Create()
{
	var obj = new Object();
	
	obj.aLeftNode = new Array();
	obj.aRightNode = new Array();
	obj.aLeftSubmenus = new Object();
	obj.aRightSubmenus = new Object();
	obj.sCurrentNodeName = "";
	
	obj.Add = function (sName, sUrl, sAlign, aSubmenuItems)
	{
		if (!sAlign)
		{
			sAlign = "left";
		}
		
		var oNode = new Object();
		oNode.sName = sName.trim();
		oNode.sUrl = sUrl.trim();
		oNode.hasSubmenu = (aSubmenuItems && aSubmenuItems.length > 0);
		
		if (sAlign == "left")
		{
			this.aLeftNode[this.aLeftNode.length] = oNode;
			if (oNode.hasSubmenu) {
				this.aLeftSubmenus[sName] = aSubmenuItems;
			}
		}
		else
		{
			this.aRightNode[this.aRightNode.length] = oNode;
			if (oNode.hasSubmenu) {
				this.aRightSubmenus[sName] = aSubmenuItems;
			}
		}
	}
  
	obj.SetCurrentName = function (sName)
	{
		this.sCurrentNodeName = sName;
	}
	
	obj.GetSubmenuHtml = function (aSubmenuItems, sParentName)
	{
		if (!aSubmenuItems || aSubmenuItems.length === 0) return '';
		
		var sMsg = '<div class="toolbar-submenu" data-parent="' + sParentName + '">';
		sMsg += '<div class="submenu-content">';
		
		for (var i = 0; i < aSubmenuItems.length; i++) {
			var item = aSubmenuItems[i];
			sMsg += '<a href="' + item.sUrl + '" class="submenu-item">';
			sMsg += item.sName;
			sMsg += '</a>';
		}
		
		sMsg += '</div>';
		sMsg += '</div>';
		
		return sMsg;
	}
  
	obj.GetHtml = function ()
	{
		var sMsg = '<div class="ToolBar" id="main-toolbar">';
		
		sMsg += "<ul class='toolbar-left'>";
		for (var i=0; i<this.aLeftNode.length; i++)
		{
			var node = this.aLeftNode[i];
			var isCurrent = (node.sName == this.sCurrentNodeName);
			var hasSubmenu = node.hasSubmenu;
			
			sMsg += '<li class="toolbar-item' + 
					(isCurrent ? ' current' : '') + 
					(hasSubmenu ? ' has-dropdown' : '') + '">';
			
			sMsg += '<a href="' + (hasSubmenu ? '#' : node.sUrl) + '" class="' + 
					(hasSubmenu ? 'dropdown-toggle' : '') + '">';
			sMsg += node.sName;
			if (hasSubmenu) {
				sMsg += '<span class="dropdown-icon">▼</span>';
			}
			sMsg += '</a>';
			
			if (hasSubmenu && this.aLeftSubmenus[node.sName]) {
				sMsg += this.GetSubmenuHtml(this.aLeftSubmenus[node.sName], node.sName);
			}
			
			sMsg += "</li>";
		}
		sMsg += "<li class='spacer'></li> </ul>";
		
		sMsg += '<ul class="toolbar-right">';
		for (var i=0; i<this.aRightNode.length; i++)
		{
			var node = this.aRightNode[i];
			var isCurrent = (node.sName == this.sCurrentNodeName);
			var hasSubmenu = node.hasSubmenu;
			
			sMsg += '<li class="toolbar-item' + 
					(isCurrent ? ' current' : '') + 
					(hasSubmenu ? ' has-dropdown' : '') + '">';
			
			sMsg += '<a href="' + (hasSubmenu ? '#' : node.sUrl) + '" class="' + 
					(hasSubmenu ? 'dropdown-toggle' : '') + '">';
			sMsg += node.sName;
			if (hasSubmenu) {
				sMsg += '<span class="dropdown-icon">▼</span>';
			}
			sMsg += '</a>';
			
			if (hasSubmenu && this.aRightSubmenus[node.sName]) {
				sMsg += this.GetSubmenuHtml(this.aRightSubmenus[node.sName], node.sName);
			}
			
			sMsg += "</li>";
		}
		sMsg += "</ul>";
		
		sMsg += "</div>";
		
		return sMsg;
	}

	obj.Write = function ()
	{
		document.write(this.GetHtml());
		
		// 等待DOM加载完成后初始化
		var self = this;
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', function() {
				self.initDropdowns();
			});
		} else {
			setTimeout(function() {
				self.initDropdowns();
			}, 100);
		}
	}
	
	obj.initDropdowns = function() {
		var dropdowns = document.querySelectorAll('.has-dropdown');
		
		dropdowns.forEach(function(dropdown) {
			var timeout = null;
			var submenu = dropdown.querySelector('.toolbar-submenu');
			
			if (!submenu) return;
			
			// 鼠标进入
			dropdown.addEventListener('mouseenter', function(e) {
				clearTimeout(timeout);
				hideAllDropdownsExcept(this);
				this.classList.add('dropdown-active');
				submenu.style.display = 'block';
				
				// 添加一个微小的延迟确保transition生效
				setTimeout(function() {
					submenu.classList.add('active');
				}, 10);
			});
			
			// 鼠标离开
			dropdown.addEventListener('mouseleave', function(e) {
				var self = this;
				timeout = setTimeout(function() {
					self.classList.remove('dropdown-active');
					submenu.classList.remove('active');
					
					// 等待过渡动画完成后隐藏
					setTimeout(function() {
						if (!self.classList.contains('dropdown-active')) {
							submenu.style.display = 'none';
						}
					}, 300);
				}, 150);
			});
			
			// 子菜单鼠标进入
			submenu.addEventListener('mouseenter', function(e) {
				clearTimeout(timeout);
				dropdown.classList.add('dropdown-active');
				this.classList.add('active');
			});
			
			submenu.addEventListener('mouseleave', function(e) {
				var self = this;
				var parent = dropdown;
				timeout = setTimeout(function() {
					parent.classList.remove('dropdown-active');
					self.classList.remove('active');
					
					setTimeout(function() {
						if (!parent.classList.contains('dropdown-active')) {
							self.style.display = 'none';
						}
					}, 300);
				}, 150);
			});
		});
		
		// 隐藏其他所有下拉菜单
		function hideAllDropdownsExcept(exceptElement) {
			var allDropdowns = document.querySelectorAll('.has-dropdown');
			allDropdowns.forEach(function(item) {
				if (item !== exceptElement) {
					item.classList.remove('dropdown-active');
					var sub = item.querySelector('.toolbar-submenu');
					if (sub) {
						sub.classList.remove('active');
						setTimeout(function() {
							if (!item.classList.contains('dropdown-active')) {
								sub.style.display = 'none';
							}
						}, 10);
					}
				}
			});
		}
	}
  
	return obj;
}
