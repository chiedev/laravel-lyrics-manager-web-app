var lock_scroller = false;
var all_applicatures_loaded = false;
var TYPE_ERROR = 'error';
var TYPE_SUCCESS = 'success';
var already_voted = false;
var already_favourite = false;
var already_comment_loaded = false;
var rate_btn = false;
var ver_w = 114;
var old_comments_link = 'first';
var chk_view_coms_ready = 0;
var votes_arr = new Array();
votes_arr[0] = 'please rate';
votes_arr[1] = 'poor';
votes_arr[2] = 'not so good';
votes_arr[3] = 'worth learning';
votes_arr[4] = 'accurate';
votes_arr[5] = 'excellent!';
var current_fontsize_counter = 0;
var default_fontsize = 12;
var current_fontsize = 12;
var scroll_value_duration = 100;
var is_transpose_locked = false;
var first_link = '';
var ui_dragable = 1000;
var SF_PATH = '//img' + ug_serv + '/js/soundfont';
var isAudioSupported = false;
var q = 0;
var accords = new Array();
accords[1] = 'C';
accords[2] = 'C#';
accords[3] = 'D';
accords[4] = 'D#';
accords[5] = 'E';
accords[6] = 'F';
accords[7] = 'F#';
accords[8] = 'G';
accords[9] = 'G#';
accords[10] = 'A';
accords[11] = 'A#';
accords[12] = 'B';
var cnt = accords.length - 1;
var applicature_animation = false;
var loc = document.location.toString();
var uniq_cnt = 0;
var vote_txt = $('.cnt_rate').html();
var current_transpose = 0;
var saved_transposed_states = {
};
var show_bad_comments = false;
if (typeof applicature === 'undefined') {
  var applicature = {
  }
}
function message_popup(d, b) {
  $('#popup_info_msg').remove();
  var c = ((b == TYPE_ERROR) ? 'error' : 'success');
  var a = 2000;
  if (c == TYPE_SUCCESS) {
    a = 700
  }
  $('<div id="popup_info_msg" class="' + c + '"><b></b><div>' + d + '</div></div>').appendTo('body').fadeIn(300).delay(a).fadeOut(500)
}
function stars_fill(b, a) {
  $('div.voting').each(function (c) {
    $(this).children('a').removeClass('cur hovered');
    $(this).children('a:lt(' + b + ')').addClass(a ? 'hovered' : 'cur')
  });
  $('div.vote-success').html(votes_arr[b])
}
function increase_votes(a) {
  current_rating_count += a;
  $('div.v_c').text(' x ' + current_rating_count)
}
function initFontsize() {
  var a = parseInt($.cookie('tabs_font_size'));
  if ((a != 0) && (a <= 5) && (a >= - 2)) {
    onFontsizeClick(a)
  }
}
function widgetScrollValue(i, d, c, k) {
  var f = k > 0 ? '+' : '';
  var g = d > 0 ? 'down' : 'up';
  var j = d < 0 ? 'down' : 'up';
  var h = $('#' + i + '_content_val');
  var b = $('#' + i + '_val');
  var a = $('#' + i);
  if (k == 0) {
    b.hide('drop', {
      direction: g
    }, scroll_value_duration, function () {
      h.text(0);
      a.show('drop', {
        direction: j
      }, scroll_value_duration)
    });
    return
  }
  if (c != 0) {
    h.hide('drop', {
      direction: g
    }, scroll_value_duration, function () {
      h.text(f + k);
      h.show('drop', {
        direction: j
      }, scroll_value_duration)
    })
  } else {
    a.hide('drop', {
      direction: g
    }, scroll_value_duration, function () {
      h.text(f + k);
      b.show('drop', {
        direction: j
      }, scroll_value_duration)
    })
  }
}
function onTransposeClick(b) {
  if (is_transpose_locked) {
    return
  }
  if (b == 0) {
    return
  }
  is_transpose_locked = true;
  var a = current_transpose;
  current_transpose = (current_transpose + b) % 12;
  b = (current_transpose == 0) ? - a : b;
  save_transpose_state_to_local_storage();
  transpose(acc_tuning, b, function () {
    $('#cont span').each(function () {
      var f = $(this);
      var c = f.text();
      for (var d in applicature) {
        if (applicature[d]['old_ch'] == c) {
          f.text(d);
          break
        }
      }
    });
    create_chords_list();
    $('div.chord-variations-wrapper.ui-draggable').each(function () {
      var f = $(this);
      var c = f.find('div.diag_head').text();
      for (var d in applicature) {
        if (applicature[d]['old_ch'] == c) {
          f.html(create_applicature_widget(d, acc_tuning).html());
          break
        }
      }
    })
  }, {
  });
  widgetScrollValue('transpose', b, a, current_transpose)
}
function save_transpose_state_to_local_storage() {
  if ((isLocalStorageAvailable() != false) && (isJsonAvailable() != false)) {
    if (current_transpose != 0) {
      saved_transposed_states[tabid] = current_transpose
    } else {
      if (saved_transposed_states[tabid] != null) {
        delete saved_transposed_states[tabid]
      }
    }
    localStorage.setItem('tabs_transpose_states', JSON.stringify(saved_transposed_states))
  }
}
function get_transpose_state_from_local_storage() {
  if ((isLocalStorageAvailable() != false) && (isJsonAvailable() != false)) {
    var b = localStorage.getItem('tabs_transpose_states');
    try {
      if ((b != null) && (b.length > 2)) {
        saved_transposed_states = JSON.parse(b);
        if (saved_transposed_states[tabid] != null) {
          onTransposeClick(saved_transposed_states[tabid])
        }
      } else {
        saved_transposed_states = {
        }
      }
    } catch (a) {
      saved_transposed_states = {
      };
      localStorage.setItem('tabs_transpose_states', JSON.stringify(saved_transposed_states))
    }
  }
}
function onFontsizeClick(c) {
  if (c == 0) {
    return
  }
  var b = current_fontsize_counter + c;
  if (b < - 2) {
    return
  }
  if (b > 5) {
    return
  }
  var a = current_fontsize_counter;
  ga_track_event(['_trackEvent',
  'Tab Page',
  'Font Size',
  'Font Size ' + (c > 0 ? 'Plus' : 'Minus')]);
  current_fontsize_counter = b;
  current_fontsize = current_fontsize + 2 * c;
  $('#cont').children('pre').css('font-size', current_fontsize + 'px');
  $(document).trigger('changefontsize');
  $.cookie('tabs_font_size', current_fontsize_counter, {
    expires: 365,
    path: '/',
    domain: 'tabs' + ug_serv
  });
  widgetScrollValue('fontsize', c, a, current_fontsize_counter)
}
function onVariationsClick(a) {
  if (!all_applicatures_loaded) {
    transpose(acc_tuning, 0, function (b) {
      onAllVariationsLoaded(function () {
        showVariations(b)
      })
    }, a)
  } else {
    showVariations(a)
  }
}
function onAllVariationsLoaded(b, a) {
  $('div.chord-variations-wrapper').each(function () {
    var d = $(this);
    var c = d.find('div.diag_head').text();
    c = Chord.convertChordName(c);
    if (c !== undefined) {
      var f = build_variations_list(applicature[c], acc_tuning);
      d.find('div.chords_versions_handler').html(render_variations_list(f) + render_variations_controls(f))
    }
  });
  b(a)
}
function showVariations(b) {
  var k = b.button;
  var g = k.closest('div.chord-variations-wrapper');
  if (ui_dragable != g.css('z-index')) {
    ui_dragable++;
    g.css('z-index', ui_dragable)
  }
  var c = g.parents('#chords_list').get(0) != undefined;
  var i = c ? 'Display Chords' : 'Highlight chords';
  i += ' Variations';
  i += k.parent().children('.chords_versions_handler').is(':visible') ? ' Hide' : ' Show';
  ga_track_event(['_trackEvent',
  'Tab Page',
  'Chords',
  i]);
  if (k.parent().children('.chords_versions_handler').is(':visible')) {
    k.parent().children('.chords_versions_handler').fadeOut(1);
    k.parent().delay(100).css('width', '0');
    if (g.hasClass('ui_not-draggable')) {
      k.parent().parent().removeClass('hover')
    }
  } else {
    k.parent().children('.chords_versions_handler').fadeIn(100);
    k.parent().css('width', '214px');
    var f = k.parent().find('div.chords_versions_scroller_moveable');
    var h = f.find('div.cont_chrd').length;
    var a = ver_w * h;
    var j = - (a - 214);
    f.css('width', a + 'px');
    var d = parseInt(f.css('margin-left'));
    if (d == 0) {
      k.parent().find('div.chords_versions_controls_left').fadeOut(100)
    } else {
      if (d == j) {
        k.parent().find('div.chords_versions_controls_right').fadeOut(100)
      }
    }
    k.parent().parent().addClass('hover')
  }
}
function str_pad(c, h, g, d) {
  var f = '',
  a;
  var b = function (l, j) {
    var m = '',
    k;
    while (m.length < j) {
      m += l
    }
    m = m.substr(0, j);
    return m
  };
  if (d != 'STR_PAD_LEFT' && d != 'STR_PAD_RIGHT' && d != 'STR_PAD_BOTH') {
    d = 'STR_PAD_RIGHT'
  }
  if ((a = h - c.length) > 0) {
    if (d == 'STR_PAD_LEFT') {
      c = b(g, a) + c
    } else {
      if (d == 'STR_PAD_RIGHT') {
        c = c + b(g, a)
      } else {
        if (d == 'STR_PAD_BOTH') {
          f = b(g, Math.ceil(a / 2));
          c = f + c + f;
          c = c.substr(0, h)
        }
      }
    }
  }
  return c
}
function modulate_accord(h, g) {
  g = parseInt(g, 10);
  if (h.indexOf('/') != - 1) {
    var b = h.split('/');
    if (b[1] != '9') {
      for (var f = 0; f < b.length; f++) {
        b[f] = modulate_accord(b[f], g)
      }
      return b.join('/')
    }
  }
  var c = h.charAt(0).toUpperCase() + h.substring(1);
  if (c.charAt(0) == 'H') {
    c = 'B' + c.substring(1)
  }
  if (c.charAt(0) == 'B' && c.indexOf('#') != - 1) {
    c = c.replace('#', '');
    c = 'C' + c.substring(1)
  }
  if (c.charAt(0) == 'E' && c.indexOf('#') != - 1) {
    c = c.replace('#', '');
    c = 'F' + c.substring(1)
  }
  var a = '';
  if (c.indexOf('#') != - 1) {
    a = c.charAt(0) + '#'
  } else {
    if (c.substring(1).indexOf('b') != - 1) {
      var d;
      for (var f = 1; f <= cnt; f++) {
        if (accords[f] == c.charAt(0)) {
          d = f;
          break
        }
      }
      if (d == 1) {
        d = cnt
      } else {
        d--
      }
      a = accords[d]
    } else {
      a = c.charAt(0)
    }
  }
  for (var f = 1; f <= cnt; f++) {
    if (accords[f] == a) {
      d = f;
      break
    }
  }
  d += g;
  if (d < 1) {
    d += cnt
  }
  if (d > cnt) {
    d -= cnt
  }
  if (c.indexOf('#') != - 1) {
    c = c.replace('#', '')
  } else {
    if (c.substring(1).indexOf('b') != - 1) {
      c = c.replace('b', '')
    }
  }
  c = accords[d] + c.substring(1);
  return c
}
function ajax_change_ch_applicatures(d, c, b, a) {
  d.tuning = c;
  $.ajax({
    type: 'GET',
    url: '/applicature/?appl_api_version=' + get_appl_api_version() + '&instr=' + instr + '&callback=?',
    data: d,
    dataType: 'json',
    timeout: 20000,
    success: function (f) {
      applicature = f;
      all_applicatures_loaded = true;
      is_transpose_locked = false;
      if (b && a) {
        b(a)
      }
    }
  })
}
function transpose(d, f, c, a) {
  $('#print_link').attr('href', first_link + '?transpose=' + current_transpose);
  var b = {
  };
  $('#cont span').each(function () {
    var g = remove_frets_before_modulate($(this).text());
    if (f == 0) {
      b[g] = modulate_accord(g, - current_transpose)
    } else {
      b[g] = modulate_accord(g, f)
    }
  });
  ajax_change_ch_applicatures(b, d, c, a)
}
function trim(c, b) {
  b = !b ? ' s ' : b.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
  var a = new RegExp('^[' + b + ']+|[' + b + ']+$', 'g');
  return c.replace(a, '')
}
function remove_frets_before_modulate(c) {
  var b = /\([0-9XIV fr\.]+\)/;
  var a = c.replace(b, '');
  a = trim(a);
  return a
}
function chk_ch_highlight() {
  if ($('#disp_ch_highlight').hasClass('on')) {
    $('#cont').addClass('highlight');
    bind_hover()
  } else {
    $('#cont').removeClass('highlight');
    $('#cont span').unbind('mouseover')
  }
}
function create_chords_list() {
  var c = 0;
  var a = '';
  $('#chords_list').empty();
  for (var b in applicature) {
    c++;
    a = '';
    if (((c % 6) == 0) || (((c + 1) % 6) == 0)) {
      a += ' last6'
    }
    if (((c % 4) == 0) || (((c + 1) % 4) == 0)) {
      a += ' last4'
    }
    var d = create_applicature_widget(b, acc_tuning, {
      count_class: a
    });
    display_widget(d, null, false)
  }
  $('#chords_list div.chord-variations-wrapper').bind('mouseleave', function () {
    var f = $(this);
    if (!f.find('.chords_versions_handler').is(':visible')) {
      f.removeAttr('style')
    }
  })
}
function display_widget(d, b, a) {
  if (a) {
    var c = b.offset();
    c.top -= 180;
    c.left += 21;
    ui_dragable_firsttime = ui_dragable++;
    d.addClass('ui-draggable');
    d.addClass('was_not_draged');
    d.addClass('hover');
    d.appendTo('body');
    $.extend(d, {
      isBinded: true,
      chord: b
    });
    $.extend(b, {
      unbindWidget: function () {
        b.removeClass('has_undragable');
        b.unbind('mouseleave');
        d.isBinded = false;
        clearTimeout(b.leaveTimer)
      },
      removeWidget: function () {
        b.unbindWidget();
        d.remove()
      },
      startLeaveTimer: function () {
        d.addClass('removeable');
        b.leaveTimer = setTimeout(function () {
          clearTimeout(b.leaveTimer);
          b.removeWidget()
        }, 200)
      },
      stopLeaveTimer: function () {
        clearTimeout(b.leaveTimer);
        d.removeClass('removeable')
      },
      leaveTimer: null
    });
    d.css({
      position: 'absolute',
      top: c.top,
      left: c.left,
      'z-index': ui_dragable_firsttime
    });
    d.draggable({
      handle: '.diag_head',
      containment: '#scroll_holder',
      start: function (f, g) {
        var h = g.helper;
        h.removeClass('was_not_draged');
        h.removeClass('removeable');
        b.unbindWidget();
        if (ui_dragable != h.css('z-index')) {
          ui_dragable++;
          h.css('z-index', ui_dragable)
        }
      }
    });
    b.bind('mouseleave', function () {
      b.startLeaveTimer();
      return false
    });
    d.bind('mouseover', function () {
      if (d.isBinded) {
        b.stopLeaveTimer()
      }
    });
    d.bind('mouseleave', function () {
      if (!d.find('.chords_versions_handler').is(':visible')) {
        if (d.isBinded) {
          b.startLeaveTimer()
        } else {
          d.removeClass('hover')
        }
      }
    });
    d.find('.diag_head a').bind('click', function () {
      if (d.isBinded) {
        b.removeWidget()
      } else {
        d.remove()
      }
      return false
    })
  } else {
    d.addClass('ui_not-draggable');
    d.find('.diag_head img').remove();
    d.appendTo('#chords_list')
  }
  d.find('.main_chord_with_play').find('.chfret_clicked_label').css('display', 'none');
  d.show()
}
function bind_hover() {
  $('#cont span').unbind('mouseover');
  $('#cont span').each(function () {
    var a = $(this);
    a.bind('mouseover', function (c) {
      if (a.leaveTimer !== undefined) {
        a.stopLeaveTimer()
      }
      if (a.hasClass('has_undragable')) {
        return false
      }
      a.addClass('has_undragable');
      var b = a.text();
      var d = create_applicature_widget(b, acc_tuning, {
        vars_left: false
      });
      display_widget(d, a, true);
      return false
    })
  })
}
function hide_scroller_widget() {
  $('.autoscroll_controller').fadeOut(100);
  $('.b_a').removeClass('b_ac');
  tab_scroller.setHeight(0, true);
  tab_scroller.changeSpeed(0)
}
function hide_scroll() {
  if (document.getElementById('scroll').style.display == 'none') {
    $('#scroll').show();
    $('#arr_scroll').css({
      background: 'url(http://' + js_img_domain + '/img/arr.gif) 0px -40px'
    })
  } else {
    $('#scroll').hide();
    $('#arr_scroll').css({
      background: 'url(http://' + js_img_domain + '/img/arr.gif)'
    })
  }
}
var TabScroller = function () {
  if ($('#r_a').is(':visible')) {
    $('#whole_scroll').css('top', '250px')
  }
  this.of_top = $('#whole_scroll').offset().top;
  this.scrolling_speed = 0;
  this.height_gradient = 0;
  this.to = '';
  this.move_area_coords;
  this.save_scroll_position = false;
  this.scroller_margin = 15;
  this.memorized_position = parseInt($('#whole_scroll').css('top'));
  $('#speed div').click(function (a) {
    tab_scroller.setHeight($(this).index() + 1, true);
    tab_scroller.changeSpeed(($(this).index() + 1) * 100)
  });
  $('#speed div').mouseover(function (a) {
    $('#speed div').removeClass('hover');
    $(this).addClass('hover');
    $(this).prevAll().addClass('hover')
  });
  $('#speed').mouseleave(function (a) {
    tab_scroller.setHeight(tab_scroller.height_gradient)
  });
  $('#dec_speed').click(function () {
    tab_scroller.decSpeed()
  });
  $('#inc_speed').click(function () {
    tab_scroller.incSpeed()
  });
  $('#whole_scroll').draggable({
    stop: function () {
      if ($('#whole_scroll').hasClass('fixed')) {
        $('#whole_scroll').css({
          top: $('#whole_scroll').offset().top - $('.t_br').offset().top,
          left: $('#whole_scroll').offset().left - $('.t_br').offset().left
        });
        $('#whole_scroll').removeClass('fixed')
      }
      tab_scroller.save_scroll_position = false;
      tab_scroller.memorized_position = parseInt($('#whole_scroll').css('top'))
    }
  });
  $(document).keydown(function (a) {
    if (typeof unknown_platform != 'undefined') {
      return
    }
    if (lock_scroller) {
      return
    }
    switch (a.keyCode) {
      case 27:
        tab_scroller.setHeight(0, true);
        tab_scroller.changeSpeed(0);
        $('#whole_scroll').animate({
          opacity: '1'
        }, 1);
        break;
      case 43:
      case 107:
        if (tab_scroller.scrolling_speed != 500) {
          tab_scroller.incSpeed()
        }
        break;
      case 45:
      case 109:
        tab_scroller.decSpeed();
        break
    }
  }); $(window).scroll(function () {
    if ($('#whole_scroll:visible').get(0) && !$('#whole_scroll').hasClass('ui-draggable-dragging')) {
      window_scroll_top = $(window).scrollTop();
      var g = $('#whole_scroll').offset().top;
      var c = $('.t_b').offset().top;
      var a = window_scroll_top >= (g - tab_scroller.scroller_margin);
      a = a && tab_scroller.memorized_position <= (g - c);
      var b = (window_scroll_top + $(window).height() - tab_scroller.scroller_margin) <= (g + $('#whole_scroll').height());
      b = b && g > ($('#scroll_holder').offset().top + tab_scroller.scroller_margin);
      b = b && tab_scroller.memorized_position >= (g - c);
      if (a || b) {
        if (!$('#whole_scroll').hasClass('fixed')) {
          tab_scroller.memorized_position = parseInt($('#whole_scroll').css('top'));
          tab_scroller.save_scroll_position = true;
          var f = $('#whole_scroll').offset().left;
          if (b) {
            var d = $(window).height() - $('#whole_scroll').height() - tab_scroller.scroller_margin
          } else {
            var d = tab_scroller.scroller_margin
          }
          $('#whole_scroll').addClass('fixed').css({
            left: f,
            top: d
          })
        }
      } else {
        if (tab_scroller.save_scroll_position) {
          if (tab_scroller.memorized_position > (window_scroll_top + $(window).height() - $('#whole_scroll').height() - tab_scroller.scroller_margin)) {
            var d = $('#scroll_holder').offset().top - window_scroll_top + tab_scroller.scroller_margin;
            var f = $('#whole_scroll').position().left
          } else {
            var d = tab_scroller.memorized_position;
            var f = $('#whole_scroll').position().left - $('.t_br').offset().left;
            $('#whole_scroll').removeClass('fixed');
            tab_scroller.save_scroll_position = false
          }
          $('#whole_scroll').css({
            top: d,
            left: f
          })
        }
      }
    }
  })
};
TabScroller.prototype.doScroll = function () {
  if (!this.scrolling_speed) {
    return false
  }
  if (!$.browser.opera) {
    $('body:not(:animated)').animate({
      scrollTop: '+=1'
    }, 1, 'linear')
  }
  $('html').animate({
    scrollTop: '+=1'
  }, 1, 'linear');
  timeout_interval = 275 - this.scrolling_speed / 2;
  this.to = setTimeout('tab_scroller.doScroll()', timeout_interval);
  $('.b_a').addClass('b_ac');
  $('#whole_scroll').show().addClass('ui-draggable').animate({
    opacity: '0.6'
  }, 1)
};
TabScroller.prototype.changeSpeed = function (a) {
  if (a <= 0) {
    a = 0;
    $('#whole_scroll').animate({
      opacity: '1'
    }, 1);
    clearTimeout(this.to);
    if ($('.player_fixed').length > 0) {
      $('.player_fixed').animate({
        bottom: '0px'
      });
      $('.page-wrap').addClass('tp-player-wrap')
    }
  }
  if (this.scrolling_speed == 0 && a > 0) {
    ga_track_event(['_trackEvent',
    'Tab Page',
    'Autoscroll',
    'Autoscroll Start']);
    if ($('.player_fixed').length > 0) {
      $('.player_fixed').animate({
        bottom: '-70px'
      });
      $('.page-wrap').removeClass('tp-player-wrap')
    }
  }
  if (a > 500) {
    a = 500
  }
  this.scrolling_speed = a;
  if (this.scrolling_speed > 0 && $(window).scrollTop() > this.of_top) {
    $('#whole_scroll').animate(1000);
    clearTimeout(tab_scroller.to);
    tab_scroller.doScroll();
    if (this.scrolling_speed > 0) {
      $('#whole_scroll').animate({
        opacity: '0.6'
      }, 1)
    }
  } else {
    if (this.scrolling_speed) {
      clearTimeout(this.to);
      this.doScroll();
      $('#whole_scroll').animate({
        opacity: '0.6'
      }, 1)
    } else {
      clearTimeout(this.to)
    }
  }
};
TabScroller.prototype.incSpeed = function () {
  this.changeSpeed(this.scrolling_speed + 100);
  this.height_gradient++;
  this.setHeight(this.height_gradient, true)
};
TabScroller.prototype.decSpeed = function () {
  this.changeSpeed(this.scrolling_speed - 100);
  this.height_gradient--;
  this.setHeight(this.height_gradient, true)
};
TabScroller.prototype.setHeight = function (a, b) {
  if (a < 0) {
    a = 0
  }
  if (a > 5) {
    a = 5
  }
  $('#speed div').removeClass('hover');
  $('#speed div:lt(' + a + ')').addClass('hover');
  if (b) {
    this.height_gradient = a
  }
};
function viewComments(c, b, a) {
  $('.comments_dub').addClass('active');
  $('.comments-ajax-loader').show();
  $('html, body').animate({
    scrollTop: $('#comments').offset().top - 50
  }, 1000);
  if (!already_comment_loaded) {
    already_comment_loaded = true;
    $.ajax({
      type: 'GET',
      url: '/comment/',
      dataType: 'html',
      data: 'tabid=' + tabid,
      success: function (d) {
        $('.tabcomms').html(d);
        $('.comments-ajax-loader').hide();
        $('#comments').fadeIn();
        show_bad_comments = false;
        if (b) {
          scroll_to_comments(c);
          if (a) {
            $('#c_' + c + ' .commreply').trigger('click');
            $('#c_' + c + ' textarea').focus()
          }
        }
      }
    })
  } else {
    if (b) {
      scroll_to_comments(c)
    }
  }
}
function scroll_to_comments(a) {
  if (a == 0) {
    var b = '#comments'
  } else {
    var b = '#c_' + a
  }
  $('html, body').animate({
    scrollTop: $(b).offset().top - 110
  }, 1000)
}
function show_comments() {
  var a = getURLParameter('reply_to');
  if (a > 0) {
    viewComments(a, true, true)
  }
}
function get_appl_api_version() {
  if (typeof appl_api_version === 'undefined') {
    return 2
  } else {
    return appl_api_version
  }
}
function showPlayer() {
  if (isAudioSupported) {
    $('body').removeClass('audio-not-supported');
    $('body').addClass('audio-supported');
    $('div.play-on-hover .chfret').live('mouseenter', function () {
      var j = $(this);
      var g = j.closest('.main_chord_with_play');
      var i = g.find('i');
      var b = g.find('span');
      var a = g.find('.play_applicature_button').attr('rel');
      var c = g.parents('#chords_list').get(0) != undefined;
      ga_track_event(['_trackEvent',
      'Tab Page',
      'Chords',
      (c ? 'Display chords' : 'Highlight chords') + ' Play']);
      g.find('b').fadeOut(function () {
        g.find('b').fadeIn()
      });
      var h = {
        beforeFontLoad: function () {
          i.addClass('sf-load')
        },
        afterFontLoad: function () {
          i.removeClass('sf-load');
          $('body').addClass('sf-loaded')
        },
        playStarted: function () {
          i.removeClass('sf-load');
          if (!i.hasClass('sf-play')) {
            i.addClass('sf-play');
            b.text('playing')
          }
          var k = (i.attr('data') === undefined) ? 0 : parseInt(i.attr('data'));
          k++;
          i.attr('data', k)
        },
        playFinished: function () {
          var k = (i.attr('data') === undefined) ? 0 : parseInt(i.attr('data'));
          k--;
          if (k <= 0) {
            k = 0;
            if (!j.is(':hover')) {
              i.removeClass('sf-play');
              b.text('hover to play')
            }
          }
          i.attr('data', k)
        }
      };
      var d = j.attr('data');
      if (d !== undefined) {
        j.removeAttr('data');
        clearTimeout(d)
      }
      var f = function () {
        j.attr('data', setTimeout(function () {
          playNotesString(a, h);
          f()
        }, 2000))
      };
      f();
      playNotesString(a, h);
      return false
    });
    $('div.play-on-hover .chfret').live('mouseleave', function () {
      var f = $(this);
      var d = f.closest('.main_chord_with_play');
      var b = d.find('i');
      var c = d.find('span');
      b.attr('data', 0);
      b.removeClass('sf-play');
      c.text('hover to play');
      var a = f.attr('data');
      if (a !== undefined) {
        f.removeAttr('data');
        clearTimeout(a);
        soundOff()
      }
      return false
    })
  }
}
function audioDetected(a) {
}
function prepareNotesString(c) {
  var a = '';
  var d;
  for (var b = 5; b >= 0; b--) {
    if (c[b] > 0) {
      d = parseInt(c[b]) + 12;
      a += d + ' '
    }
  }
  return $.trim(a)
}
var show_fixed_panel = false;
if (!navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/i)) {
  $('#fixed_panel').show();
  show_fixed_panel = true
}
function right_column_position() {
  if (show_fixed_panel) {
    if ($(window).scrollTop() + $(window).height() >= $('.rt_b').offset().top + $(window).height() - 20) {
      $('#fixed_panel.abs').hide().removeClass('abs').show();
      $('.comm-post.float.embedded').css('top', '59px')
    } else {
      $('#fixed_panel:not(abs)').hide().addClass('abs').show();
      if ($('#fixed_panel.abs').length) {
        $('.comm-post.float.embedded').css('top', ($('#fixed_panel').offset().top - $(window).scrollTop() + 40) + 'px')
      }
    }
  }
}
function playNotesString(c, a) {
  var b = c.split(' ');
  if (isAudioSupported) {
    playChord(b, a)
  }
}
function soundOff() {
  if (isAudioSupported) {
    stopChord()
  }
}
function voting(c, a) {
  var b = c.attr('data-rate');
  if (b > 2) {
    send_vote(c, a, '')
  } else {
    rate_btn = c;
    if ($('#js-modalRatingExplain').length == 0) {
      $.ajax({
        url: 'http://tabs' + ug_serv + '/tabs/ratingExplain',
        dataType: 'json',
        success: function (d) {
          $('body').append(d);
          $('.js-low-rating').text(b);
          show_modal($('#js-modalRatingExplain'), true)
        }
      })
    } else {
      $('.js-low-rating').text(b);
      show_modal($('#js-modalRatingExplain'), true)
    }
  }
}
function show_modal(b, a) {
  b.show();
  if (a) {
    $('body').append('<div class="modal-backdrop fade-in"></div>')
  }
}
function hide_modal(a) {
  a.hide();
  $('.modal-backdrop').remove()
}
function send_vote(d, c, a) {
  ga_track_event(['_trackEvent',
  'Tab Page',
  'Rating on ' + d.attr('data'),
  'Rate']);
  if (!already_voted) {
    already_voted = true;
    if (user_id == tabs_user_id) {
      if (c) {
        message_popup('Can`t vote for your own tab', TYPE_ERROR)
      }
    } else {
      increase_votes(1);
      if (c) {
        message_popup('Thanks for your vote!', TYPE_SUCCESS)
      }
    }
  }
  var b = d.attr('href');
  $.ajax({
    url: 'http://www' + ug_serv + '/vote0.php',
    data: {
      rowid: tabid,
      type: 3,
      content: d.attr('data-rate'),
      comment: a
    },
    dataType: 'jsonp',
    error: function () {
      if (c) {
        message_popup('Unknown error while voting', TYPE_ERROR)
      }
    },
    success: function (f) {
      if (d.attr('data') == 'layer') {
        hide_modal($('#js-modalRatingLayer'));
        yaCounter18746557.reachGoal('TAB_RATE_LAYER_RATE')
      }
      if (f.status == 'success') {
        $('div.v_c').html(' x ' + f.response.votes);
        current_rating_count = f.response.votes;
        $('div.voting a').removeClass('cur');
        current_rating = Math.round(f.response.rating);
        stars_fill(current_rating, false)
      } else {
        if (c) {
          if (f.status == TYPE_ERROR) {
            switch (f.response) {
              case 'No permission':
                show_auth_layer_for_non_activ_users();
                break;
              case 'Blocked':
                show_auth_layer_for_blocked_users();
                break;
              default:
                message_popup(f.response, TYPE_ERROR);
                break
            }
          }
        }
      }
    },
  })
}
function send_comment(a, b) {
  $.ajax({
    url: $('#comment_form').attr('action'),
    data: {
      cb_comment: 'on',
      type: b ? 4 : 10,
      parent_id: 0,
      ajax_form: 1,
      rowid: $('#comment_form input[name=rowid]').val(),
      content: a
    },
    dataType: 'jsonp',
    type: 'POST'
  })
}
function add_tab_to_favourite() {
  var a = 'http://www' + ug_serv + '/home/favorites/?tabs&fid=' + tabid + '&act=addtab';
  if (!already_favourite) {
    ga_track_event(['_trackEvent',
    'Tab Page',
    'Favorites',
    'Favorites Add']);
    message_popup('Added to your favorites', TYPE_SUCCESS);
    already_favourite = true;
    $.ajax({
      url: a,
      dataType: 'jsonp',
      success: function (c, d, b) {
        if (c.error != '') {
          message_popup(c.error, TYPE_ERROR)
        }
      }
    })
  } else {
    ga_track_event(['_trackEvent',
    'Tab Page',
    'Favorites',
    'Favorites Add Already'])
  }
}
function submit_tab_comment() {
  $('#comment_form').submit()
}
$(document).ready(function () {
  show_tp_hint();
  $(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() >= $('table.foot').offset() ['top']) {
      $('.player_fixed, .tp_hint').slideUp()
    } else {
      $('.player_fixed, .tp_hint').slideDown()
    }
  });
  (function () {
    var u = $('<div id="get_app_tooltip" class="text-message-popup">\n            <div class="text-message-popup-ico"></div>\n            <div class="text-message-popup-text">\n                    <div class="text-message-popup-h">How to get the app:</div>\n                    1. Go App Store or Google Play<br>\n                    2. Search for "Ultimate Guitar"<br>\n                    3. Install the app and enjoy!\n                    <div class="text-message-popup-links">\n                        <a href="http://www.ultimate-guitar.com/show.php?ug_from=tabs&url=https://itunes.apple.com/app/id357828853?how_get_app" target="_blank">iPhone</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.ultimate-guitar.com/show.php?ug_from=tabs&url=https://itunes.apple.com/app/id404167616?how_get_app" target="_blank">iPad</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.ultimate-guitar.com/show.php?ug_from=tabs&url=https://play.google.com/store/apps/details?id=com.ultimateguitar.tabs&how_get_app" target="_blank">Android</a>\n                    </div>\n            </div>\n        </div>').appendTo('body').hide();
    var x = false;
    var r = null;
    var o = null;
    var A = true;
    var v = false;
    var t = null;
    var s = null;
    var p = {
    };
    $('#how_get_app').on('mouseenter', function (B) {
      z();
      y(B)
    }).on('mouseleave', function (B) {
      n();
      w()
    });
    $('#get_app_tooltip').on('mouseenter', function () {
      z()
    }).on('mouseleave', function () {
      n();
      w()
    });
    function m(B) {
      p = B
    }
    function z() {
      A = false;
      clearTimeout(t)
    }
    function n() {
      v = true;
      clearTimeout(s)
    }
    function w() {
      A = true;
      t = setTimeout(function () {
        if (A) {
          $(window).off('mousemove', m);
          x = false;
          u.hide()
        }
      }, 600)
    }
    function y(B) {
      v = true;
      $(window).on('mousemove', m);
      s = setTimeout(function () {
        if (v && !x) {
          u.show();
          u.position({
            my: 'center+10 bottom-20',
            of: p,
            collision: 'none'
          });
          x = true;
          if (null === r) {
            var C = new Date();
            r = C.getTime()
          }
        }
      }, 400)
    }
  }) ();
  if ('undefined' != typeof (instr)) {
    switch (instr) {
      case 'ukulele':
        $('body').addClass('ukulele');
        break;
      case 'guitar':
      default:
        $('body').addClass('guitar');
        break
    }
  }
  if (!isAudioSupported) {
    $('body').addClass('audio-not-supported')
  }
  $('.versions_column__interactive a').on('click', function () {
    _gaq.push(['_trackEvent',
    'Links ',
    'TP Link',
    'TP Version Link Click']);
    var m = $(this).attr('href');
    setTimeout(function () {
      window.location = m
    }, 350);
    return false
  });
  $(document).keydown(function (m) {
    if (m.ctrlKey && m.keyCode == 67) {
      ga_track_event(['_trackEvent',
      'Tab Page',
      'Ctrl+C',
      'Ctrl+C Click'])
    }
  });
  Chord.init();
  initFontsize();
  $('.t_version').mouseenter(function () {
    ga_track_event(['_trackEvent',
    'Tab Page',
    'Tab Versions',
    'Tab Versions Show']);
    $(this).parent().children('.t_versions').show()
  });
  $('.t_versions').mouseleave(function () {
    $(this).hide()
  });
  $('.t_versions').bind('click', function () {
    $(this).hide()
  });
  bind_hover();
  create_chords_list();
  $('.autoscroll_controller').mouseenter(function (m) {
    if (m.target == this) {
      ui_dragable++;
      $(this).css('z-index', ui_dragable)
    }
    return false
  });
  $('.autoscroll_controller').mouseleave(function () {
    $(this).css('z-index', ui_dragable - 1);
    return false
  });
  first_link = $('#print_link').attr('href');
  $('#disp_ch_highlight').bind('click', function () {
    ga_track_event(['_trackEvent',
    'Tab Page',
    'Highlight Chords',
    'Highlight Chords ' + ($(this).hasClass('on') ? 'Off' : 'On')]);
    $(this).toggleClass('on');
    chk_ch_highlight();
    return false
  });
  $('.show_comments').click(function () {
    if ($(this).hasClass('t_comments_union')) {
      ga_button = 'Top';
      need_scroll = true
    } else {
      ga_button = 'Bottom';
      need_scroll = false;
      $(this).parent().addClass('loading')
    }
    if (!$(this).hasClass('active')) {
      ga_track_event(['_trackEvent',
      'Tab Page',
      'Comments',
      'Comments ' + ga_button + ' Show']);
      viewComments(0, need_scroll, false)
    } else {
      ga_track_event(['_trackEvent',
      'Tab Page',
      'Comments',
      'Comments ' + ga_button + ' Hide']);
      $(this).removeClass('active');
      $('#comments').fadeOut();
      $('.comm-post').removeClass('float').addClass('embedded');
      $('.commentswr').append($('.comm-post'))
    }
    return false
  });
  $('a.commreply').live('click', function () {
    if ($(this).text() == 'edit' && !$(this).parents('.comment:first').hasClass('updated')) {
      cancel_comment_edit();
      var n = $(this).parents('div.comment:first').find('.comment_content p').text();
      var r = $(this).parents('.comment:first').attr('id');
      r = r.split('_') [1];
      var p = $(this).parents('div.comment:first').find('.comment_content');
      p.find('p').hide();
      p.append('<form id="edit_comment_form" action="http://www' + ug_serv + '/vote0.php"><textarea name="content" id="edit_comment_txt" class="edit_text">' + n + '</textarea><input type="hidden" name="id" value="' + r + '"><input type="hidden" name="act" value="edit"><br><input type="submit" value="Save"><input id="cancel_edit" type="button" value="Cancel"></form>')
    } else {
      var o = $('#comment_form').parent();
      var m = $(this).parent().parent().parent().attr('class');
      m = m.substring(7, 12);
      o.find('#form_parent_id').val($(this).attr('rel'));
      o.removeClass();
      o.addClass('comm-post ' + m + ' embedded');
      $('#c_' + $(this).attr('rel')).append(o);
      $('#comm_txt').focus()
    }
    return false
  });
  $('#edit_comment_form').live('submit', function () {
    $.ajax({
      url: $(this).attr('action'),
      data: $(this).serialize(),
      dataType: 'jsonp',
      success: function (n, o, m) {
      }
    });
    $('#edit_comment_form').parents('.comment:first').addClass('updated');
    $('#edit_comment_form').parents('.comment_content:first').find('p').show().html($('#edit_comment_txt').val().replace(/\r\n|\r|\n/g, '<br>'));
    $('#edit_comment_form').parents('.comment:first').find('a.commreply').text('reply');
    $('#edit_comment_form').remove();
    return false
  });
  $('#cancel_edit').live('click', function () {
    cancel_comment_edit();
    return false
  });
  $('#close_reply').live('click', function () {
    $('#form_parent_id').val('0');
    if ($(this).parents('.comm-post').hasClass('float')) {
      $(this).parents('.comm-post').remove();
      $('#fixed_add_comment').show()
    } else {
      $('#comments').append($('.comm-post'))
    }
    $('#comment_form').parent().removeClass('float embedded');
    return false
  });
  $('#comment_form .comment_chks, #comment_form .comment_chkscr').live('click', function () {
    $('#comment_form input[type=checkbox]').removeAttr('checked');
    $('#comment_form input[type=checkbox]').removeAttr('disabled');
    var m = $(this).find('input');
    m.attr('checked', true);
    m.attr('disabled', 'disabled');
    if (m.attr('name') == 'cb_correction') {
      $('.comment_chkstab').show()
    } else {
      $('.comment_chkstab').hide()
    }
  });
  var l = 0;
  var k = false;
  $(window).scroll(function () {
    if (!k && ($(window).scrollTop() + $(window).height() >= $('#comments').offset().top + 5)) {
      l = $(window).scrollTop();
      setTimeout(function () {
        if (l == $(window).scrollTop()) {
          k = true;
          $('.sad_smile, .bottom_vot').fadeIn(450).animate({
            opacity: 1,
            'margin-top': '6px',
            display: 'toggle'
          }, {
            duration: 550,
            queue: false
          });
          setTimeout('$(".t_hs .vote-success").show()', 50)
        }
      }, 200)
    }
    right_column_position()
  });
  $('.rate_btn_wrp').live('click', function () {
    $(this).parent().toggleClass('selected');
    return false
  });
  $('.rate_list_drop a').live('click', function () {
    $(this).parent().parent().removeClass('selected').find('.rate_btn_wrp').html($(this).html());
    if (user_id) {
      voting($(this), false)
    } else {
      prepare_auth_layer();
      auth_callback_params.push($(this));
      auth_callback_params.push(false);
      show_auth_layer('voting')
    }
    return false
  });
  $(document).bind('click', function () {
    if ($('.rate_list_drop').is(':visible')) {
      $('.rate_list_btn').removeClass('selected')
    }
  });
  $('div.voting a').click(function () {
    if (user_id) {
      voting($(this), true)
    } else {
      prepare_auth_layer();
      auth_callback_params.push($(this));
      auth_callback_params.push(true);
      show_auth_layer('voting')
    }
    return false
  });
  $('.js-close-modal').live('click', function () {
    hide_modal($('.modal'));
    return false
  });
  $('#js-reason-check').live('change', function () {
    $(this).is(':checked') ? $('#js-rating-reason-other').show()  : $('#js-rating-reason-other').hide()
  });
  $('.js-btn-rating-explain').live('click', function () {
    var o = true;
    var n = '';
    var m = false;
    $('.js-rating-reason').each(function () {
      if ($(this).is(':checked')) {
        if ($(this).attr('data-reason')) {
          if ($(this).attr('data-reason') == 'Dont-like') {
            m = true
          } else {
            n = n + $(this).attr('data-reason')
          }
        }
      }
    });
    if ((h($('.js-rating-reason-input').val()) < 20) && (!m)) {
      o = false
    }
    n = n + $('.js-rating-reason-input').val();
    if (!o) {
      $('.js-rating-reason-other-error').show().addClass('has-error')
    } else {
      $('.js-rating-reason-other-error').hide().removeClass('has-error')
    }
    if (o) {
      hide_modal($('#js-modalRatingExplain'));
      if (m) {
        message_popup('Thanks for your vote!', TYPE_SUCCESS);
        send_comment('didn\'t like this contribution', true)
      } else {
        send_comment(n, false);
        send_vote(rate_btn, true, n)
      }
    }
    return false
  });
  function h(m) {
    m = m.replace(/(^\s*)|(\s*$)/gi, '');
    m = m.replace(/[ ]{2,}/gi, ' ');
    m = m.replace(/\n /, '\n');
    return m.split(' ').length
  }
  $('a.b_f').click(function () {
    if (user_id) {
      add_tab_to_favourite()
    } else {
      prepare_auth_layer();
      auth_callback_need_activ = false;
      show_auth_layer('add_tab_to_favourite')
    }
    return false
  });
  $('.voting a').bind('mouseover', function () {
    stars_fill($(this).index() + 1, true)
  });
  $('#arr_scroll').bind('click', function () {
    hide_scroll()
  });
  $('.voting').bind('mouseleave', function () {
    stars_fill(current_rating, false)
  });
  chk_ch_highlight();
  tab_scroller = new TabScroller();
  $('.b_a').click(function () {
    if (lock_scroller) {
      return false
    }
    var m = $('#whole_scroll');
    if (m.is(':hidden')) {
      ga_track_event(['_trackEvent',
      'Tab Page',
      'Autoscroll',
      'Autoscroll Show']);
      m.fadeIn(100).draggable({
        containment: 'parent'
      }, {
        handle: '.autoscroll_controller_header'
      });
      $(window).trigger('scroll');
      $('.b_a').addClass('b_ac')
    } else {
      ga_track_event(['_trackEvent',
      'Tab Page',
      'Autoscroll',
      'Autoscroll Hide']);
      m.fadeOut(100);
      $('.b_a').removeClass('b_ac')
    }
    if ($('.b-eupp').is(':visible')) {
      m.css('left', '10px').css('top', '45px')
    }
    return false
  });
  $('.autoscroll_controller_exit').click(function () {
    ga_track_event(['_trackEvent',
    'Tab Page',
    'Autoscroll',
    'Autoscroll Hide']);
    hide_scroller_widget();
    return false
  });
  $('#c_a').click(function () {
    $('#r_a').fadeOut(100);
    if (parseInt($('#whole_scroll').css('top')) == 250 && !$('#whole_scroll:visible').get(0)) {
      $('#whole_scroll').css('top', '-=205')
    }
    return false
  });
  $('div.chords_versions_scroller_moveable .chfret').live('click', function () {
    var o = $(this);
    var m = o.closest('.cont_chrd');
    var p = o.closest('.chord-variations-wrapper').find('.main_chord_with_play .cont_chrd');
    if (m.attr('rel') != p.attr('rel')) {
      var n = o.closest('.chords_versions_scroller_moveable');
      p.html(m.html());
      p.attr('rel', m.attr('rel'));
      n.find('.chfret_clicked_label').fadeOut(100);
      m.find('.chfret_clicked_label').fadeIn(100)
    }
    return false
  });
  $('#disp_ch_diagrams').bind('click', function () {
    var n = $(this);
    ga_track_event(['_trackEvent',
    'Tab Page',
    'Display chords',
    'Display chords ' + ($(this).hasClass('on') ? 'Off' : 'On')]);
    if (!n.hasClass('on')) {
      n.removeClass().addClass('on')
    } else {
      n.removeClass('on')
    }
    var m = $('#chords_list');
    if (m.is(':hidden')) {
      if ($('#r_a').is(':visible')) {
        m.removeClass('list_wide');
        m.addClass('list_narrow')
      } else {
        m.removeClass('list_narrow');
        m.addClass('list_wide')
      }
      m.fadeIn(100)
    } else {
      m.fadeOut(100)
    }
  });
  $('div.varctrl').live('click', function () {
    onVariationsClick({
      button: $(this)
    });
    return false
  });
  $('div.chords_versions_controls_left, div.chords_versions_controls_right').live('click', function () {
    if (applicature_animation) {
      return false
    }
    var t = $(this);
    var m = $(this).parent().children('.chords_versions_controls_left');
    var w = $(this).parent().children('.chords_versions_controls_right');
    var s = t.closest('.diagwrap').find('.chords_versions_scroller_moveable');
    var r = parseInt(s.attr('rel'));
    var u = t.hasClass('chords_versions_controls_left') ? - 1 : 1;
    var p = s.children('.cont_chrd').length;
    var o = Math.ceil(p / 2);
    if (((r == 1) && (u < 0)) || ((r == o) && (u > 0))) {
      return false
    }
    var n = r + u;
    s.attr('rel', n);
    var v = - u * (ver_w * 2);
    if (n == o) {
      w.fadeOut(100)
    }
    if (n == 1) {
      m.fadeOut(100)
    }
    if ((n > 1) && (r == 1)) {
      m.fadeIn(100)
    }
    if ((r == o) && (n == o - 1)) {
      w.fadeIn(100)
    }
    s.animate({
      marginLeft: (v + parseInt(s.css('margin-left'))) + 'px'
    }, {
      start: function () {
        applicature_animation = true
      },
      complete: function () {
        applicature_animation = false
      }
    }, 500);
    t.parent().children('.chords_versions_controls_info_text').text(n + ' of ' + o);
    return false
  });
  function c(m) {
    m.addClass('active');
    setTimeout(function () {
      m.removeClass('active')
    }, 100)
  }
  if (typeof unknown_platform == 'undefined') {
    $('a.m_b').click(function () {
      c($(this));
      onFontsizeClick( - 1);
      return false
    });
    $('a.p_b').click(function () {
      c($(this));
      onFontsizeClick(1);
      return false
    });
    $('#fontsize_reset_val').click(function () {
      onFontsizeClick( - current_fontsize_counter);
      return false
    });
    $('.d_b').click(function () {
      ga_track_event(['_trackEvent',
      'Tab Page',
      'Transpose',
      'Transpose Down']);
      c($(this));
      onTransposeClick( - 1);
      return false
    });
    $('.u_b').click(function () {
      ga_track_event(['_trackEvent',
      'Tab Page',
      'Transpose',
      'Transpose Up']);
      c($(this));
      onTransposeClick(1);
      return false
    });
    $('#transpose_reset_val').click(function () {
      onTransposeClick( - current_transpose);
      return false
    })
  }
  $('.ui-draggable, .ui_not-draggable').live('click', function (m) {
    if (ui_dragable != $(this).css('z-index')) {
      ui_dragable++;
      $(this).css('z-index', ui_dragable)
    }
  });
  if (typeof transpose_to !== 'undefined' && transpose_to > 0) {
    onTransposeClick(transpose_to)
  }
  get_transpose_state_from_local_storage();
  show_comments();
  (function () {
    var n = false;
    var m = function () {
      if (!n) {
        n = true;
        ga_track_event(['_trackEvent',
        'Tab Page',
        'Print',
        'Show'])
      }
    };
    if (window.matchMedia) {
      var o = window.matchMedia('print');
      o.addListener(function (p) {
        if (p.matches) {
          m()
        }
      })
    }
    window.onbeforeprint = m
  }());
  addTabToHistory(getTabsHistory());
  $('.d_l_recent-more').click(function () {
    $('.d_l_more-items').slideDown();
    $(this).remove();
    $.ajax({
      url: 'http://www.' + main_server_name + '/xtra/click_contest.php?without_redirect=1&ug_from=epupp&url=tabs_more_click'
    })
  });
  if ($('.player_fixed, .tp_hint').length > 0) {
    var f = $.cookie('__psc');
    var j = [
    ];
    if (typeof f != 'undefined' && f && f.length > 0) {
      j = f.split('.');
      j[1]++
    }
    j[0] = (typeof j[0] == 'undefined') ? Math.round(Date.now() / 1000)  : j[0];
    j[1] = (typeof j[1] == 'undefined') ? 1 : j[1];
    $.cookie('__psc', j.join('.'), {
      domain: ug_serv,
      path: '/'
    });
    $('.tp_hint .btn-close').bind('click', function () {
      $('.tp_hint').remove();
      $.cookie('hint_closed', 1, {
        expires: 10,
        path: '/',
        domain: ug_serv
      });
      return false
    })
  }
  if ($('.player_fixed').length > 0) {
    var d = {
    };
    var a = $('.player_fixed').hasClass('player-blue') || $('.player_fixed').hasClass('player-float') ? 10 : 0;
    d = {
      bottom: a
    };
    $('.player_fixed').animate(d, 600, function () {
      if ($('.animation-line3').length > 0) {
        $('.animation-line3').delay(300).animate({
          width: 455
        }, 900, 'linear').delay(400).animate({
          width: 400
        }, 800, 'linear').delay(300).animate({
          width: 200
        }, 1100, 'linear').delay(400).animate({
          width: 70
        }, 900, 'linear').delay(400).animate({
          width: 0
        }, 500, 'linear')
      }
      if ($('.animation-line-tp').length > 0) {
        $('.animation-line-tp').delay(300).animate({
          width: 430
        }, 600, 'linear').delay(400).animate({
          width: 380
        }, 600, 'linear').delay(200).animate({
          width: 150
        }, 800, 'linear').delay(300).animate({
          width: 0
        }, 800, 'linear')
      }
      if ($('.animation-line-wave').length > 0) {
        $('.animation-line-wave').delay(300).animate({
          width: 47
        }, 900, 'linear').delay(400).animate({
          width: 207
        }, 800, 'linear').delay(400).animate({
          width: 336
        }, 1100, 'linear').delay(450).animate({
          width: 475
        }, 900, 'linear').delay(400).animate({
          width: 618
        }, 500, 'linear')
      }
      if ($('.animation-texttab').length > 0) {
        $('.animation-texttab').delay(300).animate({
          width: 700
        }, 700, 'linear').delay(400).animate({
          width: 500
        }, 800, 'linear').delay(400).animate({
          width: 300
        }, 600, 'linear').delay(450).animate({
          width: 100
        }, 900, 'linear').delay(400).animate({
          width: 0
        }, 500, 'linear')
      }
      if ($('.animation-line-blue, .js-player-bottom-animation').length > 0) {
        $('.animation-line-blue, .js-player-bottom-animation').delay(300).animate({
          width: 100
        }, 700, 'linear').delay(400).animate({
          width: 160
        }, 400, 'linear').delay(600).animate({
          width: 370
        }, 600, 'linear').delay(400).animate({
          width: 512
        }, 500, 'linear')
      }
      if ($('.animation-line-float').length > 0) {
        $('.animation-line-float').delay(300).animate({
          width: 60
        }, 700, 'linear').delay(400).animate({
          width: 110
        }, 400, 'linear').delay(600).animate({
          width: 170
        }, 300, 'linear').delay(400).animate({
          width: 209
        }, 200, 'linear')
      }
    });
    if ($('#audio1').length > 0) {
      $.cookie('player_shown', '1', {
        domain: ug_serv,
        path: '/'
      });
      try {
        var g = $('#audio1') [0];
        g.oncanplay = g.play()
      } catch (i) {
      }
    }
    if ($('.popup-player-tp').length > 0) {
      var b = $('.popup-player-tp').hasClass('upgrade_now') ? 'UPGRADE_NOW' : 'TRY_NOW';
      $('.player_fixed a').click(function () {
        if ($('.popup-player-tp:visible').length > 0) {
          try {
            yaCounter18746557.reachGoal('TPW_' + b + '_CLOSE')
          } catch (m) {
          }
          $('.popup-player-tp').hide();
          $('body').unbind('click');
          return false
        }
        $('.popup-player-tp').show();
        try {
          yaCounter18746557.reachGoal('TPW_' + b + '_SHOW')
        } catch (m) {
        }
        $('body').click(function (n) {
          try {
            yaCounter18746557.reachGoal('TPW_' + b + '_CLOSE')
          } catch (n) {
          }
          $('.popup-player-tp').hide();
          $('body').unbind('click');
          return false
        });
        return false
      });
      $('.popup-player-tp').click(function (m) {
        m.stopImmediatePropagation();
        m.stopPropagation()
      });
      $('.popup-player-tp .buynow').click(function () {
        try {
          yaCounter18746557.reachGoal('TPW_' + b + '_BUY')
        } catch (m) {
        }
        buy_now($(this).attr('href').substr(1));
        $('.popup-player-tp').hide();
        $('body').unbind('click');
        return false
      });
      $('.popup-player-tp .learnmore').click(function () {
        try {
          yaCounter18746557.reachGoal('TPW_' + b + '_LEARNMORE')
        } catch (m) {
        }
      })
    }
  }
  $('.rt_b').click(function () {
    if ($('#js-modalTabReport').length == 0) {
      $.ajax({
        url: 'http://tabs' + ug_serv + '/tabs/tabReport?id=' + tabid,
        dataType: 'json',
        success: function (m) {
          $('body').append(m);
          show_modal($('#js-modalTabReport'), true)
        }
      })
    } else {
      show_modal($('#js-modalTabReport'), true)
    }
  });
  $('.js-rate-layer-expand').click(function (m) {
    $(this).hide();
    $('.js-rate-layer-expandanded').show();
    return false
  });
  $('.js-rate-layer-never').click(function (m) {
    hide_modal($('#js-modalRatingLayer'));
    $.cookie('disable_rate_layer', '', {
      expires: 765,
      path: '/'
    });
    return false
  });
  if ($('#js-modalRatingLayer').length > 0) {
    show_modal($('#js-modalRatingLayer'), false);
    yaCounter18746557.reachGoal('TAB_RATE_LAYER_SHOW')
  }
}); function show_tp_hint() {
  if ($('.tp_hint').length > 0 && parseInt($('.tp_hint').css('bottom')) < 0) {
    $('.tp_hint').animate({
      bottom: 10
    }, 600)
  }
}
function comment_vote(b, a) {
  var c = $('#c_' + b);
  if (user_id) {
    c.find('.commvalue').addClass('voted');
    c.find('.cvote a').unbind('click');
    $.ajax({
      type: 'GET',
      url: 'http://www' + ug_serv + '/vote0_comment.php?ajax=1&callback=?',
      data: {
        content: a,
        rowid: b,
        jsonp: 1
      },
      dataType: 'jsonp',
      success: function (g) {
        if (typeof g.result != 'undefined') {
          if (g.result != 'success') {
            if (g.error == 'You are not authorized!') {
              prepare_auth_layer();
              auth_callback_params.push(b);
              auth_callback_params.push(a);
              show_auth_layer('comment_vote')
            } else {
              c.find('._votecomment').css('color', '#d93838').html(g.error)
            }
          } else {
            var i = c.find('.commvalue ins');
            var f = parseInt(i.text());
            f = f ? f : 0;
            var h = f + (a > 0 ? 1 : - 1);
            i.text(h > 0 ? '+' + h : (h ? h : ''));
            var d = parseInt(i.text());
            i.css('color', d > 0 ? '#477e00' : (d ? '#d93838' : '#999'))
          }
        } else {
          c.find('._votecomment').css('color', '#999').html('Request error. Please contact our system administrator')
        }
      }
    })
  } else {
    prepare_auth_layer();
    auth_callback_params.push(b);
    auth_callback_params.push(a);
    show_auth_layer('comment_vote')
  }
}
$('.cvote a').live('click', function () {
  comment_vote($(this).parent().attr('data'), $(this).hasClass('cplus') ? 10 : - 1)
}); $('#comment_form').submit(function () {
  if ($('#comm_txt').hasClass('error')) {
    $('#com_msg').fadeOut(500)
  }
  var a = '';
  $('#comment_form input[type=checkbox]').removeAttr('disabled');
  if (!$('#comment_form').find('input[type=checkbox]:checked').get(0)) {
    a += '<div><b></b>Please select type above</div>';
    $('#comment_form .type_wraper').addClass('error')
  } else {
    $('#comment_form .type_wraper').removeClass('error')
  }
  if ($('#comm_txt').val().length < 10) {
    a += '<div><b></b>Your comment is too short</div>';
    $('#comm_txt').addClass('error');
    $('#comm_txt').focus()
  } else {
    $('#comm_txt').removeClass('error')
  }
  if (a.length > 0) {
    $('#com_msg').fadeIn(500).html(a);
    return false
  }
  if (!user_id) {
    prepare_auth_layer();
    $('#comm_txt').removeClass('error');
    $('#com_msg div').remove();
    show_auth_layer('submit_tab_comment');
    return false
  }
  return true
}); $('.comment_chkstab').live('click', function () {
  var a = 'tab';
  var i = document.getElementById('comm_txt');
  var f = document.selection;
  i.focus();
  if (f) {
    var g = f.createRange();
    var j = g.duplicate();
    var c = '[' + a + ']' + j.text + '[/' + a + ']'
  } else {
    var b = i.selectionStart;
    var h = i.selectionEnd;
    var c = i.value.substring(0, b) + '[' + a + ']' + i.value.substring(b, h) + '[/' + a + ']' + i.value.substring(h)
  }
  c = c.replace(/( )+\[\/(tab)\]/gim, '[/$2]$1');
  if (j) {
    j.text = c
  } else {
    i.value = c;
    i.selectionEnd = i.selectionStart = b
  }
  return false
}); $('#js-bad-comms').live('click', function (a) {
  $('.comment').each(function () {
    if ($(this).attr('data-rating') < - 2) {
      if (!show_bad_comments) {
        $(this).show()
      } else {
        $(this).hide()
      }
    }
  });
  if (show_bad_comments) {
    $(this).text($(this).text().replace('hide', 'show'));
    show_bad_comments = false
  } else {
    $(this).text($(this).text().replace('show', 'hide'));
    show_bad_comments = true
  }
  return false
}); $('#fixed_top').click(function () {
  $('html, body').animate({
    scrollTop: 0
  }, 500);
  return false
}); $('#fixed_add_comment').click(function () {
  var a = $('#comment_form').parent().clone().addClass('float embedded');
  $('body').prepend(a);
  right_column_position();
  $('#fixed_add_comment').hide();
  return false
}); function create_applicature_widget(d, c, a) {
  var f = null;
  var b = render_applicature(d, c, a);
  if (b) {
    f = $(b)
  } else {
    f = $('')
  }
  return f
}
function render_applicature(f, d, a) {
  a = $.extend({
    count_class: ''
  }, a);
  var b = null;
  f = Chord.convertChordName(f);
  if (Chord.convertChordName(f) !== undefined) {
    var c = applicature[f];
    var g = build_variations_list(c, d);
    b += '<div class="chord-variations-wrapper ' + a.count_class + '">';
    b += render_head(f);
    b += '<div class="diagwrap">';
    b += '<div class="main_chord_with_play"><div class="play-on-hover"><b><i></i><span>hover to play</span></b>';
    b += '<div class="cont_chrd" rel="0">';
    if (g.length) {
      b += g[0]
    }
    b += '</div>';
    b += '</div></div>';
    b += '<div class="varctrl">variations</div>';
    b += '<div class="chords_versions_handler">';
    b += render_variations_list(g);
    b += render_variations_controls(g);
    b += '</div>';
    b += '</div>';
    b += '</div>'
  }
  return b
}
function render_head(a) {
  return '<div class="chord_body chord_body_selector"><div class="diag_head diag_head_selector"><img src="http://' + js_img_domain + '/_img/1x1.gif" class="ch_hm">' + a + '<a href="#"></a></div></div>'
}
function render_variations_list(c) {
  var b = '<div class="chords_versions_handler_limiter">';
  b += '<div class="chords_versions_scroller_moveable" rel="1">';
  for (var a = 0; a < c.length; a++) {
    b += '<div class="cont_chrd" rel="' + a + '">' + c[a] + '</div>'
  }
  b += '</div>';
  b += '</div>';
  return b
}
function build_variations_list(a, j) {
  var f = [
  ];
  var k = 0;
  for (var b in a) {
    var h = a[b];
    if (b == 'suggested_fret' || b == 'old_ch' || (b.substring(0, 1) == '_')) {
      continue
    }
    k++;
    var c = '';
    c += '<div class="chfret">';
    if (k == 1) {
      c += '<div class="chfret_clicked_label" style="display: block;"></div>'
    } else {
      c += '<div class="chfret_clicked_label"></div>'
    }
    c += render_play_link(h);
    for (var g = 0; g < h.l.length; g++) {
      c += render_capo(h.l[g].f - h.f + ((h.f == 0) ? 0 : 1), h.l[g].e)
    }
    for (var d = 0; d < h.t.length; d++) {
      if (h.g[d] > 0) {
        c += render_finger(d, h.t[d] - h.f + ((h.f == 0) ? 0 : 1), h.g[d])
      }
    }
    c += render_tuning(j);
    c += render_strings(find_bass_string(h), h);
    c += '</div>';
    c += render_fret(h);
    f.push(c)
  }
  return f
}
function render_tuning(f) {
  var b = f.split(' ');
  var a = '<div style="position:absolute; top:-2px; left:5px"><ul class="app_lu">';
  for (var d = b.length - 1; d >= 0; d--) {
    if ((d == 5) && (f.toLowerCase() == 'e a d g b e')) {
      var c = 'app_ltesm'
    } else {
      var c = 'app_lt' + b[d].toLowerCase().substr(0, 1);
      if (b[d].substr(b[d].length - 1, 1) == '#') {
        c += 'dz'
      }
    }
    a += '<li class="' + c + '"></li>'
  }
  a += '</ul></div>';
  return a
}
function render_capo(a, b) {
  return '<div class="barre finger-fret-' + a + ' capo-string-' + b + '"></div>'
}
function render_finger(a, b, c) {
  if (b < 0) {
    return ''
  }
  return '<div class="fingbg finger-string-' + a + ' finger-fret-' + b + '"><div class="f-' + c + '"></div></div>'
}
function render_fret(b) {
  var c = '&nbsp;';
  if (b.f != 0) {
    c = b.f + ' fr'
  }
  var a = '<div class="fs-10 fretnum">' + c + '</div>';
  return a
}
function render_play_link(b) {
  var a = '';
  a += '<a class="p_apl play_applicature_button" rel="' + prepareNotesString(b.n) + '" href="#"></a>';
  return a
}
function render_strings(d, c) {
  var b = '<div class="strings">';
  for (var a = 0; a < c.t.length; a++) {
    b += render_string(a, d, c.t[a])
  }
  b += '</div>';
  return b
}
function render_string(b, d, c) {
  var a = 'f-str';
  if ( - 1 == c) {
    a = 'x-str'
  } else {
    if (0 == c) {
      a = 'o-str'
    }
  }
  return '<div class="' + a + '" rel="string' + b + ' bass' + d + '"></div>'
}
function render_variations_controls(b) {
  var a = '<div class="chords_versions_controls">';
  a += '<div class="chords_versions_controls_left"><b></b> Prev</div>';
  a += '<div class="chords_versions_controls_info_text">';
  a += '1 of ' + (Math.ceil(b.length / 2));
  a += '</div>';
  if (b.length > 2) {
    a += '<div class="chords_versions_controls_right">Next <b></b></div>'
  }
  a += '</div>';
  return a
}
function find_bass_string(d) {
  var c = 0;
  var b = 127;
  for (var a = 0; a < d.n.length; a++) {
    if (((d.n[a] % 12) == d.x) && (d.n[a] <= b)) {
      b = d.n[a];
      c = a
    }
  }
  return c
}
function cancel_comment_edit() {
  var a = $('#edit_comment_form').parents('div.comment_content:first');
  a.find('p').show();
  $('#edit_comment_form').remove()
}
function isLocalStorageAvailable() {
  try {
    return 'localStorage' in window && window.localStorage !== null
  } catch (a) {
    return false
  }
}
function isJsonAvailable() {
  try {
    if (JSON && typeof JSON.parse === 'function') {
      return true
    }
  } catch (a) {
    return false
  }
}
var Chord = {
  chord_names: {
  }
}; Chord.init = function () {
  for (var a in applicature) {
    Chord.chord_names[a] = modulate_accord(a, 0)
  }
}; Chord.convertChordName = function (a) {
  if (applicature[a] !== undefined) {
    return a
  } else {
    if (Chord.chord_names[a] !== undefined) {
      return Chord.chord_names[a]
    }
  }
  return undefined
}; function addTabToHistory(f) {
  var c = {
    id: tabid,
    artist: ucwords(name_art),
    name: ucwords(tab_info.name),
    url: window.location.pathname,
    v: tab_info.version,
    type: tab_info.type
  };
  var d = false;
  for (var b = 0; b < f.length; b++) {
    if (f[b].id == c.id) {
      d = true
    }
  }
  if (d == false) {
    var a = getTabsHistory().splice(0, 4);
    a.unshift(c);
    $.cookie('tabs_history', JSON.stringify(a), {
      expires: 365,
      path: '/',
      domain: ug_serv
    })
  }
  return f
}
function ucwords(a) {
  return a.replace(/^(.)|\s(.)/g, function (b) {
    return b.toUpperCase()
  })
}
function ga_track_event(c) {
  if ((c !== undefined) && (c[0] == '_trackEvent') && (a(c))) {
    if (b(10)) {
      _gaq.push(c)
    }
  } else {
    _gaq.push(c)
  }
  function b(d) {
    return (0 == Math.floor(Math.random() * d))
  }
  function a(h) {
    var d = [
      'Tab Page:::Autoscroll:::Autoscroll Start',
      'Tab Page:::Autoscroll:::Autoscroll Show',
      'Tab Page:::Autoscroll:::Autoscroll Hide',
      'Tab Page:::Chords:::Highlight chords Play',
      'Tab Page:::Chords:::Highlight chords Variations Show',
      'Tab Page:::Chords:::Display chords Play',
      'Tab Page:::Chords:::Highlight chords Variations Hide',
      'Tab Page:::Chords:::Display Chords Variations Show',
      'Tab Page:::Chords:::Display Chords Variations Hide',
      'Tab Page:::Comments:::Comments Top Show',
      'Tab Page:::Comments:::Comments Bottom Show',
      'Tab Page:::Ctrl+C:::Ctrl+C Click',
      'Tab Page:::Display chords:::Display chords On',
      'Tab Page:::Display chords:::Display chords Off',
      'Tab Page:::Favorites:::Favorites Add',
      'Tab Page:::Font Size:::Font Size Plus',
      'Tab Page:::Font Size:::Font Size Minus',
      'Tab Page:::Highlight Chords:::Highlight Chords Off',
      'Tab Page:::Highlight Chords:::Highlight Chords On',
      'Tab Page:::Jango.com link:::Jango.com link',
      'Tab Page:::Print:::Show',
      'Tab Page:::Print link:::Print link',
      'Tab Page:::Tab Versions:::Tab Versions Show',
      'Tab Page:::Transpose:::Transpose Up',
      'Tab Page:::Transpose:::Transpose Down'
    ];
    var g = h[1] + ':::' + h[2] + ':::' + h[3];
    for (var f = 0; f < d.length; f++) {
      if (g == d[f]) {
        return true
      }
    }
    return false
  }
}
function trackUgEvent(a) {
  $.ajax({
    url: 'http://www.' + main_server_name + '/xtra/click_contest.php?without_redirect=1&ug_from=epupp&url=' + a
  })
}
try {
  var parent_url = (window.location != window.parent.location) ? document.referrer : document.location;
  if ((window.parent) && (window.location != window.parent.location) && (parent_url.substring(0, 23) !== 'http://www.911tabs.com/')) {
    window.top.location.href = window.location.href
  }
} catch (e) {
};
