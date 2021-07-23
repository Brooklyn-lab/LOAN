$(window).on('load', function () {
   $('.preloader').fadeOut().end().delay(400).fadeOut('slow');
});

jQuery(document).ready(function () {

   //----Format Webp---------ъ
   function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src =
         'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
   }
   testWebP(function (support) {
      if (support == true) {
         document.querySelector('body').classList.add('webp');
      }
   });

   //--------- ACCORDION -------------------------
   $(".accordion__header").click(function () {
      $(this)
         .toggleClass("show")
         .next()
         .slideToggle();
      $(".accordion__header")
         .not(this)
         .removeClass("show")
         .next()
         .slideUp();
   });

   // -------------------------------------------------
   $('a[href*="#"]').on('click', function (e) {
      e.preventDefault();

      $('html, body').animate(
         {
            scrollTop: $($(this).attr('href')).offset().top,
         },
         500,
         'linear',
      );
   });

   // ----------- FORM --------------------------------
   const form = $('.form');
   const countNumber = $('#progresNumber');
   const buttonNext = $('.form__button-next');
   const buttonPrev = $('.survey__prev');
   const formContent = $('.form__content');
   const buttonReset = $('#buttonReset');

   let steps = 1;
   let data = {
      personalizedValue = '',
      nameValue = '',
      lastNameValue = '',
      idNumberValue = '',
      birthDateValue = '',
      creditsValue = '',
      employmentValue = '',
      preTaxValue = '',
      emailValue = '',
      telephoneValue = '',
   }

   buttonReset.hide();

   // сброс формы
   buttonReset.click(function () {
      data = {
         personalizedValue = '',
         nameValue = '',
         lastNameValue = '',
         idNumberValue = '',
         birthDateValue = '',
         creditsValue = '',
         employmentValue = '',
         preTaxValue = '',
         emailValue = '',
         telephoneValue = '',
      }
      formContent.html(step1())
      steps = 1;
      countNumber.text('1');
      buttonPrev.show()
      buttonPrev.addClass('disable')
      buttonReset.hide()
      buttonNext.show()
   })

   // валидация формы
   $.validator.addMethod(
      "regex",
      function (value, element, regexp) {
         var re = new RegExp(regexp);
         return this.optional(element) || re.test(value);
      },
      "Please check your input."
   );

   function valEl(el) {
      el.validate({
         rules: {
            name: {
               required: true,
               minlength: 3,
            },
            lastName: {
               required: true,
               minlength: 3,
            },
            idNumber: {
               required: true,
               minlength: 3,
            },
            birthDate: {
               required: true
            },
            preTax: {
               required: true
            },
            tel: {
               required: true,
               regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
            },
            email: {
               required: true,
               email: true
            }
         },
      })
   }

   // Запускаем механизм валидации форм, если у них есть класс .js-form
   $('.js-form').each(function () {
      valEl($(this));
   });

   // проверяем совпадения data-value и добавляем checked
   const addCheckInput = function () {
      let allInputs = $('.form__wrapper').find('input');
      $.each(allInputs, function (index, value) {
         if ($(this).attr('data-value') == data.personalizedValue || $(this).attr('data-value') == data.creditsValue || $(this).attr('data-value') == data.employmentValue) {
            $(this).attr('checked', '')
         }
      })
   }

   //  Счетчик степов вверх
   const countUp = () => {
      countNumber.html(function (i, val) {
         if (val >= 8) {
            return 8
         } else if (val > 0 || $('input[name=credits-btn]:checked').length > 0) {
            buttonPrev.removeClass('disable')
            return steps = val * 1 + 1
         }
      })
   }

   //  Счетчик степов вниз
   const countDown = () => {
      countNumber.html(function (i, val) {
         if (val <= 1) {
            buttonPrev.addClass('disable')
            return 1
         } else if (val <= 2) {
            buttonPrev.addClass('disable')
            return steps = val * 1 - 1
         } else {
            return steps = val * 1 - 1
         }
      });
   }

   const step1 = () =>
      `
      <p class="survey__title">Request your personalized loan-proposal</p>
      <div class='form__wrapper'>
         <label for="one-btn" class="form__radio-btn">
            <input type="radio" name='personalized' id="one-btn" data-value='5' required>
            <span class="form__circle"></span>
            <span class="form__text">Less than €5,000</span>
         </label>
         <label for="two-btn" class="form__radio-btn">
            <input type="radio" name='personalized' id="two-btn" data-value='5/25'>
            <span class="form__circle"></span>
            <span class="form__text">€5,000-€25,000</span>
         </label>
         <label for="three-btn" class="form__radio-btn">
            <input type="radio" name='personalized' id="three-btn" data-value='25'>
            <span class="form__circle"></span>
            <span class="form__text">More than €25,000</span>
         </label>
         <span id='error'></span>
      </div>
   `

   const step2 = () =>
      `
      <p class="survey__title">Fill the rows below to suits better loan-offer for you</p>
      <div class='form__wrapper'>
         <input type="text" name='name' placeholder='First name' class='form__input' require>
         <input type="text" name='lastName' placeholder='Last name' class='form__input' require>
         <span id='error'></span>
      </div>
   `

   const step3 = () =>
      `
         <div class='form__wrapper'>
            <input id='idNumber' type="number" name='idNumber' placeholder='ID-number' class='form__input' require>
            <input type="text" id='date' name='birthDate' placeholder='Date of birth' class='form__input' require>
            <span id='error'></span>
         </div>
      `

   const step4 = () =>
      `
         <p class="survey__title">Credit score</p>
         <div class='form__wrapper'>
            <label for="four-btn" class="form__radio-btn">
               <input type="radio" name='credits' id="four-btn" data-value='<720'>
               <span class="form__circle"></span>
               <span class="form__text">Excellent (720-850)</span>
            </label>
            <label for="fiwe-btn" class="form__radio-btn">
               <input type="radio" name='credits' id="fiwe-btn" data-value='<680'>
               <span class="form__circle"></span>
               <span class="form__text">Good (680-719)</span>
            </label>
            <label for="six-btn" class="form__radio-btn">
               <input type="radio" name='credits' id="six-btn" data-value='<640'>
               <span class="form__circle"></span>
               <span class="form__text">Fair (640-679)</span>
            </label>
            <label for="seven-btn" class="form__radio-btn">
               <input type="radio" name='credits' id="seven-btn" data-value='>639'>
               <span class="form__circle"></span>
               <span class="form__text">Poor (0-639)</span>
            </label>
            <span id='error'></span>
         </div>
      `

   const step5 = () =>
      `
         <p class="survey__title">Employment status</p>
         <div class='form__wrapper'>
            <label for="eight-btn" class="form__radio-btn">
               <input type="radio" name='employment' id="eight-btn" data-value='full time'>
               <span class="form__circle"></span>
               <span class="form__text">Full Time</span>
            </label>
            <label for="nine-btn" class="form__radio-btn">
               <input type="radio" name='employment' id="nine-btn" data-value='part time'>
               <span class="form__circle"></span>
               <span class="form__text">Part Time</span>
            </label>
            <label for="ten-btn" class="form__radio-btn">
               <input type="radio" name='employment' id="ten-btn" data-value='employed'>
               <span class="form__circle"></span>
               <span class="form__text">Self-Employed</span>
            </label>
            <label for="eleven-btn" class="form__radio-btn">
               <input type="radio" name='employment' id="eleven-btn" data-value='unemployed'>
               <span class="form__circle"></span>
               <span class="form__text">Unemployed</span>
            </label>
            <label for="twelve-btn" class="form__radio-btn">
               <input type="radio" name='employment' id="twelve-btn" data-value='other'>
               <span class="form__circle"></span>
               <span class="form__text">Other</span>
            </label>
            <span id='error'></span>
         </div>   
      `

   const step6 = () =>
      `
         <p class="survey__title">What’s your yearly pre-tax income?</p>
         <div class='form__wrapper'>
            <input id='preTax' type="number" name='preTax' placeholder='€ 90.000' class='form__input' require> 
            <span id='error'></span>
         </div>
      `

   const step7 = () =>
      `
         <p class="survey__title">How do we contact you?</p>
         <div class='form__wrapper'>
            <input type="email" name='email' placeholder='E-mail' class='form__input' require>
            <input type="tel" id='phone' name='telephone' class='form__input' require>

            <div class="form__checkbox-wrapper">
               <label class="form__checkbox checkbox">
                  <input type="checkbox" class="checkbox__check" name="checkbox1" require>
                  <span class="checkbox__box"></span>
                  <span class="checkbox__text">I confirm that I have read and accept the general conditions , the privacy policy and the cookie policy</span>
               </label>

               <label class="form__checkbox checkbox">
                  <input type="checkbox" class="checkbox__check" name="checkbox2" require>
                  <span class="checkbox__box"></span>
                  <span class="checkbox__text">I consent to receive communications, and offers of products and services from Company</span>
               </label>
            </div>
            <span id='error'></span>
         </div>
      `

   const step8 = () =>
      `
      <p class="form__thank">Thank you for filling out the form!</p>
      <p class="form__thank-text">We’ll send you an email with loan-information in 24h at the email address you provided. </p>
      <p class="form__thank-text">Respectfully, The <span>[Your Company]</span> Team</p>
      `

   // Показывает изначально 1й степ.
   if ($('input[name=credits-btn]:checked').length === 0) {
      formContent.html(step1())
   }

   // флаг страны для input type tel
   const country = () => {
      $("#phone").intlTelInput({
         nationalMode: false,
         initialCountry: "auto",
         geoIpLookup: function (success, failure) {
            $.get("https://ipinfo.io/?token=63fd763951a2fb", function () { }, "jsonp").always(function (resp) {
               var countryCode = (resp && resp.country) ? resp.country : "us";
               success(countryCode);
            });
         },
         utilsScript: './libs/utils.min.js'
      });
   }

   let inputValue = (name) => $(`input[name=${name}]`).val();
   let inputCheckedValue = (name) => $(`input[name=${name}]:checked`).attr('data-value');
   let inputCheckedLength = (name) => $(`input[name=${name}]:checked`).length != 0;
   let inputValueLength = (name) => $(`input[name=${name}]`).val().length > 2;

   // -------- Валидация ---------------
   const errorMessage = () => {
      $('.form').addClass('error')

      if ($('form').hasClass('error')) {
         $('#error').text('This field is required.')
      }

      $('input[type=radio]').on('change', function () {
         $('form').removeClass('error')
         $('#error').text('');
      })

      $('input').on('change', function () {
         $('#error').text('');
      })
   }

   // По клику показывать степы
   buttonNext.click(function (event) {
      event.preventDefault();
      errorMessage()

      if (steps === 1 && inputCheckedLength('personalized')) {
         (() => data.personalizedValue = inputCheckedValue('personalized'))();
         countUp()
         formContent.html(step2())
         $(`input[name=name]`).val(`${data.nameValue}`)
         $(`input[name=lastName]`).val(`${data.lastNameValue}`)
      } else if (steps === 2 && inputValueLength('name') && inputValueLength('lastName')) {
         (() => {
            data.nameValue = inputValue('name');
            data.lastNameValue = inputValue('lastName');
         })();
         countUp()
         formContent.html(step3())
         formContent.toggleClass('no-title')
         $('#date').mask('99/99/9999')
         $(`input[name=idNumber]`).val(`${data.idNumberValue}`)
         $(`input[name=birthDate]`).val(`${data.birthDateValue}`)
      } else if (steps === 3 && inputValueLength('idNumber') && inputValueLength('birthDate')) {
         (() => {
            data.idNumberValue = inputValue('idNumber');
            data.birthDateValue = inputValue('birthDate');
         })()
         countUp()
         formContent.html(step4())
         addCheckInput()
         formContent.toggleClass('no-title')
      } else if (steps === 4 && inputCheckedLength('credits')) {
         (() => data.creditsValue = inputCheckedValue('credits'))()
         countUp()
         formContent.html(step5())
         addCheckInput()
      } else if (steps === 5 && inputCheckedLength('employment')) {
         (() => data.employmentValue = inputCheckedValue('employment'))()
         countUp()
         formContent.html(step6())
         $(`input[name=preTax]`).val(`${data.preTaxValue}`)
      } else if (steps === 6 && $('input[name=preTax]').val().length != 0) {
         (() => data.preTaxValue = inputValue('preTax'))()
         countUp()
         formContent.html(step7())
         country()
         $(`input[name=email]`).val(`${data.emailValue}`)
         $(`input[name=telephone]`).val(`${data.telephoneValue}`)
      } else if (steps === 7 && inputValueLength('email') && inputValueLength('telephone') && inputCheckedLength('checkbox1') && inputCheckedLength('checkbox2')) {
         (() => {
            data.emailValue = inputValue('email');
            data.telephoneValue = inputValue('telephone');
         })()
         submitForm()
         countUp()
         formContent.html(step8())
         buttonPrev.hide()
         buttonReset.show()
         buttonNext.hide()
      }
   })

   // по клику возвращает контент и счетчик степов
   buttonPrev.click(function (event) {
      event.preventDefault();

      switch (steps) {
         case 2: {
            countDown()
            formContent.html(step1())
            addCheckInput()
            break;
         }
         case 3: {
            countDown()
            formContent.html(step2())
            formContent.toggleClass('no-title')
            $(`input[name=name]`).val(`${data.nameValue}`)
            $(`input[name=lastName]`).val(`${data.lastNameValue}`)
            break;
         }
         case 4: {
            countDown()
            formContent.html(step3())
            formContent.toggleClass('no-title')
            $(`input[name=idNumber]`).val(`${data.idNumberValue}`)
            $(`input[name=birthDate]`).val(`${data.birthDateValue}`)
            break;
         }
         case 5: {
            countDown()
            formContent.html(step4())
            addCheckInput()
            break;
         }
         case 6: {
            countDown()
            formContent.html(step5())
            addCheckInput()
            break;
         }
         case 7: {
            countDown()
            formContent.html(step6())
            $(`input[name=preTax]`).val(`${data.preTaxValue}`)
            break;
         }
         case 8: {
            countDown()
            formContent.html(step7())
            buttonReset.hide()
            buttonPrev.show()
            buttonNext.show()
            $(`input[name=email]`).val(`${data.emailValue}`)
            $(`input[name=telephone]`).val(`${data.telephoneValue}`)
            break;
         }
      }
   })

   // отпраква формы 
   const submitForm = () => {
      $('.preloader').fadeIn();
      $.ajax({
         url: './success.php',
         type: 'POST',
         data: {
            personalized: data.personalizedValue,
            name: data.nameValue,
            lastName: data.lastNameValue,
            idNumber: data.idNumberValue,
            birthDate: data.birthDateValue,
            credits: data.creditsValue,
            employment: data.employment,
            preTax: data.preTaxValue,
            email: data.emailValue,
            telephone: data.telephoneValue,
         }
      }).always(function (response) {
         setTimeout(function () {
            $('.preloader').fadeOut();
            $('.form').trigger('reset');
         }, 400);
      })
   }
});

