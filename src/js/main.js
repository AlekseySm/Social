$('document').ready(function(){
  loadGoods();
});

(function($) {
$(function() {

  $('ul.navigator').on('click', 'li:not(.active)', function() {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('div.container').find('div.content').removeClass('active').eq($(this).index()).addClass('active');
  });

});
})(jQuery);

$(document).ready(function() { 
	$('#button').click( function(event){ 
		event.preventDefault(); 
		$('#overlay').fadeIn(400, 
		 	function(){ 
				$('#modal_form') 
					.css('display', 'block') 
					.animate({opacity: 1, top: '50%'}, 200); 
		});
	});
	
	$('#modal_close, #overlay').click( function(){ 
		$('#modal_form')
			.animate({opacity: 0, top: '45%'}, 200, 
				function(){ 
					$(this).css('display', 'none'); 
					$('#overlay').fadeOut(400); 
				}
			);
	});
});


function loadGoods(){
  /*загружаю*/

  $.getJSON('js/social.json', function (data) {
      // console.log(data)
      var out = '';
      for (var key in data){

			out += '<div class="social_box">';
			out += '<div class="social_box_status ' +data[key]['background']+ '">';
			out += '<svg  class="social_box_block" height="20" width="32">';
			out += '<use class="' +data[key]['icon']+ '" xlink:href="#' +data[key]['icon']+ '"></use>';
			out += '</svg>';
			out += '<p class="folowers">' +data[key]['folowers']+ '<br><span>FOLOWERS</span></p>';
			out += '<p class="growth">' +data[key]['status']+ '';
			out += '<span>';
			out += '<svg height="12" width="7" transform="' +data[key]['icon-status-down']+ '">';
			out += '<use class="' +data[key]['icon-status']+ '" xlink:href="#' +data[key]['icon-status']+ '"></use>';
			out += '</svg>';
			out += '</span>';
			out += '</p>';
			out += '</div>';
			out += '<div class="social_box_user">';
			out += '<div class="user_logo">';
			out += '<img src="img/' +data[key]['img']+ '" alt="">';
			out += '</div>';
			out += '<div class="user_info">';
		  out += '<h2>' +data[key]['social']+ '</h2>';
			out += '<p>' +data[key]['name']+ '</p>';
			out += '</div>';
			out += '</div>';
		  out += '</div>';

      }
      $('#list').html(out);
  });
}