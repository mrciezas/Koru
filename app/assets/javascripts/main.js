/* 

=========================================================================== 
Koru GPL Source Code 
Copyright (C) 2017 Tekton Labs
This file is part of the Koru GPL Source Code.
Koru Source Code is free software: you can redistribute it and/or modify 
it under the terms of the GNU General Public License as published by 
the Free Software Foundation, either version 3 of the License, or 
(at your option) any later version. 

Koru Source Code is distributed in the hope that it will be useful, 
but WITHOUT ANY WARRANTY; without even the implied warranty of 
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the 
GNU General Public License for more details. 

You should have received a copy of the GNU General Public License 
along with Koru Source Code. If not, see <http://www.gnu.org/licenses/>. 
=========================================================================== 

*/

//= require jquery.slimscroll.min

document.addEventListener("turbolinks:load", function() {

  /*  TOP NAVIGATION AND LAYOUT  */

  $('.btn-toggle-fullwidth').on('click', function() {
    if(!$('body').hasClass('layout-fullwidth')) {
      $('body').addClass('layout-fullwidth');

    } else {
      $('body').removeClass('layout-fullwidth');
      $('body').removeClass('layout-default'); // also remove default behaviour if set
    }

    $(this).find('.glyphicon').toggleClass('glyphicon-circle-arrow-left glyphicon-circle-arrow-right');

    if($(window).innerWidth() < 1025) {
      if(!$('body').hasClass('offcanvas-active')) {
        $('body').addClass('offcanvas-active');
      } else {
        $('body').removeClass('offcanvas-active');
      }
    }
  });

  $(window).on('load', function() {
    if($(window).innerWidth() < 1025) {
      $('.btn-toggle-fullwidth').find('.icon-arrows')
      .removeClass('icon-arrows-move-left')
      .addClass('icon-arrows-move-right');
    }

    // adjust right sidebar top position
    $('.right-sidebar').css('top', $('.navbar').innerHeight());

    // if page has content-menu, set top padding of main-content
    if($('.has-content-menu').length > 0) {
      $('.navbar + .main-content').css('padding-top', $('.navbar').innerHeight());
    }

    // for shorter main content
    if($('.main').height() < $('#sidebar-nav').height()) {
      $('.main').css('min-height', $('#sidebar-nav').height());
    }
  });

  /*  SIDEBAR NAVIGATION  */

  $('.sidebar a[data-toggle="collapse"]').on('click', function() {
    if($(this).hasClass('collapsed')) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });

  if( $('.sidebar-scroll').length > 0 ) {
    $('.sidebar-scroll').slimScroll({
      height: '100%',
      wheelStep: 10,
    });
  }

  /*  PANEL FUNCTIONS  */

  // panel remove
  $('.panel .btn-remove').click(function(e){

    e.preventDefault();
    $(this).parents('.panel').fadeOut(300, function(){
      $(this).remove();
    });
  });

  // panel collapse/expand
  var affectedElement = $('.panel-body');

  $('.panel .btn-toggle-collapse').clickToggle(
    function(e) {
      e.preventDefault();

      // if has scroll
      if( $(this).parents('.panel').find('.slimScrollDiv').length > 0 ) {
        affectedElement = $('.slimScrollDiv');
      }

      $(this).parents('.panel').find(affectedElement).slideUp(300);
      $(this).find('i.glyphicon-chevron-up').toggleClass('glyphicon-chevron-down');
    },
    function(e) {
      e.preventDefault();

      // if has scroll
      if( $(this).parents('.panel').find('.slimScrollDiv').length > 0 ) {
        affectedElement = $('.slimScrollDiv');
      }

      $(this).parents('.panel').find(affectedElement).slideDown(300);
      $(this).find('i.glyphicon-chevron-up').toggleClass('glyphicon-chevron-down');
    }
  );

  /*  PANEL SCROLLING  */

  if( $('.panel-scrolling').length > 0) {
    $('.panel-scrolling .panel-body').slimScroll({
      height: '430px',
      wheelStep: 10,
    });
  }

  if( $('#panel-scrolling-demo').length > 0) {
    $('#panel-scrolling-demo .panel-body').slimScroll({
      height: '175px',
      wheelStep: 10,
    });
  }

  /*  TODO LIST  */

  $('.todo-list input').change( function() {
    if( $(this).prop('checked') ) {
      $(this).parents('li').addClass('completed');
    }else {
      $(this).parents('li').removeClass('completed');
    }
  });

  /* TOASTR NOTIFICATION  */

  if($('#toastr-demo').length > 0) {
    toastr.options.timeOut = "false";
    toastr.options.closeButton = true;
    toastr['info']('Hi there, this is notification demo with HTML support. So, you can add HTML elements like <a href="#">this link</a>');

    $('.btn-toastr').on('click', function() {
      $context = $(this).data('context');
      $message = $(this).data('message');
      $position = $(this).data('position');

      if($context == '') {
        $context = 'info';
      }

      if($position == '') {
        $positionClass = 'toast-left-top';
      } else {
        $positionClass = 'toast-' + $position;
      }

      toastr.remove();
      toastr[$context]($message, '' , { positionClass: $positionClass });
    });

    $('#toastr-callback1').on('click', function() {
      $message = $(this).data('message');

      toastr.options = {
        "timeOut": "300",
        "onShown": function() { alert('onShown callback'); },
        "onHidden": function() { alert('onHidden callback'); }
      }

      toastr['info']($message);
    });

    $('#toastr-callback2').on('click', function() {
      $message = $(this).data('message');

      toastr.options = {
        "timeOut": "10000",
        "onclick": function() { alert('onclick callback'); },
      }

      toastr['info']($message);

    });

    $('#toastr-callback3').on('click', function() {
      $message = $(this).data('message');

      toastr.options = {
        "timeOut": "10000",
        "closeButton": true,
        "onCloseClick": function() { alert('onCloseClick callback'); }
      }

      toastr['info']($message);
    });
  }
});

// toggle function
$.fn.clickToggle = function( f1, f2 ) {
  return this.each( function() {
    var clicked = false;
    $(this).bind('click', function() {
      if(clicked) {
        clicked = false;
        return f2.apply(this, arguments);
      }

      clicked = true;
      return f1.apply(this, arguments);
    });
  });

}

