import './main.css';
import renderCategories from './modules/renderCategories.js';

const showNav = () => {
  document.querySelector('nav').style.opacity = 1;
};

const hideNav = () => {
  document.querySelector('nav').style.opacity = 0;
};

document.addEventListener('click', (e) => {
  const menuIcon = document.querySelector('.menu img');
  return e.target === menuIcon ? showNav() : hideNav();
});

// prettier-ignore
window.addEventListener('resize', (e) => e.target.innerWidth > 800 ? showNav() : hideNav());

renderCategories();
