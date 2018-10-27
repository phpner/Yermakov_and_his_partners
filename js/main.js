$(function () {
    if (isMobile()) {
        $('body').addClass('u-mobile');
    };



    var c = {
        $document: $(document)
    };



    //Полифилл для object-fit
    objectFitImages();



    //Анимация треугольников
    $('#top-triangle').addClass('triangle-top--show');
    $('#middle-triangle').addClass('triangle-middle--show');
    $('#bottom-triangle').addClass('triangle-bottom--show');
    $('.hero__bg-polygon').addClass('hero__bg-polygon--fit-width');

    $('.serves_title').addClass('anime__width');



    //Попап обратной связи
    $('.callback-popup-open').click(function () {
        $('#callback-popup').addClass('popup--open');
    });

    //Закрытие попапа
    $('.popup__close').click(function () {
        $(this).closest('.popup').removeClass('popup--open');
    });

    var $popupContent = $('.popup__inner');

    c.$document.mouseup(function (e) {
        if (
            !$popupContent.is(e.target) && $popupContent.has(e.target).length === 0 ||
            $('.popup__close').is(e.target)
        ) {
            $('.popup').removeClass('popup--open');
        }
    });



    //Пользовательское соглашение
    var $agreement = $('.agreement'),
        $agreementCheck = $agreement.find('.agreement__checkbox'),
        $formSubmit = $agreement.closest('form').find('.btn');

    $agreementCheck.click(function () {
        $(this).prop('checked') === true ?
            $formSubmit.prop('disabled', false) :
            $formSubmit.prop('disabled', true);
    })



    //Отправка формы
    $('.js-callback-form').submit(function (e) {
        e.preventDefault();
        var $form = $(this),
            $submitBtn = $form.find('.btn');

        $submitBtn.addClass('loading-btn');

        if (window.utils.validateForm($form)) {
            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: $form.serialize(),
                dataType: 'json',
                success: function (data) {
                    $submitBtn.removeClass('loading-btn');
                    window.utils.notification('Сообщение успешно отправлено', 3000);
                    $('#callback-popup').removeClass('popup--open');
                    $form.find('input , textarea').not('input:hidden, input:submit').val('');
                }
            });
            return false;
        }
        else {
            $submitBtn.removeClass('loading-btn');
            window.utils.notification('Проверьте правильность введенных данных', 4000);
        }
    });
});



//Скролл к секции
var $header = $('#header');

/*$('.js-scroll-to').click(function (e) {
    e.preventDefault();

    var section_id = $(this).attr('href') || $(this).attr('data-href'),
        scroll_to = $(section_id).offset().top - $header.outerHeight();

    $('html, body').animate({
        scrollTop: scroll_to
    }, 2000);
});*/

var f = window.location.pathname;

$(".menu li a").each(function () {

    if ($(this).attr('href') == f) {
        $(this).addClass('activeMenu');

        console.log($(this).attr('href') +"   "+ f);
    }
});


function isMobile() {
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)) {
        return true;
    } 
    else {
        return false;
    }
}

window.utils = {
    notification: function (message, duration) {
        var $new_message = $('<div class="notification"></div>'),
            $opened_messages = $('.notification');

        $new_message.html(message);

        if ($opened_messages.length) {
            var $last_message = $opened_messages.last(),
                top_offset = $last_message[0].offsetTop + $last_message.outerHeight() + 15;

            $new_message.css('top', top_offset + 'px')
        }

        $new_message.appendTo('body');
        $new_message.css('opacity'); //reflow hack for transition
        $new_message.addClass('notification--show');

        if (duration) {
            setTimeout(function () {
                $new_message.fadeOut(function () {
                    $new_message.remove();
                })
            }, duration);
        }

        $('.notification').click(function () {
            $(this).fadeOut(function () {
                $new_message.remove();
            })
        });
    },

    validateForm: function ($form) {
        $form.find('.form__field-alert').remove();

        function showAlert(message) {
            return $('<div class="form__field-alert">').html(message);
        }

        function checkRequiredField(field) {
            if (field.value) {
                return true;
            } 
            else {
                showAlert('Обязательное поле').insertBefore(field);
                return false;
            }
        }

        function checkNumericField(field) {
            var val = field.value,
                regexp = /^[^a-zA-Z]*$/g;

            if (val !== '' && val.match(regexp)) {
                return true;
            } 
            else {
                showAlert('Введите корректное значение').insertBefore(field);
                return false;
            }
        }

        function checkEmailField(field) {
            var val = field.value,
                regexp = /^[0-9a-zА-Яа-я\-\_\.]+\@[0-9a-zА-Яа-я-]{2,}\.[a-zА-Яа-я]{2,}$/i;

            if (val !== '' && val.match(regexp)) {
                return true;
            } 
            else {
                showAlert('Введите корректный адрес').insertBefore(field);
                return false;
            }
        }

        function validateField(field) {
            if ($(field).hasClass('js-required')) {
                return checkRequiredField(field);
            }
            else if ($(field).hasClass('js-required-email')) {
                return checkEmailField(field);
            } 
            else if ($(field).hasClass('js-required-numeric')) {
                return checkNumericField(field);
            } 
            else {
                return true;
            }
        }

        var fields = $form.find('input, textarea'),
            isFormValid = true;

        $.each(fields, function (ind, el) {
            var checkedField = validateField(el);
            isFormValid = isFormValid && checkedField;
        });

        return isFormValid;
    }
}

/*! npm.im/object-fit-images 3.2.3 */
var objectFitImages = function () { "use strict"; function t(t, e) { return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + t + "' height='" + e + "'%3E%3C/svg%3E" } function e(t) { if (t.srcset && !m && window.picturefill) { var e = window.picturefill._; t[e.ns] && t[e.ns].evaled || e.fillImg(t, { reselect: !0 }), t[e.ns].curSrc || (t[e.ns].supported = !1, e.fillImg(t, { reselect: !0 })), t.currentSrc = t[e.ns].curSrc || t.src } } function i(t) { for (var e, i = getComputedStyle(t).fontFamily, r = {}; null !== (e = l.exec(i));)r[e[1]] = e[2]; return r } function r(e, i, r) { var n = t(i || 1, r || 0); p.call(e, "src") !== n && b.call(e, "src", n) } function n(t, e) { t.naturalWidth ? e(t) : setTimeout(n, 100, t, e) } function c(t) { var c = i(t), o = t[a]; if (c["object-fit"] = c["object-fit"] || "fill", !o.img) { if ("fill" === c["object-fit"]) return; if (!o.skipTest && g && !c["object-position"]) return } if (!o.img) { o.img = new Image(t.width, t.height), o.img.srcset = p.call(t, "data-ofi-srcset") || t.srcset, o.img.src = p.call(t, "data-ofi-src") || t.src, b.call(t, "data-ofi-src", t.src), t.srcset && b.call(t, "data-ofi-srcset", t.srcset), r(t, t.naturalWidth || t.width, t.naturalHeight || t.height), t.srcset && (t.srcset = ""); try { s(t) } catch (t) { window.console && console.warn("https://bit.ly/ofi-old-browser") } } e(o.img), t.style.backgroundImage = 'url("' + (o.img.currentSrc || o.img.src).replace(/"/g, '\\"') + '")', t.style.backgroundPosition = c["object-position"] || "center", t.style.backgroundRepeat = "no-repeat", t.style.backgroundOrigin = "content-box", /scale-down/.test(c["object-fit"]) ? n(o.img, function () { o.img.naturalWidth > t.width || o.img.naturalHeight > t.height ? t.style.backgroundSize = "contain" : t.style.backgroundSize = "auto" }) : t.style.backgroundSize = c["object-fit"].replace("none", "auto").replace("fill", "100% 100%"), n(o.img, function (e) { r(t, e.naturalWidth, e.naturalHeight) }) } function s(t) { var e = { get: function (e) { return t[a].img[e || "src"] }, set: function (e, i) { return t[a].img[i || "src"] = e, b.call(t, "data-ofi-" + i, e), c(t), e } }; Object.defineProperty(t, "src", e), Object.defineProperty(t, "currentSrc", { get: function () { return e.get("currentSrc") } }), Object.defineProperty(t, "srcset", { get: function () { return e.get("srcset") }, set: function (t) { return e.set(t, "srcset") } }) } function o(t, e) { var i = !h && !t; if (e = e || {}, t = t || "img", f && !e.skipTest || !d) return !1; "img" === t ? t = document.getElementsByTagName("img") : "string" == typeof t ? t = document.querySelectorAll(t) : "length" in t || (t = [t]); for (var r = 0; r < t.length; r++)t[r][a] = t[r][a] || { skipTest: e.skipTest }, c(t[r]); i && (document.body.addEventListener("load", function (t) { "IMG" === t.target.tagName && o(t.target, { skipTest: e.skipTest }) }, !0), h = !0, t = "img"), e.watchMQ && window.addEventListener("resize", o.bind(null, t, { skipTest: e.skipTest })) } var a = "bfred-it:object-fit-images", l = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g, u = "undefined" == typeof Image ? { style: { "object-position": 1 } } : new Image, g = "object-fit" in u.style, f = "object-position" in u.style, d = "background-size" in u.style, m = "string" == typeof u.currentSrc, p = u.getAttribute, b = u.setAttribute, h = !1; return o.supportsObjectFit = g, o.supportsObjectPosition = f, function () { function t(t, e) { return t[a] && t[a].img && ("src" === e || "srcset" === e) ? t[a].img : t } f || (HTMLImageElement.prototype.getAttribute = function (e) { return p.call(t(this, e), e) }, HTMLImageElement.prototype.setAttribute = function (e, i) { return b.call(t(this, e), e, String(i)) }) }(), o }();