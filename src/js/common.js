$(function () {
    // header
    headerScroll();
    gnbSubdepth();

    $('header .menu-all').click(function(){
        $(this).hasClass('open') ? gnbClose() : gnbOpen();
    });
    moreMenu('header .menu-all-wrap .dep1-btn');

    // subdepth menu
    subdepthToggle();

    // design selectbox
    $(this).find('.nice-select').niceSelect();

    // xScroll
    xScroll('.lastdepth-tab-wraps .scroll');
    xScroll('.x-scroll');

    // all check
    allChecker();

    // collapse
    collapse();

    // tab
    uiTab();
    uiRadioTab();

    // accordion
    accordion();
    dataSorting();

    // 이미지 원본사이즈 새창팝업
    imgWindowPopup();

    // modal
    modalToggle();

    // class toggle
    classToggle();
});

// header event
function headerScroll() {
    var didScroll,
        lastScrollTop = 0,
        delta = 5,
        navbarHeight = $('header').outerHeight();

    $(window).scroll(function (e) {
        didScroll = true;
    });
    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 150);

    function hasScrolled() {
        var st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight) {
            $('header').addClass('scroll');
        } else if (st < lastScrollTop && st < navbarHeight) {
            $('header').removeClass('scroll');
        }

        lastScrollTop = st;
    }
}

function gnbSubdepth() {
    var depth1 = $('#gnb > a'),
        header = $('header');

    depth1.mouseenter(function(){
        header.addClass('open');
    });
    header.mouseleave(function(){
        header.removeClass('open');
    });
}

function moreMenu(btn) {
    $(btn).click(function() {
        var parent = $(this).parent('.col'),
            allCol = parent.siblings('div'),
            allDepth = allCol.children('ul'),
            allBtn = allCol.children('.dep1-btn'),
            depth = $(this).siblings('ul');

        allDepth.slideUp();
        allBtn.removeClass('open');

        $(this).addClass('open');
        depth.slideDown();
    });
}

function gnbOpen() {
    var header = $('header'),
        gnb = $('header .menu-all-wrap'),
        menuBtn = $('header .menu-all');

    header.addClass('m-open');
    gnb.slideDown();
    menuBtn.addClass('open');
}

function gnbClose() {
    var header = $('header'),
        gnb = $('header .menu-all-wrap'),
        menuBtn = $('header .menu-all');

    gnb.slideUp(200);
    setTimeout(function () {
        menuBtn.removeClass('open');
        header.removeClass('m-open');
    }, 200);
}

function scrollPrevent(prop) {
    if ( prop == true ) {
        $('html, body').scrollTop(0);
        $('body').css({'overflow':'hidden'});
    } else {
        $('body').css({'overflow':'initial'});
    }
}

// sub depth 
function subdepthToggle() {
    var $subdepth = $('.sub-depth-wrap'),
        menus = $subdepth.find('.dropdown-menu'),
        button = $subdepth.find('.selected');

    button.on('click', function(e){
        var prt = $(this).parent('.dropdown-menu');

        e.preventDefault();
        if (prt.hasClass('open')) {
            prt.removeClass('open');
        } else {
            menus.removeClass('open');
            prt.addClass('open');
        }
    });

    $(document).on('click', 'html', function(e){
        var prt = $(e.target).parents();
        if (!prt.is($subdepth) ) {
            menus.removeClass('open');
        }
    });
}

// checkbox all check
function allChecker() {
    var obj = '[data-toggle="allChk"]',
        $obj = $(obj);

    if ($obj.length <= 0) return;
    $obj.each(function(){
        var $input = $(this).find('.chk-all'),
            name = $input.attr('name');

        $input.on('change', function(){
            var $name = $(this).attr('name'),
                $wrapper = $(this).parents(obj),
                $childs = $wrapper.find('input[name='+ $name +']');
            
            if ($(this).prop("checked")) {
                $childs.prop("checked", true);
            } else {
                $childs.prop("checked", false);
            }
        });
        
        $('input[name=' + name + ']').each(function () {
            var $this = $(this);
    
            $this.on('change', function () {
                var total = $('input[name=' + name + ']').length;
                var chked = $('input[name=' + name + ']:checked').not($input).length + 1;
                if (chked == total) {
                    $input.prop("checked", true);
                } else {
                    $input.prop("checked", false);
                }
            });
        });
    });
}

// tab
function uiTab() {
    var tab = '[data-evt="tab"]';
    $(document).on('click', tab + ' a', function (e) {
        e.preventDefault();
        var $this = $(this);
        var wrapper = 'body';
        var id = $this.attr('href');
        var $target = $('[data-id=' + id + ']');
        var $siblings = $this.parents('li').siblings('').find('a');

        $siblings.each(function () {
            var id = $(this).attr('href');
            $(this).parents('li').removeClass('active');
            $('[data-id=' + id + ']').hide();
        });
        $this.parents('li').addClass('active');
        $target.show();

        return false;
    });
}

function uiRadioTab() {
    var tab = '[data-evt*="radio-tab"]';
    $(document).on('click', tab + ' .rdo-wrap', function (e) {
        var $this = $(this),
            input = $(this).find('input'),
            id = $this.attr('id'),
            $target = $('[data-id=' + id + ']'),
            $siblings = $this.parents('li').siblings('').find('.rdo-wrap');


        $siblings.each(function () {
            var id = $(this).attr('id');
            $('[data-id=' + id + ']').hide();
            $(this).find('input').prop('checked', false);
        });
        input.prop('checked', true);
        $target.show();

        return false;
    });
}

// iscroll outerwidth
function calcWidth(target) {
    var $target = $(target);

    $target.each(function(){
        var child = $(this).children(),
            width = 0;

        child.each(function(){
            width += $(this).outerWidth(true);
        });
        $(this).css('width', width);
    });
}

// iscroll
function xScroll(obj) {
    var $obj = $(obj),
        tabs = $obj.find('.tabs');

    if ( $(obj).length <= 0 ) {
        return
    } else {
        $(window).resize(function(){
            calcWidth(tabs);
        });
        $(window).on('load', function(){
            calcWidth(tabs);
            new IScroll(obj , {
                scrollX : true,
                scrollY : false,
                mouseWheel : false,
                autoCenterScroll : true,
                bounce : true
            });
        });
    }
}

// terms open/close 
function collapse() {
    var btn = $('[data-toggle="collapse"]');

    btn.on('click', function(e){
        e.preventDefault();
        var target = $(this).attr('href') || $(this).data('target');
        
        if($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(target).slideUp();
        } else {
            $(this).addClass('open');
            $(target).slideDown();
        }
    });
}

// video modal 
function videoModal(obj) {
    var obj = '[data-control="modal"]',
        $obj = $(obj),
        $target = $('#video'),
        $tit = $target.find('.tit'),
        $desc = $target.find('.desc'),
        $date = $target.find('.date'),
        $src = $target.find('iframe'),
        dim = '<div class="common-dim" aria-hidden="true">&nbsp;</div>';

    $obj.on('click', function(e){
        e.preventDefault();
        var infos = $(this).parents('.items').find('.info'),
            tit = infos.find('.tit').text(),
            desc = infos.find('.desc').text(),
            date = infos.find('.date').html();
            src = infos.find('.src').text();
            option = '?controls=0';

        $tit.text(tit);
        $desc.text(desc);
        $date.html(date);
        $src.attr('src', src+option);

        $target.before(dim);
        $target.show();
    });

    var close = $target.find('.btn-close');

    close.on('click', function(){
        $target.hide();
        $('body').find('.common-dim').remove();

        $tit.text(' ');
        $desc.text(' ');
        $date.html(' ');
        $src.attr('src', ' ');
    });
}

// accordion
function accordion() {
    var wrap = $('.ui-accordion'),
        list = wrap.find('li'),
        title = wrap.find('.accord-title'),
        toggle = title.find('.btn-toggle');

    if(wrap.length <= 0) return;

    // 접근성 대응
    list.each(function(){
        var $btn = $(this).find('.accord-title .btn-toggle'),
            $content = $(this).find('.accord-cont'),
            id = $(this).index();

        $btn.attr({
            'id' : 'accord-toggle' + id,
            'aria-controls' : 'accord-cont' + id
        });
        $content.attr({
            'id' : 'accord-cont' + id,
            'role' : 'region',
            'aria-labelledby' : 'accord-toggle' + id
        })
    });

    toggle.click(function(){
        var li = $(this).parent('.accord-title').parent('li'),
            cont = $(this).parent('.accord-title').siblings('.accord-cont'),
            blind = $(this).find('.blind');

        if (li.hasClass('open')) {
            $(this).attr('aria-expanded', 'false');
            cont.slideUp();
            li.removeClass('open');
            blind.text('상세보기');
        } else {
            $(this).attr('aria-expanded', 'true');
            cont.slideDown();
            li.addClass('open');
            blind.text('닫기');
        }
    });
}

// data sorting
function dataSorting() {
    var tab = '[data-type="sortingTab"]',
        $tab = $(tab),
        btn = $tab.find('a');

    var listWrap = '[data-type="sortingTarget"]',
        $wrap = $(listWrap),
        listAll = $wrap.find('li');

    if($tab.length <= 0) return;

    btn.click(function(e){
        var num = $(this).data('category-num'),
            $target = $('[data-category-id='+num+']');

        e.preventDefault();
        $(this).parent('li').siblings().removeClass('active');
        $(this).parent('li').addClass('active');
        listAll.hide();

        var empty = '<li class="empty"><p class="nodata">게시글이 없습니다.</p></li>',
            uls = $wrap.find('.lists');

        if (num === 'all') {
            uls.find('li.empty').remove();
            listAll.show();
        } else {
            if ($target.length <= 0) {
                uls.find('li.empty').remove();
                uls.append(empty);
            } else {
                uls.find('li.empty').remove();
                $target.show();
            }
        }
    });
}

// img popup
function imgWindowPopup() {
    $('a.view-img').each(function(){
        var click = $(this);
        click.on('click', function(){
            var img = $(this).find('img'),
                src = img.attr('src'),
                alt = img.attr('alt'),
                iw = img.get(0).naturalWidth,
                ih = img.get(0).naturalHeight;

            var imageWin = window.open("", "_blank", 'width='+iw+', height='+ ih +', menubars=no, scrollbars=no'); 
            
            imageWin.document.write("<html><body style='margin:0; overflow:hidden;'>"); 
            imageWin.document.write("<a href=javascript:window.close() title='클릭 시 새창이 닫힙니다.'><img src='" + src + "' border=0></a>"); 
            imageWin.document.write("</body><html>"); 
            imageWin.document.title = alt;
        });
    });
}

// modal 
function modalToggle() {
    var modalToggle = $('[data-toggle="modal"]'),
        modalClose = $('[data-toggle="modal-close"]');

    if (modalToggle.length <= 0) return;

    modalToggle.on('click', function(){
        var modalTarget = $(this).data('target') || $(this).attr('href');
            modal = $(modalTarget);

        modal.removeAttr('aria-hidden');
        modal.attr('aria-modal', true);
        modal.show();
    });

    modalClose.on('click', function(){
        var modal = $(this).parents('.modal');

        modal.hide();
        modal.removeAttr('aria-modal');
        modal.attr('aria-hidden', true);
    });
}

// class toggle
function classToggle() {
    var classToggle = $('[data-toggle="class-toggle"]');

    if (classToggle.length <= 0) return;

    var btns = classToggle.find('button, a');
    
    btns.on('click', function(){
        btns.removeClass('active');
        $(this).addClass('active');    
    });
}