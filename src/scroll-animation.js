const getCurrentPositon = scrollContainerElement => scrollContainerElement.scrollTop;

const getElementTopPosition = (elementToScroll, scrollContainerElement) =>
  elementToScroll.getBoundingClientRect().top + getCurrentPositon(scrollContainerElement);

const getAddingTop = (differencePosition, time) => {
  const differencePositionByTime = Math.ceil(differencePosition / time);
  if (differencePositionByTime === 0) {
    return (differencePosition > 0 ? 1 : -1);
  }
  return differencePositionByTime;
};

const animateScroll = (elementToScroll, time, addingPositionHeader, scrollContainerElement) => {
  const elementTopPosition =
    getElementTopPosition(elementToScroll, scrollContainerElement) - addingPositionHeader;
  const currentTopPosition = getCurrentPositon(scrollContainerElement);
  const differencePosition = elementTopPosition - currentTopPosition;
  const addingTop = getAddingTop(differencePosition, time);
  const animateInterval = setInterval(() => {
    if (addingTop > 0) {
      if (getCurrentPositon() >= elementTopPosition - (addingTop / 2)
        || scrollContainerElement.scrollTopMax <= (scrollContainerElement.scrollTop + 10)) {
        clearInterval(animateInterval);
      }
    } else {
      if (getCurrentPositon() <= elementTopPosition - (addingTop / 2)) {
        clearInterval(animateInterval);
      }
    }

    scrollContainerElement.scrollBy(0, addingTop);
  }, 1);
};

const animateScrollEvent = (element, time, addingPositionHeader, scrollContainerElement) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();

    const id = element.firstElementChild.getAttribute('href').slice(1);
    const elementToScroll = document.getElementById(id);
    animateScroll(elementToScroll, time, addingPositionHeader, scrollContainerElement);
  });
};

const scrollAnimation =
  (
    listElements
    , delay
    , addingHeight = 0
    , scrollContainerElement = document.documentElement,
  ) => {
    for (const element of listElements) {
      animateScrollEvent(element, delay, addingHeight, scrollContainerElement);
    }
  };
