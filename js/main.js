(()=>{
    'use strict';

    var app = (function(){
        return {
            init: function init(){
                console.log('app init');
                this.companyInfo();
                this.initEvents();
            },

            initEvents: function initEvents(){
                var $formRegister = document.querySelector('[data-js="form-register"]');
                $formRegister.addEventListener('submit', this.handleSubmit,false);
            },

            handleSubmit: function handleSubmit(e){
                e.preventDefault();
                console.log('submit');
                var $tableCar = document.querySelector('[data-js="table-car"]');
                $tableCar.appendChild(app.createNewCar());
            },

            createNewCar: function createNewCar(){
                var $fragment = document.createDocumentFragment();
                var $tr = document.createElement('tr');
                var $tdImage = document.createElement('td');
                var $image = document.createElement('img');
                var $tdBrand = document.createElement('td');
                var $tdYear = document.createElement('td');
                var $tdPlate = document.createElement('td');
                var $tdColor = document.createElement('td');

                $image.setAttribute('src', document.querySelector('[data-js="image"]').value );
                $tdImage.appendChild($image);

                $tdBrand.textContent = document.querySelector('[data-js="model"]').value;
                $tdYear.textContent = document.querySelector('[data-js="year"]').value;
                $tdPlate.textContent = document.querySelector('[data-js="plate"]').value;
                $tdColor.textContent = document.querySelector('[data-js="color"]').value;

                $tr.appendChild($tdImage);
                $tr.appendChild($tdBrand);
                $tr.appendChild($tdYear);
                $tr.appendChild($tdPlate);
                $tr.appendChild($tdColor);

                return $fragment.appendChild($tr);
            },

            companyInfo: function companyInfo(){
                var ajax = new XMLHttpRequest();
                ajax.open('GET', 'json/company.json', true);
                ajax.send();
                ajax.addEventListener('readystatechange', this.getCompanyInfos, false);
            },

            getCompanyInfos: function getCompanyInfos(){
                if(!app.isReady.call(this))
                    return;
                var data = JSON.parse(this.responseText);
                var $companyName = document.querySelector('[data-js="company-name"]');
                var $companyPhone = document.querySelector('[data-js="company-phone"]');
                $companyName.textContent = data.name;
                $companyPhone.textContent = data.phone;
            },

            isReady: function isReady(){
                return this.readyState === 4 && this.status === 200;
            }
        };
    })();

    app.init();
})();