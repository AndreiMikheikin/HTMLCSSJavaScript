let isLogin = true;

function selectRole(role) {
    document.getElementById('role').value = role;

    // Снять выделение со всех кнопок
    document.querySelectorAll('.role-selection button').forEach(button => {
        button.classList.remove('selected');
    });

    // Выделить выбранную кнопку
    if (role === 'admin') {
        document.querySelector('.admin').classList.add('selected');
    } else if (role === 'user') {
        document.querySelector('.user').classList.add('selected');
    }

    // Активировать кнопку отправки
    const submitButton = document.getElementById('submit-btn');
    submitButton.disabled = false;
    submitButton.classList.add('active');
}

function toggleForm() {
    isLogin = !isLogin;
    document.getElementById('form-title').innerText = isLogin ? 'Вход' : 'Регистрация';
    document.getElementById('submit-btn').innerText = isLogin ? 'Войти' : 'Зарегистрироваться';
    document.querySelector('.toggle-link').innerText = isLogin ? 'Нет аккаунта? Регистрация' : 'Уже есть аккаунт? Войти';
    document.getElementById('confirm-password').style.display = isLogin ? 'none' : 'block';
    document.getElementById('password-requirements').style.display = isLogin ? 'none' : 'block';
}

function showForgotPassword() {
    document.querySelector('.container').style.display = 'none';
    document.getElementById('forgot-password-container').style.display = 'block';
}

function hideForgotPassword() {
    document.getElementById('forgot-password-container').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
}

function validatePassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const lengthCheck = password.length >= 8;
    const lowercaseCheck = /[a-z]/.test(password);
    const uppercaseCheck = /[A-Z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    const matchCheck = password === confirmPassword;

    document.getElementById('length-check').classList.toggle('valid', lengthCheck);
    document.getElementById('lowercase-check').classList.toggle('valid', lowercaseCheck);
    document.getElementById('uppercase-check').classList.toggle('valid', uppercaseCheck);
    document.getElementById('number-check').classList.toggle('valid', numberCheck);
    document.getElementById('match-check').classList.toggle('valid', matchCheck);

    const allValid = lengthCheck && lowercaseCheck && uppercaseCheck && numberCheck && matchCheck;
    document.getElementById('submit-btn').disabled = !allValid;
    document.getElementById('submit-btn').classList.toggle('active', allValid);
}

function handleSubmit() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if (isLogin) {
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                if (role === 'admin') {
                    window.location.href = `admin-dashboard.html?uid=${user.uid}`;
                } else {
                    window.location.href = `user-dashboard.html?uid=${user.uid}`;
                }
            })
            .catch(error => {
                console.error("Ошибка при входе:", error);
                alert("Ошибка при входе: " + error.message);
            });
    } else {
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                if (role === 'admin') {
                    window.location.href = `admin-dashboard.html?uid=${user.uid}`;
                } else {
                    window.location.href = `user-dashboard.html?uid=${user.uid}`;
                }
            })
            .catch(error => {
                console.error("Ошибка при регистрации:", error);
                alert("Ошибка при регистрации: " + error.message);
            });
    }
}

function handleForgotPassword() {
    const email = document.getElementById('forgot-email').value;

    auth.sendPasswordResetEmail(email)
        .then(() => {
            alert("Письмо для сброса пароля отправлено!");
            hideForgotPassword();
        })
        .catch(error => {
            console.error("Ошибка при сбросе пароля:", error);
            alert("Ошибка при сбросе пароля: " + error.message);
        });
}