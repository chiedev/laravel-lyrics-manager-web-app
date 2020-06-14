function showTab(req){
	req.css({'display':'inline-block'})
}

function resizeTab(type,req,target){
	/**
		PARAM 1
				=> 'nav-tab'			Resize navigation tab
		PARAM 2
				=> 1 - 100				Set the overall width of tabs **all tabs together
		PARAM 3
				=> element				nav elements you want to resize
	**/
	var thisSize
	tabs_count = target.size()

	//RESIZING
	if (type == 'nav-tab'){
		thisSize = (req / tabs_count) + '%'
		target.css({
			'width': 'calc(' + thisSize + ' - ' + tabs_count + 'px)',
			'padding': '0',
			'left': '-'+tabs_count+'px'
		})

		target.parent().css({
			'padding': '0 calc(' + ((tabs_count * tabs_count) * tabs_count) + 'px)',
			'width': 'calc(100% - ' + ((tabs_count * tabs_count) * tabs_count) + 'px)',
			'font-size':'0'
		})
	}

}

$(document).ready(function(){
	var target
	var tabs_count = 0

	//GENERATE ID
	$('.tabs').each(function(){
		tabs_count++
		target = $(this).attr({'id':'tab_'+tabs_count})
		//hide all panels that are not active
		$('.tabs .panels content').css({'display':'none'})
		if ($('.navs',$(this)).attr('data-size')){
			resizeTab('nav-tab',$('.navs',$(this)).attr('data-size'),$('.navs .tab',$(this)))
		}
		else{
			resizeTab('nav-tab',10,$('.navs .tab',$(this)))
		}
	});

	//INITIAL ACTIVE TAB
	$('.tabs .navs .tab nav.active').each(function(){
		//Get target id
		target = $(this).parent().parent().parent().attr('id')

		//show initial active tab
		var this_tab = $('#'+target+'.tabs .panels content[role="' + $(this).attr('role') + '"]')
		showTab(this_tab)
	})
	
	//SELECTING WHICH TAB IS ACTIVE
	$('.tabs .navs .tab').on('click',function(){
		//Get target id
		target = $('nav',this).parent().parent().parent().attr('id')

		//disable all tabs under target ID
		$('#'+target+'.tabs .navs .tab nav').removeClass('active')
		$('#'+target+'.tabs .panels content').css({'display':'none'})
		
		//show active tab
		$('nav',this).toggleClass('active')
		var this_tab = $('#'+target+'.tabs .panels content[role="' + $('nav',this).attr('role') + '"]')
		showTab(this_tab)
	})


});

