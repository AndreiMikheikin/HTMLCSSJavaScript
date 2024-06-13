class PopupMenu {
    
    constructor(menuData, containerId) {
        this.menuData = menuData;
        this.container = document.getElementById(containerId);
        this.createMenu(this.menuData, this.container);
    }

    createMenu(menu, parent) {
        const ul = document.createElement('ul');
        ul.className = parent.id === 'menu-container' ? 'main-menu' : 'submenu';

        menu.forEach(item => {
            const li = document.createElement('li');
            li.className = 'menu-item';
            
            const a = document.createElement('a');
            a.textContent = item.name;
            if (item.url) {
                a.href = item.url;
            }
            li.appendChild(a);
            
            if (item.submenu) {
                li.classList.add('has-submenu');
                this.createMenu(item.submenu, li);
            }
            ul.appendChild(li);
        });
        
        parent.appendChild(ul);
    }
}

var menu = [
    {name:'Пункт 1',submenu: [
        {name:'Пункт 1.1',submenu: [
            {name:'Пункт 1.1.1',url:'http://www.microsoft.com'},
            {name:'Пункт 1.1.2 длинный',url:'http://www.microsoft.com'}
        ]},
        {name:'Пункт 1.2',url:'http://www.microsoft.com'},
        {name:'Пункт 1.3 длинный',submenu: [
            {name:'Пункт 1.3.1',url:'http://www.microsoft.com'},
            {name:'Пункт 1.3.2',url:'http://www.microsoft.com'},
            {name:'Пункт 1.3.3', submenu: [{name:'Пункт 1.3 длинный',submenu: [
                {name:'Пункт 1.3.1',url:'http://www.microsoft.com'},
                {name:'Пункт 1.3.2',url:'http://www.microsoft.com'},
                {name:'Пункт 1.3.3',url:'http://www.microsoft.com'},
                {name:'Пункт 1.3.4 длинный',url:'http://www.microsoft.com'}
            ]}]},
            {name:'Пункт 1.3.4 длинный',submenu: [{name:'Пункт 1.3 длинный',submenu: [
                {name:'Пункт 1.3.1',url:'http://www.microsoft.com'},
                {name:'Пункт 1.3.2',submenu: [{name:'Пункт 1.3 длинный',submenu: [
                    {name:'Пункт 1.3.1',url:'http://www.microsoft.com'},
                    {name:'Пункт 1.3.2',url:'http://www.microsoft.com'},
                    {name:'Пункт 1.3.3',url:'http://www.microsoft.com'},
                    {name:'Пункт 1.3.4 длинный',url:'http://www.microsoft.com'}
                ]}]},
                {name:'Пункт 1.3.3',url:'http://www.microsoft.com'},
                {name:'Пункт 1.3.4 длинный',url:'http://www.microsoft.com'}
            ]}]},
        ]}
    ]},
    {name:'Пункт 2 длинный',url:'http://www.microsoft.com'},
    {name:'Пункт 3',submenu: [
        {name:'Пункт 3.1 длинный',url:'http://www.microsoft.com'},
        {name:'Пункт 3.2',url:'http://www.microsoft.com'}
    ]}
];

window.onload = function() {
    new PopupMenu(menu, 'menu-container');
};
