var tabSelect = document.querySelector('.tab__select');

var choicesFirst = new Choices(tabSelect, {
  searchEnabled: false,
  shouldSort: false,
  itemSelectText: '',
});

tabSelect.addEventListener('change', function() {
    var title = document.querySelectorAll('.tab__item > :first-child');
    var titleSelect = document.querySelector('.choices__item--selectable').textContent;

    title.forEach(function(el) {
        if (el.textContent === titleSelect) {
            el.parentNode.classList.add('active');
        } else {
            el.parentNode.classList.remove('active');
        }
    });
})
