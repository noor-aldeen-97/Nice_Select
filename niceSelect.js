class niceSelect{

    constructor(config){
        this.element = document.getElementById(config.elementId);
        this.CustomSelect = document.createElement('div');
        this.isMultipleSelect = false;
        this.customClass = config.customClass ?? '';
        this.customItemsClass = config.customItemsClass ?? '';
        this.customSelectedClass = config.customSelectedClass ?? 'nice-select-item-selected';
        this._init();
    }

    _init(){
        let i = 0;
        this.CustomSelect.classList.add("nice-select");
        
        for (const className of this.customClass.split(' ')) {
            if(className.trim().length > 0){
                this.CustomSelect.classList.add(className);
            }
        }

        for (const item of this.element.children) {
            const div = document.createElement('div');
            item.setAttribute('data-niceSelectId',i);
            div.classList.add("nice-select-item");

            for (const className of this.customItemsClass.split(' ')) {
                if(className.trim().length > 0){
                    div.classList.add(className);
                }
            }

            div.textContent = item.textContent;
            div.setAttribute('data-niceSelectId',i);
            div.addEventListener( 'click', ()=>{
                if(div.classList.contains(this.customSelectedClass)){
                    this._deselect(div);
                }else{
                    this._select(div);
                }
            });
            this.CustomSelect.append(div);
            i++;
        }
        this.element.insertAdjacentElement('afterend',this.CustomSelect);
        this._checkMultiple();
        this.element.style.display = 'none';
    }

    _checkMultiple(){
        if(this.element.getAttribute('multiple') == null || this.element.getAttribute('multiple') == undefined){
            this.isMultipleSelect = false;
        }else{
            this.isMultipleSelect = true;
        }
    }

    _select(ele){
        if(!this.isMultipleSelect){
            for (const item of this.CustomSelect.children) {
                item.classList.remove(this.customSelectedClass);
            }
        }
        let index = ele.getAttribute('data-niceselectid');
        ele.classList.add(this.customSelectedClass);
        const eleSelect = document.querySelector('#' + this.element.id + ' option[data-niceselectid="' + index + '"]');
        eleSelect.selected = true;
    }

    _deselect(ele){
        let index = ele.getAttribute('data-niceselectid');
        ele.classList.remove(this.customSelectedClass);
        const eleSelect = document.querySelector('#' + this.element.id + ' option[data-niceselectid="' + index + '"]');
        eleSelect.selected = false;
    }

}