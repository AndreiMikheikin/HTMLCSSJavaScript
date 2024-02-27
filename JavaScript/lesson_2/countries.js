function addCountry(countryName, capitalName) {
    countrysH[countryName] = capitalName;
}

function deleteCountry(countryName) {
    delete countrysH[countryName];
}

function getCountryInfo(countryName) {
    if (countryName in countrysH)
        return 'страна: ' + countryName + ' столица: ' + countrysH[countryName];
    else
        return 'нет информации о стране ' + countryName + '!';
}

function listCountrys() {
    var res = "";
    for (var CN in countrysH)
        res += '\n' + getCountryInfo(CN);
    return res;
}

function userAddCountry() {
    var countryName = prompt('Введите страну: ');
    var capitalName = prompt('Введите столицу: ');
    addCountry(countryName, capitalName);
    alert(`Страна ${countryName} со столицей в г.${capitalName} добавлена!`);
}

function userGetCountryInfo() {
    var countryName = prompt('Введите страну: ');
    getCountryInfo(countryName);
    if (countryName in countrysH)
        alert('страна: ' + countryName + ' столица: ' + countrysH[countryName]);
    else
        alert('нет информации о стране ' + countryName + '!');
}

function userListCountrys() {
    console.log("список стран:" + listCountrys());
}

function userDeleteCountry(countryName) {
    var countryName = prompt('Введите страну: ');
    if (countryName in countrysH)
        alert('Cтрана ' + countryName + ' успешно уничтожена!');
    else
        alert('Чтобы удалить страну ' + countryName + ', нужно сначала создать такую страну!');
    deleteCountry(countryName);
    console.log("список стран:" + listCountrys());
}