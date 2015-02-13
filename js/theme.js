$(document).ready(function(){
	
    var ww	= $(window),
		wp	= $('.wrapper'),
		sb	= $('.sidebar'),
		fl  = $('.filter-left a');
	
	
	//anchors corresponding to menu items
	var m_items  = $(fl);

	var scrollItems = m_items.map(function(){
		  var item = $($(this).attr("href"));
		  if (item.length) { return item; }
	});
	
	var lastId;
	
	//on scroll add class
	$(ww).scroll(function(){
		
		var fromTop = $(this).scrollTop() + 20;

		var cur = scrollItems.map(function(){
			if ($(this).offset().top < fromTop)
			return this;
		});

		//get the id of the current element
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : "get_first";
		
		if (lastId !== id) {
			lastId = id;
			
			//set/remove active class
			m_items.parent().removeClass("active")
				   .end().filter("[href=#" + id + "]")
				   .parent().addClass("active");
		}
		
		//add class to first element offset-fix
		if(id == "get_first"){
			$(m_items[0]).parent().addClass("active");
		}
		
	}); //end scroll items...
	
	//trigger menu
	$(".trigger").on("click",function(e){
		$(sb).addClass("s_animate");
		if($("html").hasClass('offc')){
			$("html").removeClass('offc');
		}else{
			$("html").addClass('offc');
		}
		e.preventDefault();
	});
	
	$(window).resize(function(e){
		if (window.innerWidth > 800) {
			$("html").removeClass("offc");
			$(sb).removeClass("s_animate");
		}
	});
	
	$(fl).on("click", function(e){
		$("html").removeClass("offc");
		var $this = $(this);
		if(window.innerWidth < 800){
			setTimeout(function(){
				scroll_to($this, "click", 500);
			},500);
		}else{
			scroll_to($this, "click", 500);
		}
		
		e.preventDefault();
	});
	
	//scroll to 
	function scroll_to(elem, action, speed){
		
		var a = elem, a = parseInt( $(a.attr("href")).position().top);
		
		$("html, body").stop().animate({

			scrollTop: a

		}, speed, "easeOutQuart");

	};
	
	// modal
	$(".link").dcModal(
		{
			ajax: true, 
			effect: "right"
		}
	);

	//tool tips
	$('.dctip').dcTip({background: "#eee", color: "#212"});
	
	
});