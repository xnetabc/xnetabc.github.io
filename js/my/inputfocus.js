
<!--//--><![CDATA[//><!--

sfFocus = function()
{
	
	var sfEls = document.getElementsByTagName("INPUT");
	
	for (var i=0; i<sfEls.length; i++)
	{
		sfEls[i].InputFocus_onfocus = sfEls[i].onfocus;
		sfEls[i].onfocus = function()
		{
			this.className+=" sffocus";
			this.InputFocus_onfocus();
		}
		
		sfEls[i].InputFocus_onblur = sfEls[i].onblur;
		sfEls[i].onblur = function()
		{
			this.className=this.className.replace(new RegExp(" sffocus\\b"), "");
			this.InputFocus_onblur();
		}
	}
}

AddEvent("load", sfFocus);

//--><!]]>
