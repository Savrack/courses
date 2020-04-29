<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Зворотній зв'язок</title>

    <link rel="shortcut icon" href="img/phone.ico" type="image/x-icon">

    <!-- Стилі -->
    <link rel="stylesheet" href="css/style.css">

    <!-- Валідатор -->
    <script src="js/validator.js" defer></script>
</head>
<body class="page">

    <!-- Тінь -->
    <div class="modal-window-bg">
        <div class="modal-window-bg__shadow"></div>
    </div>

    <!-- Модальне вікно -->
    <section class="modal-window" id="callbackSection">
        <div class="modal-window__content">
            <header class="modal-window__header">
                <h2 class="modal-window__title">Зворотній зв'язок</h2>

                <button class="modal-window__close-button" type="button">
                    <span></span>
                    <span></span>
                </button>
            </header>

            <div class="modal-window-form__answer"></div>

            <form action="" class="modal-window-form" id="callback">
                <p class="modal-window-form__text">Заповніть будь ласка форму і ми передзвоними вам як найшвидше.</p>
                
                <div class="modal-window-form__field">
                    <input type="text" class="modal-window-form__input" id="callbackName" name="callbackName" placeholder="Ім'я">
                    <label for="callbackName" class="modal-window-form__label name"></label>
                    <span class="modal-window-form__error" id="callbackNameSpan"></span>
                </div>

                <div class="modal-window-form__field">
                    <input type="tel" class="modal-window-form__input" id="callbackTel" value="+380 " name="callbackTel" maxlength="16">
                    <label for="callbackTel" class="modal-window-form__label tel"></label>
                    <span class="modal-window-form__error" id="callbackTelSpan"></span>
                </div>

                <div class="modal-window-form__field">
                    <input type="email" class="modal-window-form__input" id="callbackEmail" name="callbackEmail" placeholder="E-mail (необов'язково)">
                    <label for="callbackEmail" class="modal-window-form__label email"></label>
                    <span class="modal-window-form__error" id="callbackEmailSpan"></span>
                </div>

                <div class="modal-window-form__field">
                    <textarea name="callbackComment" id="callbackComment" cols="30" rows="10" class="modal-window-form__textarea" placeholder="Коментар"></textarea>
                    <span class="modal-window-form__error" id="callbackCommentSpan"></span>
                </div>

                <div class="modal-window-form__field">
                    <input type="submit" class="modal-window-form__submit" value="Відправити" id="callbackSubmit">
                </div>
            </form>
        </div>
    </section>

    <a href="#" class="animation blue" id="callbackButton">
        <img src="img/modal-panel/phone.svg" width="60" height="60" class="phone" alt="">
        <p>Зворотній<br />зв'язок</p>
    </a>
</body>
</html>