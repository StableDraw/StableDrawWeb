import React from 'react';

const MainModal = () => {
    var _elemModal;
    var _eventShowModal;
    var _eventHideModal;
    var _hiding = false;
    var _destroyed = false;
    var _animationSpeed = 200;
    function _createModal(options) {
        var elemModal = document.createElement("div"), modalTemplate = '<div class = "modal__backdrop"><div class="modal__content"><div class="modal__header"><div class="modal__title" data-modal="title">{{title}}</div><span class="modal__btn-close" data-dismiss="gen_modal" title="Закрыть">&times;</span></div><div class="modal__body" data-modal="content">{{content}}</div>{{footer}}</div></div>', modalFooterTemplate = '<div class = "modal__footer">{{buttons}}</div>', modalButtonTemplate = '<button type = "button" class="{{button_class}}" data-handler={{button_handler}}>{{button_text}}</button>', modalHTML, modalFooterHTML = "";
        elemModal.classList.add("gen_modal");
        modalHTML = modalTemplate.replace("{{title}}", options.title || "");
        modalHTML = modalHTML.replace("{{content}}", options.content || "");
        if (options.footerButtons) {
            for (var i = 0, length = options.footerButtons.length; i < length; i++) {
                var modalFooterButton = modalButtonTemplate.replace("{{button_class}}", options.footerButtons[i].class);
                modalFooterButton = modalFooterButton.replace("{{button_handler}}", options.footerButtons[i].handler);
                modalFooterButton = modalFooterButton.replace("{{button_text}}", options.footerButtons[i].text);
                modalFooterHTML += modalFooterButton;
            }
        }
        modalFooterHTML = modalFooterTemplate.replace("{{buttons}}", modalFooterHTML);
        modalHTML = modalHTML.replace("{{footer}}", modalFooterHTML);
        elemModal.innerHTML = modalHTML;
        subbody.appendChild(elemModal);
        subbody1.appendChild(elemModal);
        return elemModal;
    }
    function _showModal() {
        is_modal_open = true;
        if (!_destroyed && !_hiding) {
            _elemModal.classList.add("modal__show");
            document.dispatchEvent(_eventShowModal);
        }
    }
    function _hideModal() {
        is_modal_open = false;
        _hiding = true;
        _elemModal.classList.remove("modal__show");
        _elemModal.classList.add("modal__hiding");
        setTimeout(function () {
            _elemModal.classList.remove("modal__hiding");
            _hiding = false;
        }, _animationSpeed);
        document.dispatchEvent(_eventHideModal);
    }
    function _handlerCloseModal(e) {
        if (e.target.dataset.dismiss === "gen_modal") {
            _hideModal();
        }
    }
    _elemModal = _createModal(options);
    _elemModal.addEventListener("click", _handlerCloseModal);
    _eventShowModal = new CustomEvent("show.modal", { detail: _elemModal });
    _eventHideModal = new CustomEvent("hide.modal", { detail: _elemModal });
    let return_elem = {
        show: _showModal,
        hide: _hideModal,
        destroy: function () {
            // eslint-disable-next-line no-unused-expressions
            _elemModal.parentElement.removeChild(_elemModal),
                _elemModal.removeEventListener("click", _handlerCloseModal),
                _destroyed = true;
        }, setContent: function (html) {
            _elemModal.querySelector('[data-modal = "content"]').innerHTML = html;
        }, setTitle: function (text) {
            _elemModal.querySelector('[data-modal = "title"]').innerHTML = text;
        }
    };
    return return_elem;
    return (
        <div>

        </div>
    );
};

export default MainModal;